import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyRequestUser, unauthorizedResponse } from '@/lib/auth';
import { sendNotificationEmail } from '@/lib/mail';

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
      'SELECT s.title, s.journal_id, u.email as authorEmail, u.fullName as authorName FROM submissions s JOIN users u ON s.user_id = u.id WHERE s.id = ?',
      [id]
    );

    if (subRows.length === 0) {
      return NextResponse.json({ success: false, message: 'Submission not found' }, { status: 404 });
    }

    const { title, authorEmail, authorName, journal_id } = subRows[0];

    // 2. Map decision to database status and activity
    let newStatus = 'Submitted';
    let newActivity = 'Decision Recorded';
    let decisionText = 'Under Review';
    let brandColor = '#005f96';

    switch (decision.toLowerCase()) {
      case 'accept':
        newStatus = 'Published';
        newActivity = 'Manuscript Accepted for Publication';
        decisionText = 'Accepted for Publication';
        brandColor = '#16a34a'; // Green
        break;
      case 'decline':
        newStatus = 'Declined';
        newActivity = 'Manuscript Declined';
        decisionText = 'Declined';
        brandColor = '#dc2626'; // Red
        break;
      case 'revisions':
        newStatus = 'Revisions Requested';
        newActivity = 'Revisions Required from Author';
        decisionText = 'Revisions Required';
        brandColor = '#ca8a04'; // Yellow
        break;
      default:
        return NextResponse.json({ success: false, message: 'Invalid decision type' }, { status: 400 });
    }

    // 3. Update database
    await pool.query(
      'UPDATE submissions SET status = ?, activity = ?, editor_comments = ? WHERE id = ?',
      [newStatus, newActivity, comments || '', id]
    );

    // 4. Send Professional Email to Author
    const portalUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    await sendNotificationEmail(
      authorEmail,
      `Editorial Decision for Manuscript #${id} — EISR Portal`,
      `The Editorial Board has made a decision regarding your manuscript titled "${title}": ${decisionText}.`,
      `
        <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-top: 5px solid ${brandColor}; padding: 30px;">
          <h2 style="color: ${brandColor};">Decision Notification</h2>
          <p>Dear <strong>${authorName}</strong>,</p>
          <p>We are writing to inform you of the decision regarding your manuscript submitted to the EISR Portal.</p>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e2e8f0;">
            <strong>Title:</strong> ${title}<br/>
            <strong>Manuscript ID:</strong> #${id}<br/>
            <strong>Final Decision:</strong> <span style="color: ${brandColor}; font-weight: bold; text-transform: uppercase;">${decisionText}</span>
          </div>
          <p><strong>Editorial Comments:</strong><br/>
          ${comments || 'No specific comments provided.'}</p>
          <div style="margin: 30px 0; text-align: center;">
            <a href="${portalUrl}/dashboard/submissions/${id}" style="background: ${brandColor}; color: #fff; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-weight: bold;">View Details on Portal</a>
          </div>
          <p>Yours sincerely,<br/>The EISR Editorial Team</p>
        </div>
      `
    );

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
