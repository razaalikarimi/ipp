import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyRequestUser, unauthorizedResponse } from '@/lib/auth';
import { sendNotificationEmail } from '@/lib/mail';
import { getSubmissionNotificationTemplate } from '@/lib/email-templates';
import { journals } from '@/lib/data';

export async function GET(req) {
  const user = verifyRequestUser(req);
  if (!user) return unauthorizedResponse();

  try {
    const { searchParams } = new URL(req.url);
    const journalId = searchParams.get('journal');
    const role = searchParams.get('role') || 'author';

    let query = '';
    let params = [];
    let whereClauses = [];

    // --- ROLE BASED BASE QUERY & FILTERS ---
    if (role === 'reviewer') {
      query = `
        SELECT 
          s.id, s.title, s.status, s.activity,
          ra.status AS assignment_status, 
          DATE_FORMAT(s.created_at, '%M %d, %Y') AS date, s.created_at
        FROM submissions s
        JOIN reviewer_assignments ra ON s.id = ra.submission_id
      `;
      whereClauses.push('ra.user_id = ?');
      params.push(user.userId);
      if (journalId) {
        whereClauses.push('s.journal_id = ?');
        params.push(journalId);
      }
    } else if (role === 'editor' || role === 'admin') {
      query = `
        SELECT 
          id, title, status, activity, editor_comments, 
          DATE_FORMAT(created_at, '%M %d, %Y') AS date, created_at
        FROM submissions
      `;
      if (journalId) {
        whereClauses.push('journal_id = ?');
        params.push(journalId);
      }
    } else {
      // Author Role
      query = `
        SELECT 
          id, title, status, activity, editor_comments, 
          DATE_FORMAT(created_at, '%M %d, %Y') AS date, created_at
        FROM submissions
      `;
      whereClauses.push('user_id = ?');
      params.push(user.userId);
      if (journalId) {
        whereClauses.push('journal_id = ?');
        params.push(journalId);
      }
    }

    // --- CONSTRUCT WHERE CLAUSE ---
    if (whereClauses.length > 0) {
      query += ` WHERE ` + whereClauses.join(' AND ');
    }

    query += ` ORDER BY created_at DESC`;

    const [rows] = await pool.query(query, params);

    const submissions = rows.map((row) => ({
      id: row.id,
      title: row.title || 'Untitled Submission',
      status: role === 'reviewer' && row.assignment_status ? row.assignment_status : (row.status || 'Submitted'),
      submission_status: row.status || 'Submitted',
      activity: row.activity || 'Unassigned',
      date: row.date,
      created_at: row.created_at,
      editor_comments: row.editor_comments || '',
    }));

    return NextResponse.json(
      { success: true, submissions },
      { status: 200 }
    );
  } catch (error) {
    console.error('Fetch submissions error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error', error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const user = verifyRequestUser(req);
  if (!user) return unauthorizedResponse();

  try {
    const body = await req.json();

    const title =
      body.title ||
      body.details?.title ||
      body.submissionTitle ||
      '';

    const editorComments =
      body.editorComments ||
      body.forEditors?.comments ||
      body.comments ||
      '';

    const contributors = Array.isArray(body.contributors)
      ? body.contributors
      : [];

    const files = Array.isArray(body.files)
      ? body.files
      : [];

    const journalId = body.journalId || body.journal || 'jcsra';

    if (!title || !title.trim()) {
      return NextResponse.json(
        { success: false, message: 'Title is required' },
        { status: 400 }
      );
    }

    const [submissionResult] = await pool.query(
      `
      INSERT INTO submissions
      (user_id, title, status, activity, editor_comments, journal_id)
      VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        user.userId,
        title.trim(),
        'Submitted',
        'Unassigned',
        editorComments,
        journalId,
      ]
    );

    const submissionId = submissionResult.insertId;

    if (contributors.length > 0) {
      const contributorValues = contributors
        .filter((c) => c?.name)
        .map((c) => [submissionId, c.name, c.email || null]);

      if (contributorValues.length > 0) {
        await pool.query(
          'INSERT INTO submission_contributors (submission_id, name, email) VALUES ?',
          [contributorValues]
        );
      }
    }

    if (files.length > 0) {
      const fileValues = files
        .filter((f) => f?.name)
        .map((f) => [
          submissionId,
          f.name,
          f.type || 'Article Text',
          f.path || `/uploads/${f.name}`,
        ]);

      if (fileValues.length > 0) {
        await pool.query(
          'INSERT INTO submission_files (submission_id, name, type, path) VALUES ?',
          [fileValues]
        );
      }
    }

    const [userRows] = await pool.query(
      'SELECT fullName, email FROM users WHERE id = ?',
      [user.userId]
    );

    if (userRows.length > 0) {
      const author = userRows[0];
      const portalUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
      const submissionDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

      const targetJournal = journals.find(j => j.id === journalId) || journals[0];

      const htmlBody = getSubmissionNotificationTemplate({
        authorName: author.fullName,
        authorEmail: author.email,
        articleTitle: title,
        submissionId,
        journalName: targetJournal.title,
        editorComments,
        submissionDate,
        portalUrl,
      });

      // --- 1. Notification to the Admin (Internal) ---
      await sendNotificationEmail(
        process.env.SMTP_USER,
        `New Submission Received — EISR Portal (#${submissionId})`,
        `New submission "${title}" received from ${author.fullName} (ID: ${submissionId})`,
        htmlBody
      );

      // --- 2. Notification to the AUTHOR (Professional Confirmation) ---
      await sendNotificationEmail(
        author.email,
        `Manuscript Submission Confirmation — EISR Portal (#${submissionId})`,
        `Dear ${author.fullName}, your manuscript "${title}" has been successfully submitted to the ${targetJournal.title}.`,
        `
          <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-top: 5px solid #005f96; padding: 30px;">
            <h2 style="color: #005f96;">Submission Confirmation</h2>
            <p>Dear <strong>${author.fullName}</strong>,</p>
            <p>Thank you for submitting your manuscript to the <strong>${targetJournal.title}</strong> through the EISR Portal.</p>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #005f96;">
              <strong>Manuscript ID:</strong> #${submissionId}<br/>
              <strong>Title:</strong> ${title}<br/>
              <strong>Date:</strong> ${submissionDate}
            </div>
            <p>Your submission is currently with the Editorial Board for initial screening. You can track its progress by logging into the portal at any time.</p>
            <div style="margin: 30px 0; text-align: center;">
              <a href="${portalUrl}/dashboard/submissions/${submissionId}" style="background: #005f96; color: #fff; padding: 12px 25px; text-decoration: none; border-radius: 4px; font-weight: bold;">Track My Submission</a>
            </div>
            <p>Best regards,<br/>The EISR Editorial Team</p>
          </div>
        `
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Submission created successfully',
        submissionId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create submission error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error', error: error.message },
      { status: 500 }
    );
  }
}
