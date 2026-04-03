import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyRequestUser, unauthorizedResponse } from '@/lib/auth';

export async function GET(req, { params }) {
  const user = verifyRequestUser(req);
  if (!user) return unauthorizedResponse();

  const { id } = await params;

  try {
    // 1. Get submission
    const [subRows] = await pool.query(
      'SELECT id, title, status, activity, created_at, user_id FROM submissions WHERE id = ?',
      [id]
    );

    if (subRows.length === 0) {
      return NextResponse.json({ success: false, message: 'Submission not found' }, { status: 404 });
    }

    const submission = subRows[0];
    
    // Auth check - user must own it or be assigned as a reviewer
    let isAuthorized = (submission.user_id === user.userId);
    let assignment = null;

    if (!isAuthorized) {
      const [assignmentRows] = await pool.query(
        'SELECT id, assigned_at, status FROM reviewer_assignments WHERE submission_id = ? AND user_id = ?',
        [id, user.userId]
      );
      if (assignmentRows.length > 0) {
        isAuthorized = true;
        assignment = assignmentRows[0];
      }
    }

    if (!isAuthorized) {
      return unauthorizedResponse();
    }


    // 2. Get files
    const [fileRows] = await pool.query(
      'SELECT id, name, type, uploaded_at FROM submission_files WHERE submission_id = ?',
      [id]
    );

    // 3. Get contributors
    const [contribRows] = await pool.query(
      'SELECT id, name, email FROM submission_contributors WHERE submission_id = ?',
      [id]
    );

    // 4. Get discussions
    const [discRows] = await pool.query(
      `SELECT d.id, d.subject, d.created_at, u.username as author 
       FROM discussions d 
       LEFT JOIN users u ON d.user_id = u.id 
       WHERE d.submission_id = ?`,
      [id]
    );

// Format response
    return NextResponse.json({
      success: true,
      submission: {
        id: submission.id,
        title: submission.title,
        status: submission.status,
        activity: submission.activity,
        prefix: submission.prefix || '',
        subtitle: submission.subtitle || '',
        abstract: submission.abstract || '',
        language: 'English',
        files: fileRows.map(f => ({ id: f.id, name: f.name, type: f.type, date: f.uploaded_at })),
        contributors: contribRows,
        discussions: discRows.map(d => ({
          id: d.id,
          subject: d.subject,
          author: d.author,
          date: d.created_at,
          replies: 0
        })),
        assignment: assignment
      }
    }, { status: 200 });
  } catch (error) {
    console.error('Fetch single submission error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  const user = verifyRequestUser(req);
  if (!user) return unauthorizedResponse();

  const { id } = await params;
  const { title, prefix, subtitle, abstract } = await req.json();

  try {
    // Auth check: only owner can update for now
    const [subRows] = await pool.query('SELECT user_id FROM submissions WHERE id = ?', [id]);
    if (subRows.length === 0) return NextResponse.json({ success: false, message: 'Not found' }, { status: 404 });
    if (subRows[0].user_id !== user.userId) return unauthorizedResponse();

    // Update submission (assuming abstract/prefix/subtitle have been added to schema)
    await pool.query(
      'UPDATE submissions SET title = ?, prefix = ?, subtitle = ?, abstract = ? WHERE id = ?',
      [title, prefix || '', subtitle || '', abstract || '', id]
    );

    return NextResponse.json({ success: true, message: 'Updated successfully' });
  } catch (error) {
    console.error('Update submission error:', error);
    return NextResponse.json({ success: false, message: 'Failed to update' }, { status: 500 });
  }
}
