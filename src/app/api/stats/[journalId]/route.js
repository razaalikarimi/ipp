import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(req, { params }) {
  try {
    const { journalId } = await params;

    // 1. Count of published articles for this journal
    const [[{ articleCount }]] = await pool.query(
      "SELECT COUNT(*) AS articleCount FROM submissions WHERE status = 'Published' AND journal_id = ?",
      [journalId]
    );

    // 2. Total views across all published articles for this journal
    const [[{ totalViews }]] = await pool.query(
      "SELECT COALESCE(SUM(views), 0) AS totalViews FROM submissions WHERE status = 'Published' AND journal_id = ?",
      [journalId]
    );

    // 3. Total unique authors for this journal
    const [[{ authorCount }]] = await pool.query(
      `SELECT COUNT(DISTINCT email) as authorCount 
       FROM submission_contributors sc
       JOIN submissions s ON sc.submission_id = s.id
       WHERE s.status = 'Published' AND s.journal_id = ?`,
      [journalId]
    );

    // 4. Acceptance Rate for this journal
    const [[{ declinedCount }]] = await pool.query(
      "SELECT COUNT(*) AS declinedCount FROM submissions WHERE status = 'Declined' AND journal_id = ?",
      [journalId]
    );
    const totalProcessed = articleCount + declinedCount;
    const acceptanceRate = totalProcessed > 0 
      ? Math.round((articleCount / totalProcessed) * 100) + "%" 
      : "N/A";

    return NextResponse.json({
      success: true,
      stats: {
        articles: articleCount,
        views: Number(totalViews),
        authors: authorCount || 0,
        acceptance: acceptanceRate,
        citationsScopus: "N/A",
        citationsGoogle: "N/A",
        distribution: "International"
      }
    });
  } catch (error) {
    console.error('Journal stats error:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}
