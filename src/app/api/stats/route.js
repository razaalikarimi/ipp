import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { journals } from '@/lib/data';

export async function GET() {
  try {
    // Count of published articles
    const [[{ articleCount }]] = await pool.query(
      "SELECT COUNT(*) AS articleCount FROM submissions WHERE status = 'Published'"
    );

    // Total views across all published articles
    const [[{ totalViews }]] = await pool.query(
      "SELECT COALESCE(SUM(views), 0) AS totalViews FROM submissions WHERE status = 'Published'"
    );

    // Total declined articles for acceptance rate calculation
    const [[{ declinedCount }]] = await pool.query(
      "SELECT COUNT(*) AS declinedCount FROM submissions WHERE status = 'Declined'"
    );

    // Calculate acceptance rate
    const totalProcessed = articleCount + declinedCount;
    const acceptanceRateValue = totalProcessed > 0 
      ? Math.round((articleCount / totalProcessed) * 100) + "%" 
      : "N/A";

    // Total unique authors from published articles
    const [[{ authorCount }]] = await pool.query(
      `SELECT COUNT(DISTINCT email) as authorCount 
       FROM submission_contributors sc
       JOIN submissions s ON sc.submission_id = s.id
       WHERE s.status = 'Published'`
    );

    // Total journals (static from data.js)
    const journalCount = journals.length;

    return NextResponse.json({
      success: true,
      articles: articleCount,
      views: Number(totalViews),
      journals: journalCount,
      authors: authorCount || 0,
      acceptanceRate: acceptanceRateValue,
      citationsScopus: "N/A",
      citationsGoogle: "N/A",
      distribution: "International"
    });
  } catch (error) {
    console.error('Stats fetch error:', error);
    return NextResponse.json(
      { success: false, articles: 0, views: 0, journals: 0 },
      { status: 500 }
    );
  }
}
