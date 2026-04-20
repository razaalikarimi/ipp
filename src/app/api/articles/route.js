import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET /api/articles?journal=jeisa&limit=6
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const journalId = searchParams.get('journal');
    const limit = parseInt(searchParams.get('limit') || '10');

    const whereJournal = journalId ? `AND s.journal_id = ?` : '';
    const params = journalId ? [journalId, limit] : [limit];

    const [rows] = await pool.query(`
      SELECT 
        s.id, s.title, s.journal_id, s.abstract, s.views,
        s.created_at as published_date,
        GROUP_CONCAT(sc.name ORDER BY sc.id SEPARATOR ', ') as authors,
        (SELECT sf.path FROM submission_files sf WHERE sf.submission_id = s.id LIMIT 1) as file_path
      FROM submissions s
      LEFT JOIN submission_contributors sc ON s.id = sc.submission_id
      WHERE s.status = 'Published' ${whereJournal}
      GROUP BY s.id
      ORDER BY s.created_at DESC
      LIMIT ?
    `, params);

    return NextResponse.json({ success: true, articles: rows });
  } catch (error) {
    console.error('Fetch articles error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
