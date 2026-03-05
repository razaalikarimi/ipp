import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyRequestUser, unauthorizedResponse } from '@/lib/auth';

export async function GET(req) {
  const user = verifyRequestUser(req);
  if (!user) return unauthorizedResponse();

  try {
    const [rows] = await pool.query(
      'SELECT id, fullName, username, email, givenName, familyName, affiliation, country, mailingAddress, orcid, bio, phone, createdAt FROM users WHERE id = ?',
      [user.userId]
    );

    if (rows.length === 0) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, profile: rows[0] }, { status: 200 });
  } catch (error) {
    console.error('Fetch profile error:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(req) {
  const user = verifyRequestUser(req);
  if (!user) return unauthorizedResponse();

  try {
    const updates = await req.json();

    const allowedFields = ['givenName', 'familyName', 'affiliation', 'country', 'mailingAddress', 'orcid', 'bio', 'phone', 'username', 'email'];
    
    // Build dynamic query
    let query = 'UPDATE users SET ';
    const params = [];
    
    for (const key of Object.keys(updates)) {
      if (allowedFields.includes(key) && updates[key] !== undefined) {
        query += `\`${key}\` = ?, `;
        params.push(updates[key]);
      }
    }
    
    if (params.length === 0) {
      return NextResponse.json({ success: false, message: 'No valid fields provided to update.' }, { status: 400 });
    }

    query = query.slice(0, -2) + ' WHERE id = ?';
    params.push(user.userId);

    await pool.query(query, params);

    return NextResponse.json({ success: true, message: 'Profile updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Update profile error:', error);
    // Duplicate username/email error
    if (error.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ success: false, message: 'Username or email already in use.' }, { status: 409 });
    }
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
