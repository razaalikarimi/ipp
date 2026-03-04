import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import pool from '@/lib/db';
import jwt from 'jsonwebtoken';

// Add a fallback secret just for local testing, though it should be in .env.local
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key_eisr_123';

export async function POST(req) {
  try {
    const { email: identifier, password } = await req.json();

    if (!identifier || !password) {
      return NextResponse.json(
        { success: false, message: 'Please provide email/username and password.' },
        { status: 400 }
      );
    }

    // Fetch user from DB
    const [users] = await pool.query(
      'SELECT id, fullName, username, email, password FROM users WHERE email = ? OR username = ?',
      [identifier, identifier]
    );

    if (users.length === 0) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    const user = users[0];

    // Verify Password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { success: false, message: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, name: user.fullName },
      JWT_SECRET,
      { expiresIn: '2h' }
    );

    return NextResponse.json(
      { 
        success: true, 
        message: 'Login successful!',
        token: token,
        user: {
          id: user.id,
          fullName: user.fullName,
          username: user.username,
          email: user.email
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error.', error: error.message },
      { status: 500 }
    );
  }
}
