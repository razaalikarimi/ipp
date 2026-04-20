import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT 
        s.id, s.title, s.journal_id, s.created_at as published_date,
        GROUP_CONCAT(sc.name ORDER BY sc.id SEPARATOR ', ') as authors
      FROM submissions s
      LEFT JOIN submission_contributors sc ON s.id = sc.submission_id
      WHERE s.status = 'Published'
      GROUP BY s.id
      ORDER BY s.created_at DESC
      LIMIT 10
    `);

    return NextResponse.json({ success: true, articles: rows });
  } catch (error) {
    console.error('Fetch latest articles error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
