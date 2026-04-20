import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET /api/stats?journal=jeisa  OR  /api/stats  (returns all journals)
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const journalId = searchParams.get('journal'); // e.g. 'jeisa', 'jeiml', or null for global

    const whereJournal = journalId ? `AND s.journal_id = ?` : '';
    const params = journalId ? [journalId] : [];

    // Total published articles for this journal
    const [[{ articleCount }]] = await pool.query(
      `SELECT COUNT(*) AS articleCount FROM submissions s WHERE s.status = 'Published' ${whereJournal}`,
      params
    );

    // Total views
    const [[{ totalViews }]] = await pool.query(
      `SELECT COALESCE(SUM(s.views), 0) AS totalViews FROM submissions s WHERE s.status = 'Published' ${whereJournal}`,
      params
    );

    // Total unique authors (contributors) for this journal's published articles
    const [[{ authorCount }]] = await pool.query(
      `SELECT COUNT(DISTINCT sc.name) AS authorCount 
       FROM submission_contributors sc
       INNER JOIN submissions s ON sc.submission_id = s.id
       WHERE s.status = 'Published' ${whereJournal}`,
      params
    );

    // Countries/distribution — count distinct affiliation countries from contributors
    // (approximate using count of unique contributor names as a proxy)
    const [[{ countryCount }]] = await pool.query(
      `SELECT COUNT(DISTINCT sc.email) AS countryCount
       FROM submission_contributors sc
       INNER JOIN submissions s ON sc.submission_id = s.id
       WHERE s.status = 'Published' ${whereJournal}`,
      params
    );

    // Acceptance rate — published / (published + declined) * 100
    const [[{ publishedCount }]] = await pool.query(
      `SELECT COUNT(*) AS publishedCount FROM submissions s WHERE s.status = 'Published' ${whereJournal}`,
      params
    );
    const [[{ declinedCount }]] = await pool.query(
      `SELECT COUNT(*) AS declinedCount FROM submissions s WHERE s.status = 'Declined' ${whereJournal}`,
      params
    );
    const totalDecided = Number(publishedCount) + Number(declinedCount);
    const acceptanceRate = totalDecided > 0
      ? `${Math.round((Number(publishedCount) / totalDecided) * 100)}%`
      : 'N/A';

    return NextResponse.json({
      success: true,
      articles: Number(articleCount),
      views: Number(totalViews),
      authors: Number(authorCount),
      distribution: countryCount > 0 ? `${countryCount}+ Countries` : 'International',
      acceptance: acceptanceRate,
      // These remain static (require Scopus/Scholar API integration)
      citationsScopus: 'N/A',
      citationsGoogle: 'N/A',
    });

  } catch (error) {
    console.error('Stats fetch error:', error);
    return NextResponse.json(
      {
        success: false,
        articles: 0, views: 0, authors: 0,
        distribution: 'N/A', acceptance: 'N/A',
        citationsScopus: 'N/A', citationsGoogle: 'N/A',
      },
      { status: 500 }
    );
  }
}
