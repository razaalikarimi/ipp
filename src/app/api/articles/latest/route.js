import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const journalId = searchParams.get('journalId');

    let query = `
      SELECT 
        s.id, s.title, s.journal_id, s.created_at as published_date, s.views, s.doi,
        GROUP_CONCAT(sc.name ORDER BY sc.id SEPARATOR ', ') as authors
      FROM submissions s
      LEFT JOIN submission_contributors sc ON s.id = sc.submission_id
      WHERE s.status = 'Published'
    `;
    const queryParams = [];

    if (journalId) {
      query += ` AND s.journal_id = ? `;
      queryParams.push(journalId);
    }

    query += `
      GROUP BY s.id
      ORDER BY s.created_at DESC
      LIMIT 10
    `;

    const [rows] = await pool.query(query, queryParams);

    // Format authors into array for frontend consistency
    const formattedRows = rows.map(r => ({
      ...r,
      authors: r.authors ? r.authors.split(', ') : []
    }));

    return NextResponse.json({ success: true, articles: formattedRows });
  } catch (error) {
    console.error('Fetch latest articles error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
