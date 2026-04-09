import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyRequestUser, unauthorizedResponse } from '@/lib/auth';

// GET existing review for a submission
export async function GET(req) {
  const user = verifyRequestUser(req);
  if (!user) return unauthorizedResponse();

  const { searchParams } = new URL(req.url);
  const subId = searchParams.get('submissionId');

  if (!subId) {
    return NextResponse.json({ success: false, message: 'Submission ID is required' }, { status: 400 });
  }

  try {
    const [rows] = await pool.query(
      'SELECT checklist_json, comments_authors, comments_editors, recommendation, rating, file_url, is_draft FROM submission_reviews WHERE submission_id = ? AND user_id = ?',
      [subId, user.userId]
    );

    if (rows.length === 0) {
      return NextResponse.json({ success: true, review: null }, { status: 200 });
    }

    return NextResponse.json({ success: true, review: rows[0] }, { status: 200 });
  } catch (error) {
    console.error('Fetch review error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

// SAVE or SUBMIT review
export async function POST(req) {
  const user = verifyRequestUser(req);
  if (!user) return unauthorizedResponse();

  try {
    const body = await req.json();
    const { submissionId, checklist, commentsAuthors, commentsEditors, recommendation, rating, fileUrl, isDraft } = body;

    if (!submissionId) {
      return NextResponse.json({ success: false, message: 'Submission ID is required' }, { status: 400 });
    }

    // Auth check: Is this user assigned to this submission?
    const [assignmentRows] = await pool.query(
      'SELECT id FROM reviewer_assignments WHERE submission_id = ? AND user_id = ?',
      [submissionId, user.userId]
    );

    if (assignmentRows.length === 0) {
      return NextResponse.json({ success: false, message: 'You are not assigned to this manuscript' }, { status: 403 });
    }

    // Upsert review
    await pool.query(`
      INSERT INTO submission_reviews (submission_id, user_id, checklist_json, comments_authors, comments_editors, recommendation, rating, file_url, is_draft)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE 
        checklist_json = VALUES(checklist_json),
        comments_authors = VALUES(comments_authors),
        comments_editors = VALUES(comments_editors),
        recommendation = VALUES(recommendation),
        rating = VALUES(rating),
        file_url = VALUES(file_url),
        is_draft = VALUES(is_draft)
    `, [
      submissionId, 
      user.userId, 
      JSON.stringify(checklist || {}), 
      commentsAuthors || '', 
      commentsEditors || '', 
      recommendation || '',
      rating || null,
      fileUrl || null,
      isDraft ? 1 : 0
    ]);

    // If NOT draft, update assignment status
    if (!isDraft) {
      await pool.query(
        'UPDATE reviewer_assignments SET status = "Completed" WHERE submission_id = ? AND user_id = ?',
        [submissionId, user.userId]
      );
      
      // Update submission activity to reflect that a review has been turned in
      await pool.query(
        'UPDATE submissions SET activity = "Review Submitted" WHERE id = ?',
        [submissionId]
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: isDraft ? 'Review saved as draft' : 'Review submitted successfully' 
    }, { status: 200 });

  } catch (error) {
    console.error('Post review error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
