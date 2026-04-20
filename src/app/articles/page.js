import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import pool from '@/lib/db';
import { journals } from '@/lib/data';

export const metadata = {
  title: "Published Articles | Eye-Innovations Scientific Research",
  description: "Browse the repository of peer-reviewed scientific articles published by EISR.",
};

// Disable caching for this page to ensure new publications show up immediately
export const revalidate = 0;

export default async function ArticlesPage() {
  let publishedArticles = [];
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
    `);
    publishedArticles = rows;
  } catch (error) {
    console.error('Error fetching published articles:', error);
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white selection:bg-[#005f96]/10">
      <Header />
      
      <main className="flex-grow pb-20 px-6 mt-12">
        <section className="max-w-[1000px] mx-auto mb-10">
          <h1 className="text-3xl font-bold text-[#1A1A1A] mb-8">Published Articles</h1>
          
          <div className="space-y-6">
            {publishedArticles.length === 0 ? (
              <p className="text-gray-500 italic">No published articles found in the repository.</p>
            ) : (
              publishedArticles.map((art) => {
                const journal = journals.find(j => j.id.toLowerCase() === art.journal_id.toLowerCase());
                const date = new Date(art.published_date);
                const year = date.getFullYear();
                const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${year}`;
                
                // Generate a dummy DOI matching the requested pattern
                const doi = `https://doi.org/10.63180/${art.journal_id}.eisr.${year}.1.${art.id}`;

                return (
                  <div key={art.id} className="bg-white rounded-xl p-8 border border-[#E2E8F0] shadow-sm hover:shadow-md transition-shadow">
                    <div className="space-y-4">
                      <Link href={`/articles/${art.id}`} className="block">
                        <h3 className="text-[22px] font-semibold text-[#2563eb] hover:underline leading-tight">
                          {art.title}
                        </h3>
                      </Link>
                      
                      <div className="space-y-1 text-[15px] text-[#444]">
                        <p><span className="font-semibold text-[#666]">Authors:</span> {art.authors || 'Unknown'}</p>
                        <p><span className="font-semibold text-[#666]">Journal:</span> {journal ? journal.title : art.journal_id}</p>
                        <p><span className="font-semibold text-[#666]">Published:</span> {formattedDate}</p>
                      </div>

                      <div className="pt-2">
                        <a href={doi} target="_blank" rel="noopener noreferrer" className="text-[14px] text-[#2563eb] hover:underline">
                          DOI: {doi}
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
