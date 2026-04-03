import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyRequestUser, unauthorizedResponse } from '@/lib/auth';

/**
 * POST /api/submissions/[id]/decision
 * Records an editorial decision (Accept, Decline, Revisions Required)
 */
export async function POST(req, { params }) {
  const user = verifyRequestUser(req);
  if (!user) return unauthorizedResponse();

  // Role Check: Only editors or admins can record decisions
  if (user.role !== 'editor' && user.role !== 'admin') {
    return unauthorizedResponse();
  }

  try {
    const { id } = await params;
    const { decision, comments } = await req.json();

    if (!decision) {
      return NextResponse.json({ success: false, message: 'Decision is required' }, { status: 400 });
    }

    // 1. Get submission and author info
    const [subRows] = await pool.query(
      'SELECT s.title, u.email as authorEmail, u.fullName as authorName FROM submissions s JOIN users u ON s.user_id = u.id WHERE s.id = ?',
      [id]
    );

    if (subRows.length === 0) {
      return NextResponse.json({ success: false, message: 'Submission not found' }, { status: 404 });
    }

    const { title, authorEmail, authorName } = subRows[0];

    // 2. Map decision to database status and activity
    let newStatus = 'Submitted';
    let newActivity = 'Decision Recorded';

    switch (decision.toLowerCase()) {
      case 'accept':
        newStatus = 'Published';
        newActivity = 'Manuscript Accepted for Publication';
        break;
      case 'decline':
        newStatus = 'Declined';
        newActivity = 'Manuscript Declined';
        break;
      case 'revisions':
        newStatus = 'Revisions Requested';
        newActivity = 'Revisions Required from Author';
        break;
      default:
        return NextResponse.json({ success: false, message: 'Invalid decision type' }, { status: 400 });
    }

    // 3. Update database
    await pool.query(
      'UPDATE submissions SET status = ?, activity = ?, editor_comments = ? WHERE id = ?',
      [newStatus, newActivity, comments || '', id]
    );

    // 4. (Optional) In a real app, send email notification to author here
    console.log(`Decision "${decision}" recorded for submission #${id}. Notification would be sent to ${authorEmail}`);

    return NextResponse.json({ 
      success: true, 
      message: `Decision "${decision}" recorded successfully`,
      newStatus,
      newActivity
    }, { status: 200 });

  } catch (error) {
    console.error('Decision record error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
