import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyRequestUser, unauthorizedResponse } from '@/lib/auth';
import { sendNotificationEmail } from '@/lib/mail';
import { getSubmissionNotificationTemplate } from '@/lib/email-templates';

export async function GET(req) {
  const user = verifyRequestUser(req);
  if (!user) return unauthorizedResponse();

  try {
    const { searchParams } = new URL(req.url);
    const journalId = searchParams.get('journal');
    const role = searchParams.get('role') || 'author';

    let query = '';
    let params = [];

    if (role === 'reviewer') {
      query = `
        SELECT
          s.id,
          s.title,
          s.status,
          s.activity,
          DATE_FORMAT(s.created_at, '%M %d, %Y') AS date,
          s.created_at
        FROM submissions s
        JOIN reviewer_assignments ra ON s.id = ra.submission_id
        WHERE ra.user_id = ?
      `;
      params.push(user.userId);
    } else if (role === 'editor' || role === 'admin') {
      query = `
        SELECT
          id,
          title,
          status,
          activity,
          editor_comments,
          DATE_FORMAT(created_at, '%M %d, %Y') AS date,
          created_at
        FROM submissions
      `;
      // No WHERE user_id filter applied so Editors can see all submissions
    } else {
      query = `
        SELECT
          id,
          title,
          status,
          activity,
          editor_comments,
          DATE_FORMAT(created_at, '%M %d, %Y') AS date,
          created_at
        FROM submissions
        WHERE user_id = ?
      `;
      params.push(user.userId);
    }

    if (journalId) {
      if (role === 'reviewer') {
        query += ` AND s.journal_id = ?`;
      } else {
        query += ` AND journal_id = ?`;
      }
      params.push(journalId);
    }

    query += ` ORDER BY created_at DESC`;

    const [rows] = await pool.query(query, params);

    const submissions = rows.map((row) => ({
      id: row.id,
      title: row.title || 'Untitled Submission',
      status: row.status || 'Submitted',
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

      const htmlBody = getSubmissionNotificationTemplate({
        authorName: author.fullName,
        authorEmail: author.email,
        articleTitle: title,
        submissionId,
        journalName: journalId,
        editorComments,
        submissionDate,
        portalUrl,
      });

      await sendNotificationEmail(
        process.env.SMTP_USER,
        `New Submission Received — EISR Portal (#${submissionId})`,
        `New submission "${title}" received from ${author.fullName} (ID: ${submissionId})`,
        htmlBody
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
