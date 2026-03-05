import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyRequestUser, unauthorizedResponse } from '@/lib/auth';

export async function GET(req) {
  const user = verifyRequestUser(req);
  if (!user) return unauthorizedResponse();

  try {
    const [rows] = await pool.query(
      'SELECT id, title, status, activity, created_at as date FROM submissions WHERE user_id = ? ORDER BY created_at DESC',
      [user.userId]
    );

    return NextResponse.json({ success: true, submissions: rows }, { status: 200 });
  } catch (error) {
    console.error('Fetch submissions error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req) {
  const user = verifyRequestUser(req);
  if (!user) return unauthorizedResponse();

  try {
    const body = await req.json();
    const { title, editorComments, contributors, files } = body;

    if (!title) {
      return NextResponse.json({ success: false, message: 'Title is required' }, { status: 400 });
    }

    // Insert submission
    const [submissionResult] = await pool.query(
      'INSERT INTO submissions (user_id, title, status, activity, editor_comments) VALUES (?, ?, ?, ?, ?)',
      [user.userId, title, 'Submitted', 'Unassigned', editorComments || '']
    );

    const submissionId = submissionResult.insertId;

    // Insert contributors
    if (contributors && contributors.length > 0) {
      const contributorValues = contributors.map(c => [submissionId, c.name, c.email]);
      await pool.query(
        'INSERT INTO submission_contributors (submission_id, name, email) VALUES ?',
        [contributorValues]
      );
    }

    // Insert files metadata (this handles simple file names, real impl would use S3/GridFS)
    if (files && files.length > 0) {
      const fileValues = files.map(f => [submissionId, f.name, f.type || 'Article Text', f.path || '/fake/path']);
      await pool.query(
        'INSERT INTO submission_files (submission_id, name, type, path) VALUES ?',
        [fileValues]
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Submission created successfully', 
      submissionId 
    }, { status: 201 });
  } catch (error) {
    console.error('Create submission error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
