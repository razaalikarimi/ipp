import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { verifyRequestUser, unauthorizedResponse } from '@/lib/auth';

export async function GET(req) {
  const user = verifyRequestUser(req);
  if (!user) return unauthorizedResponse();

  try {
    const [rows] = await pool.query(
      `SELECT
        id,
        fullName,
        username,
        email,
        givenName,
        familyName,
        affiliation,
        country,
        mailingAddress,
        orcid,
        bio,
        phone,
        createdAt
      FROM users
      WHERE id = ?`,
      [user.userId]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, profile: rows[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error('Fetch profile error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error', error: error.message },
      { status: 500 }
    );
  }
}
