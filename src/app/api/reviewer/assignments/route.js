import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyRequestUser, unauthorizedResponse } from '@/lib/auth';
import { sendReviewerInvitation } from '@/lib/mail';

/**
 * POST /api/reviewer/assignments
 * Create a new reviewer assignment and send invitation email
 */
export async function POST(req) {
  const user = verifyRequestUser(req);
  if (!user) return unauthorizedResponse();

  try {
    const { submissionId, reviewerId, reviewerEmail, reviewerName, responseDueDate, reviewDueDate } = await req.json();

    if (!submissionId || !reviewerId) {
      return NextResponse.json({ success: false, message: 'Submission ID and Reviewer ID are required' }, { status: 400 });
    }

    // 1. Fetch submission details for the email
    const [subRows] = await pool.query(
      'SELECT title, editor_comments FROM submissions WHERE id = ?',
      [submissionId]
    );
    
    if (subRows.length === 0) {
      return NextResponse.json({ success: false, message: 'Submission not found' }, { status: 404 });
    }
    
    const submission = subRows[0];
    
    // Abstract check (fallback if not stored in root submissions table)
    // For now we assume title is sufficient or abstract is passed in body
    const articleTitle = submission.title;
    const abstract = submission.abstract || 'Original submission abstract not available. Follow link below to view details.';

    // 2. Insert into reviewer_assignments table
    const [result] = await pool.query(
      'INSERT INTO reviewer_assignments (submission_id, user_id, status) VALUES (?, ?, ?)',
      [submissionId, reviewerId, 'Pending']
    );

    // 3. Update submission activity
    await pool.query(
      'UPDATE submissions SET activity = ? WHERE id = ?',
      ['Assignment Pending', submissionId]
    );

    // 4. Send Professional Invitation Email (Image 1-3)
    const emailResult = await sendReviewerInvitation({
      to: reviewerEmail,
      reviewerName: reviewerName,
      articleTitle: articleTitle,
      abstract: abstract,
      responseDueDate: responseDueDate || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      reviewDueDate: reviewDueDate || new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      submissionId: submissionId,
      editorName: user.username || 'Managing Editor'
    });

    return NextResponse.json({
      success: true,
      message: 'Assignment created and invitation sent',
      assignmentId: result.insertId,
      emailSent: emailResult.success
    }, { status: 201 });

  } catch (error) {
    console.error('Create assignment error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', error: error.message }, { status: 500 });
  }
}

/**
 * GET /api/reviewer/assignments
 * List all assignments or assignments for a specific submission
 */
export async function GET(req) {
  const user = verifyRequestUser(req);
  if (!user) return unauthorizedResponse();

  try {
    const { searchParams } = new URL(req.url);
    const submissionId = searchParams.get('submissionId');

    let query = `
      SELECT ra.*, u.fullName as reviewerName, u.email as reviewerEmail 
      FROM reviewer_assignments ra
      JOIN users u ON ra.user_id = u.id
    `;
    const params = [];

    if (submissionId) {
      query += ' WHERE ra.submission_id = ?';
      params.push(submissionId);
    }

    const [rows] = await pool.query(query, params);

    return NextResponse.json({ success: true, assignments: rows }, { status: 200 });
  } catch (error) {
    console.error('Fetch assignments error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
