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

    // --- HARDCODED USER SYNC LOGIC ---
    // Check if the provided identifier matches any hardcoded env credentials
    const hardcodedUsers = [
      { email: process.env.ADMIN_1_EMAIL, pass: process.env.ADMIN_1_PASS, role: 'admin', name: 'Admin One' },
      { email: process.env.ADMIN_2_EMAIL, pass: process.env.ADMIN_2_PASS, role: 'admin', name: 'Admin Two' },
      { email: process.env.ADMIN_3_EMAIL, pass: process.env.ADMIN_3_PASS, role: 'admin', name: 'Admin Three' },
      { email: process.env.EDITOR_1_EMAIL, pass: process.env.EDITOR_1_PASS, role: 'editor', name: 'Editor One' },
      { email: process.env.EDITOR_2_EMAIL, pass: process.env.EDITOR_2_PASS, role: 'editor', name: 'Editor Two' },
      { email: process.env.EDITOR_3_EMAIL, pass: process.env.EDITOR_3_PASS, role: 'editor', name: 'Editor Three' },
      { email: process.env.REVIEWER_1_EMAIL, pass: process.env.REVIEWER_1_PASS, role: 'reviewer', name: 'Reviewer One' },
      { email: process.env.REVIEWER_2_EMAIL, pass: process.env.REVIEWER_2_PASS, role: 'reviewer', name: 'Reviewer Two' },
      { email: process.env.REVIEWER_3_EMAIL, pass: process.env.REVIEWER_3_PASS, role: 'reviewer', name: 'Reviewer Three' },
    ];

    const matchedHardcoded = hardcodedUsers.find(u => u.email && u.email.toLowerCase() === identifier.toLowerCase());

    if (matchedHardcoded && matchedHardcoded.pass === password) {
      // Check if this hardcoded user exists in the DB, if not, create them
      const [existing] = await pool.query('SELECT id, fullName, username, email, role FROM users WHERE email = ?', [matchedHardcoded.email]);
      
      let finalUser;
      if (existing.length === 0) {
        // Create the user in database so they have a real ID for relations
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await pool.query(
          'INSERT INTO users (fullName, username, email, password, role) VALUES (?, ?, ?, ?, ?)',
          [matchedHardcoded.name, matchedHardcoded.email.split('@')[0], matchedHardcoded.email, hashedPassword, matchedHardcoded.role]
        );
        finalUser = { id: result.insertId, fullName: matchedHardcoded.name, email: matchedHardcoded.email, role: matchedHardcoded.role };
      } else {
        finalUser = existing[0];
        // Ensure role is correctly set in DB (may have been created without role during assignment)
        if (!finalUser.role || finalUser.role !== matchedHardcoded.role) {
          await pool.query('UPDATE users SET role = ? WHERE id = ?', [matchedHardcoded.role, finalUser.id]);
          finalUser.role = matchedHardcoded.role;
        }
      }

      // *** CRITICAL FIX: Sync reviewer_assignments to use THIS user's ID ***
      // This handles the case where assignments were created with a different user_id
      // for the same email (e.g., placeholder user created before login)
      if (matchedHardcoded.role === 'reviewer') {
        // Find any reviewer_assignments linked to users with this email but different user_id
        const [otherUsers] = await pool.query(
          'SELECT id FROM users WHERE email = ? AND id != ?',
          [matchedHardcoded.email, finalUser.id]
        );
        if (otherUsers.length > 0) {
          const otherIds = otherUsers.map(u => u.id);
          // Update any assignments pointing to the old user_id to point to the real user
          await pool.query(
            `UPDATE reviewer_assignments SET user_id = ? WHERE user_id IN (${otherIds.map(() => '?').join(',')})`,
            [finalUser.id, ...otherIds]
          );
        }
        // Also update any assignments that have this email via users table - direct fix
        await pool.query(
          `UPDATE reviewer_assignments ra
           JOIN users u ON ra.user_id = u.id
           SET ra.user_id = ?
           WHERE u.email = ? AND ra.user_id != ?`,
          [finalUser.id, matchedHardcoded.email, finalUser.id]
        );
      }

      // Generate JWT for the hardcoded user
      const token = jwt.sign(
        { userId: finalUser.id, email: finalUser.email, name: finalUser.fullName, role: finalUser.role },
        JWT_SECRET,
        { expiresIn: '2h' }
      );

      return NextResponse.json({ 
        success: true, 
        message: 'Login successful (Environment User Identified)!',
        token: token,
        user: { id: finalUser.id, fullName: finalUser.fullName, email: finalUser.email, role: finalUser.role }
      }, { status: 200 });
    }
    // --- END HARDCODED USER SYNC LOGIC ---

    // Fetch user from DB (for normal registered Authors)
    const [users] = await pool.query(
      'SELECT id, fullName, username, email, password, role FROM users WHERE email = ? OR username = ?',
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
      { userId: user.id, email: user.email, name: user.fullName, role: user.role },
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
          email: user.email,
          role: user.role
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
