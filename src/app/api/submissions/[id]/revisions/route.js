import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyRequestUser, unauthorizedResponse } from '@/lib/auth';
import { sendNotificationEmail } from '@/lib/mail';

export async function POST(req, { params }) {
  const user = verifyRequestUser(req);
  if (!user) return unauthorizedResponse();

  try {
    const { id } = await params;
    const body = await req.json();
    const { files, comments } = body;

    if (!files || files.length === 0) {
      return NextResponse.json({ success: false, message: 'At least one file is required for revision' }, { status: 400 });
    }

    // 1. Verify ownership
    const [subRows] = await pool.query('SELECT user_id, title FROM submissions WHERE id = ?', [id]);
    if (subRows.length === 0) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });
    if (subRows[0].user_id !== user.userId) return unauthorizedResponse();

    const title = subRows[0].title;

    // 2. Insert new files
    const fileValues = files.map(f => [id, f.name, 'Revised Manuscript', f.path]);
    await pool.query(
      'INSERT INTO submission_files (submission_id, name, type, path) VALUES ?',
      [fileValues]
    );

    // 3. Update status and activity
    await pool.query(
      'UPDATE submissions SET status = "Revisions Submitted", activity = "Revised Manuscript Received", author_comments = ? WHERE id = ?',
      [comments || '', id]
    );

    // 4. Notify Admin/Editor
    await sendNotificationEmail(
      process.env.SMTP_USER,
      `Revisions Received — Manuscript #${id}`,
      `Author ${user.fullName} has submitted revisions for manuscript "${title}".`,
      `
        <h2>Revisions Received</h2>
        <p><strong>Manuscript ID:</strong> #${id}</p>
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>Author:</strong> ${user.fullName}</p>
        <p><strong>Author Comments:</strong><br/>${comments || 'No comments provided.'}</p>
        <p>Revised files have been uploaded and are available for review.</p>
      `
    );

    return NextResponse.json({ 
      success: true, 
      message: 'Revisions submitted successfully',
      newStatus: 'Revisions Submitted',
      newActivity: 'Revised Manuscript Received'
    });

  } catch (error) {
    console.error('Submit revision error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
