import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import pool from '@/lib/db';

export async function POST(req) {
  try {
    const { fullName, username, email, password } = await req.json();

    // Basic validation
    if (!fullName || !username || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'Please provide full name, username, email, and password.' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const [existingUsers] = await pool.query(
      'SELECT id FROM users WHERE email = ? OR username = ?',
      [email, username]
    );

    if (existingUsers.length > 0) {
      return NextResponse.json(
        { success: false, message: 'User with this email or username already exists.' },
        { status: 409 }
      );
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert new user
    const [result] = await pool.query(
      'INSERT INTO users (fullName, username, email, password) VALUES (?, ?, ?, ?)',
      [fullName, username, email, hashedPassword]
    );

    return NextResponse.json(
      { 
        success: true, 
        message: 'User registered successfully!',
        userId: result.insertId
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error.', error: error.message },
      { status: 500 }
    );
  }
}
