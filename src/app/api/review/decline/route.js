import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-key-123';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json({ success: false, message: 'Missing token' }, { status: 400 });
  }

  try {
    // 1. Verify JWT signature and expiration
    const payload = jwt.verify(token, JWT_SECRET);
    const { reviewerId, submissionId } = payload;

    // 2. Check if assignment exists and token matches
    const [rows] = await pool.query(
      'SELECT id, status FROM reviewer_assignments WHERE submission_id = ? AND user_id = ? AND token = ?',
      [submissionId, reviewerId, token]
    );

    if (rows.length === 0) {
      return NextResponse.json({ success: false, message: 'Invalid or expired invitation link' }, { status: 404 });
    }

    const assignment = rows[0];

    // 3. Prevent duplicate actions
    if (assignment.status !== 'Pending') {
      return NextResponse.json({ 
        success: false, 
        message: `This invitation has already been ${assignment.status.toLowerCase()}. No further action is required.` 
      }, { status: 400 });
    }

    // 4. Update Database Status to DECLINED
    await pool.query(
      'UPDATE reviewer_assignments SET status = "Declined" WHERE id = ?',
      [assignment.id]
    );

    // 5. Update submission activity
    await pool.query(
      'UPDATE submissions SET activity = "Reviewer Declined" WHERE id = ?',
      [submissionId]
    );

    // You could return an HTML page here instead of JSON for a better user experience
    return new NextResponse(`
      <html>
        <head><title>Review Declined</title></head>
        <body style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
          <h2 style="color: #c62828;">Invitation Declined</h2>
          <p>Thank you for letting us know. We understand that you cannot review at this time.</p>
          <p>We hope to work with you on future submissions.</p>
        </body>
      </html>
    `, { headers: { 'Content-Type': 'text/html' } });

  } catch (error) {
    console.error('Decline review error:', error);
    if (error.name === 'TokenExpiredError') {
      return NextResponse.json({ success: false, message: 'This invitation link has expired (valid for 7 days).' }, { status: 401 });
    }
    return NextResponse.json({ success: false, message: 'Invalid token or internal error' }, { status: 500 });
  }
}
