import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    const [rows] = await pool.query(`
      SELECT 
        s.id, s.title, s.journal_id, s.created_at as published_date,
        s.views, s.abstract, s.keywords, s.references_list,
        s.doi, s.volume, s.issue, s.start_page, s.end_page,
        (SELECT sf.path FROM submission_files sf WHERE sf.submission_id = s.id LIMIT 1) as file_path,
        GROUP_CONCAT(sc.name ORDER BY sc.id SEPARATOR ', ') as authors
      FROM submissions s
      LEFT JOIN submission_contributors sc ON s.id = sc.submission_id
      WHERE s.id = ? AND s.status = 'Published'
      GROUP BY s.id
    `, [id]);

    if (rows.length === 0) {
      return NextResponse.json({ success: false, message: 'Article not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, article: rows[0] });
  } catch (error) {
    console.error('Article fetch error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
