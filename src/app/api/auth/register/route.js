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

    // --- STRICT VALIDATION ---
    if (!givenName || givenName.trim().length < 2) {
      return NextResponse.json({ success: false, message: 'Given Name must be at least 2 characters.' }, { status: 400 });
    }
    if (!affiliation || affiliation.trim().length < 3) {
      return NextResponse.json({ success: false, message: 'Affiliation must be at least 3 characters.' }, { status: 400 });
    }
    if (!country) {
      return NextResponse.json({ success: false, message: 'Please select your country.' }, { status: 400 });
    }
    if (!username || username.trim().length < 4) {
      return NextResponse.json({ success: false, message: 'Username must be at least 4 characters.' }, { status: 400 });
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return NextResponse.json({ success: false, message: 'Username can only contain letters, numbers, and underscores.' }, { status: 400 });
    }
    if (!email || !email.includes('@')) {
      return NextResponse.json({ success: false, message: 'Please provide a valid email address.' }, { status: 400 });
    }
    if (!password || password.length < 5) {
      return NextResponse.json({ success: false, message: 'Password must be at least 5 characters long.' }, { status: 400 });
    }
    const passwordRegex = /^[A-Z](?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{4,}$/;
    if (!passwordRegex.test(password)) {
      return NextResponse.json({ 
        success: false, 
        message: 'Password must start with an uppercase letter and include at least one number and one special character (@$!%*?&).' 
      }, { status: 400 });
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
      (fullName, username, email, password, role, givenName, familyName, affiliation, country)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        fullName,
        username,
        email,
        hashedPassword,
        'author',
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

    // Notify Admin about new user
    await sendNotificationEmail(
      process.env.SMTP_USER,
      'New User Registration - EISR Portal',
      `A new user has registered: ${fullName} (${username})`,
      `
        <h2>New User Registration</h2>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Username:</strong> ${username}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Role:</strong> author</p>
        <p><strong>Given Name:</strong> ${givenName || 'N/A'}</p>
        <p><strong>Family Name:</strong> ${familyName || 'N/A'}</p>
        <p><strong>Affiliation:</strong> ${affiliation || 'N/A'}</p>
        <p><strong>Country:</strong> ${country || 'N/A'}</p>
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
