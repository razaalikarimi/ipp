import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyRequestUser, unauthorizedResponse } from '@/lib/auth';
import { sendReviewerInvitation } from '@/lib/mail';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-123';


/**
 * POST /api/reviewer/assignments
 * Create a new reviewer assignment and send invitation email
 */
export async function POST(req) {
  const user = verifyRequestUser(req);
  if (!user) return unauthorizedResponse();

  try {
    const { submissionId, reviewerId, reviewerEmail, reviewerName, responseDueDate, reviewDueDate } = await req.json();

    if (!submissionId || !reviewerEmail || !reviewerName) {
      return NextResponse.json({ success: false, message: 'Submission ID, Reviewer Email and Reviewer Name are required' }, { status: 400 });
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
    
    // Abstract check
    const articleTitle = submission.title;
    const abstract = submission.abstract || 'Original submission abstract not available. Follow link below to view details.';

    // 2. Ensure reviewer exists in the users table, otherwise create a placeholder user
    let realReviewerId = reviewerId;
    if (!realReviewerId || realReviewerId === 999) {
      const [userRows] = await pool.query('SELECT id FROM users WHERE email = ?', [reviewerEmail]);
      if (userRows.length > 0) {
        realReviewerId = userRows[0].id;
      } else {
        // Create user
        const tempPassword = 'ReviewerPassword123!'; 
        const [insertUser] = await pool.query(
          'INSERT INTO users (fullName, email, password, username) VALUES (?, ?, ?, ?)',
          [reviewerName, reviewerEmail, tempPassword, reviewerEmail.split('@')[0]]
        );
        realReviewerId = insertUser.insertId;
      }
    }

    // 3. Generate secure token for Accept/Decline link (valid for 7 days)
    const tokenPayload = { reviewerId: realReviewerId, submissionId };
    const acceptToken = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '7d' });
    
    // Parse deadline
    const deadlineDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); 

    // 4. Insert into reviewer_assignments table
    const [result] = await pool.query(
      'INSERT INTO reviewer_assignments (submission_id, user_id, status, token, deadline) VALUES (?, ?, ?, ?, ?)',
      [submissionId, realReviewerId, 'Pending', acceptToken, deadlineDate]
    );

    // Prepare Accept/Decline Links
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const acceptLink = `${baseUrl}/api/review/accept?token=${acceptToken}`;
    const declineLink = `${baseUrl}/api/review/decline?token=${acceptToken}`;

    // 4. Update submission activity
    await pool.query(
      'UPDATE submissions SET activity = ? WHERE id = ?',
      ['Assignment Pending', submissionId]
    );

    // 5. Send Professional Invitation Email
    const emailResult = await sendReviewerInvitation({
      to: reviewerEmail,
      reviewerName: reviewerName,
      articleTitle: articleTitle,
      abstract: abstract,
      responseDueDate: responseDueDate || deadlineDate.toLocaleDateString(),
      reviewDueDate: reviewDueDate || new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      submissionId: submissionId,
      editorName: user.username || 'Managing Editor',
      acceptLink: acceptLink,
      declineLink: declineLink,
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
