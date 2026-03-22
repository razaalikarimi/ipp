import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import pool from '@/lib/db';
import { sendNotificationEmail } from '@/lib/mail';

export async function POST(req) {
  try {
    const body = await req.json();

    const givenName = body.givenName || '';
    const familyName = body.familyName || '';
    const affiliation = body.affiliation || null;
    const country = body.country || null;

    const fullName =
      body.fullName || `${givenName} ${familyName}`.trim();

    const { username, email, password } = body;

    if (!fullName || !username || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: 'Please provide full name, username, email, and password.',
        },
        { status: 400 }
      );
    }

    const [existingUsers] = await pool.query(
      'SELECT id FROM users WHERE email = ? OR username = ?',
      [email, username]
    );

    if (existingUsers.length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'User with this email or username already exists.',
        },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      `INSERT INTO users
      (fullName, username, email, password, givenName, familyName, affiliation, country)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        fullName,
        username,
        email,
        hashedPassword,
        givenName || null,
        familyName || null,
        affiliation,
        country,
      ]
    );

    await sendNotificationEmail(
      email,
      'Registration Successful - EISR Portal',
      `Hello ${fullName}, your account has been created successfully.`,
      `
        <h2>Registration Successful</h2>
        <p>Hello ${fullName},</p>
        <p>Your account has been created successfully on the EISR Portal.</p>
        <p>You can now log in and continue using the portal.</p>
      `
    );

    return NextResponse.json(
      {
        success: true,
        message: 'User registered successfully!',
        userId: result.insertId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error.',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
