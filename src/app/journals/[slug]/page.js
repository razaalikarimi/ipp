'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { journals, journalMenuItems } from '@/lib/data';
import { 
  Globe, ChevronRight, Users, Mail, 
  ChevronDown, Plus, Calendar, Linkedin, Instagram, Facebook,
  Loader2
} from 'lucide-react';
import JournalHero from '@/components/JournalHero';

export default function JournalPage() {
  const { slug } = useParams();
  const journal = journals.find(j => j.slug === slug) || journals[0];

  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);
  const [liveArticles, setLiveArticles] = useState([]);
  const [articlesLoading, setArticlesLoading] = useState(true);

  useEffect(() => {
    if (!journal) return;

    // Fetch live journal statistics
    fetch(`/api/stats?journal=${journal.id}`)
      .then(r => r.json())
      .then(data => { if (data.success) setStats(data); })
      .catch(() => {})
      .finally(() => setStatsLoading(false));

    // Fetch live published articles for this journal
    fetch(`/api/articles?journal=${journal.id}&limit=6`)
      .then(r => r.json())
      .then(data => { if (data.success) setLiveArticles(data.articles || []); })
      .catch(() => {})
      .finally(() => setArticlesLoading(false));
  }, [journal?.id]);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white selection:bg-[#4BA6B9]/10 relative">
      <Header />
      <JournalHero journal={journal} activeTab="home" />

      {/* Breadcrumb */}
      <div className="w-full bg-[#FAFBFC] py-4 px-6 border-b border-[#F1F5F9] text-[11px] font-bold text-[#999999]">
        <div className="max-w-[1240px] mx-auto space-x-3 flex items-center">
          <Link href="/" className="hover:text-[#4BA6B9] transition-colors">Home</Link>
          <ChevronRight size={10} className="text-[#BBBBBB]" />
          <Link href="/journals" className="hover:text-[#4BA6B9] transition-colors">Journals</Link>
          <ChevronRight size={10} className="text-[#BBBBBB]" />
          <span className="text-[#1A1A1A] font-black">{journal.id.toUpperCase()}</span>
        </div>
      </div>

      <main className="flex-grow pb-24 px-6">
        <div className="max-w-[1240px] mx-auto mt-12 grid lg:grid-cols-12 gap-12 items-start">

          {/* ── Primary Content ── */}
          <div className="lg:col-span-8 space-y-10">

            {/* Journal Information */}
            <div className="space-y-8">
              <h2 className="text-xl font-bold text-[#1A1A1A]">Journal Information</h2>
              <div className="bg-white border-2 border-[#E2E8F0] rounded-2xl p-6 md:p-10 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
                  <div className="space-y-6">
                    <InfoRow label="Title" value={journal.title} />
                    <InfoRow label="Publisher" value={journal.publisher} />
                    <InfoRow label="Organizer" value={journal.organizer} />
                    <div className="pt-2">
                      <p className="text-[11px] font-black text-[#1A1A1A] mb-4">Channel Hub</p>
                      <div className="flex gap-4">
                        <SocialIcon icon={Mail} color="text-sky-500" />
                        <SocialIcon icon={Linkedin} color="text-blue-700" />
                        <SocialIcon icon={Instagram} color="text-pink-600" />
                        <SocialIcon icon={Facebook} color="text-blue-600" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <InfoRow label="Frequency" value={journal.frequency} />
                    <InfoRow label="Review Type" value={journal.reviewType} />
                    <InfoRow label="Targeting Indexing" value={journal.indexing} />
                    <InfoRow label="Archiving" value={journal.archiving || 'Portico'} />
                    <InfoRow label="Process Speed" value={journal.reviewSpeed} />
                    <InfoRow label="Submission" value="Open Journal System (OJS)" color="text-[#4BA6B9]" />
                  </div>
                </div>
              </div>
            </div>

            {/* ── Journal Statistics — LIVE DATA ── */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-[#1A1A1A]">Journal Statistics</h2>
              <div className="bg-white rounded-2xl p-6 md:p-10 border-2 border-[#E2E8F0] shadow-sm">
                {statsLoading ? (
                  <div className="flex justify-center items-center py-10">
                    <Loader2 size={28} className="animate-spin text-[#4BA6B9]" />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-y-12 gap-x-8 text-center items-start">
                    <StatItem value={stats?.citationsScopus ?? 'N/A'} label="Citations By Scopus" />
                    <StatItem value={stats?.citationsGoogle ?? 'N/A'} label="Citations By Google Scholar" />
                    <StatItem value={stats?.articles ?? 0} label="Articles" highlight />
                    <StatItem value={stats?.views ?? 0} label="Total Views" highlight />
                    <StatItem value={stats?.authors ?? 0} label="Authors" highlight />
                    <StatItem value={stats?.distribution ?? 'International'} label="Authors Distribution" />
                    <StatItem value={stats?.acceptance ?? 'N/A'} label="Acceptance Rate" />
                  </div>
                )}
              </div>
            </div>

            {/* ── Latest Published Articles — LIVE DATA ── */}
            <div className="space-y-10 pt-4">
              <h2 className="text-xl font-bold text-[#1A1A1A]">Latest Published Articles</h2>
              {articlesLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 size={28} className="animate-spin text-[#4BA6B9]" />
                </div>
              ) : liveArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {liveArticles.map(article => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-[#999] text-sm border-2 border-dashed border-[#E2E8F0] rounded-2xl">
                  No published articles yet for this journal.
                </div>
              )}
            </div>

          </div>

          {/* ── Sidebar ── */}
          <aside className="lg:col-span-4 space-y-12">

            {/* Submit Card */}
            <div className="bg-[#F8F9FB] rounded-2xl p-8 md:p-12 text-center space-y-10 border border-[#E2E8F0] shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-32 h-32 bg-[#1e78ff]/5 rounded-full -ml-16 -mt-16 group-hover:scale-110 transition-transform" />
              <p className="text-[11px] font-black text-[#1A1A1A] max-w-[200px] mx-auto opacity-40 leading-relaxed uppercase tracking-tighter pt-8">
                {journal.id === 'jeiml'
                  ? 'Journal of Eye-Innovation in Machine Learning'
                  : 'Journal of Eye Innovation in Security Analysis'}
              </p>

              <Link
                href={`/dashboard/submit?journal=${journal.id}`}
                className="w-full bg-[#1A1A1A] text-white py-5 rounded-xl text-[12px] font-bold uppercase tracking-widest flex items-center justify-center space-x-3 hover:bg-[#4BA6B9] transition-all shadow-xl hover:-translate-y-0.5 whitespace-nowrap"
              >
                <span>Submit Manuscript</span>
                <ChevronRight size={14} />
              </Link>

              <div className="space-y-4 pt-4">
                {journal.editorialTeam.slice(0, 3).map(editor => (
                  <Link
                    key={editor.id}
                    href={`/journals/${journal.slug}/editorial-team`}
                    className="flex items-center space-x-5 text-left group cursor-pointer hover:bg-black/5 p-2 -m-2 rounded-xl transition-all"
                  >
                    <div className="w-14 h-14 rounded-full bg-white border border-[#E2E8F0] overflow-hidden flex items-center justify-center shrink-0 shadow-sm group-hover:border-[#4BA6B9] transition-colors">
                      {editor.photo
                        ? <img src={editor.photo} className="w-full h-full object-cover" />
                        : <Users size={24} className="text-[#BBBBBB]" />}
                    </div>
                    <div className="space-y-0.5">
                      <h4 className="text-[13px] font-bold text-[#1A1A1A] group-hover:text-[#4BA6B9] transition-colors">{editor.name}</h4>
                      <p className="text-[11px] font-medium text-[#999999] tracking-wider">{editor.role}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Journal Menu */}
            <div className="border border-[#E2E8F0] rounded-2xl overflow-hidden bg-white shadow-sm">
              <div className="bg-[#F8FBFF] px-8 py-5 border-b border-[#E2E8F0] flex items-center justify-between">
                <span className="text-sm font-bold text-[#0B1F3A]">Journal Menu</span>
                <ChevronDown size={14} className="text-[#1e78ff]" />
              </div>
              <div className="p-2">
                {journalMenuItems.map(item => (
                  <Link
                    key={item.slug}
                    href={`/journals/${journal.slug}/${item.slug}`}
                    className="group block px-8 py-4 text-[13px] font-bold text-[#1A1A1A] hover:bg-[#F8FBFF] hover:text-[#4BA6B9] rounded-xl transition-all border-b border-[#F1F5F9] last:border-0 relative"
                  >
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-[#4BA6B9] group-hover:h-6 transition-all rounded-r" />
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Indexing Partners */}
            <div className="bg-[#F8F9FA] p-10 rounded-2xl border border-[#E2E8F0] space-y-12 text-center shadow-sm">
              <div className="space-y-2">
                <h4 className="text-[12px] font-black text-[#1A1A1A]">Indexing Partners</h4>
                <div className="w-8 h-0.5 bg-[#4BA6B9] mx-auto opacity-40" />
              </div>
              <div className="flex flex-col items-center gap-12">
                <img src="/google-scholar.jpg" alt="Google Scholar" className="w-36 h-auto opacity-80 hover:opacity-100 transition-all hover:scale-105 duration-500" />
                <img src="/crossref.png" alt="Crossref" className="w-44 h-auto opacity-80 hover:opacity-100 transition-all hover:scale-105 duration-500" />
              </div>
            </div>

          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function InfoRow({ label, value, color = 'text-[#1A1A1A]' }) {
  return (
    <div className="grid grid-cols-12 gap-4 border-b border-[#F1F5F9] pb-4 last:border-0">
      <p className="col-span-4 text-[11px] font-black text-[#1A1A1A]">{label}</p>
      <p className={`col-span-8 text-[13px] font-bold ${color} leading-snug`}>{value}</p>
    </div>
  );
}

function StatItem({ value, label, highlight = false }) {
  return (
    <div className="space-y-3 flex flex-col items-center">
      <p className={`text-3xl font-black tracking-tighter ${highlight ? 'text-[#4BA6B9]' : 'text-[#1A1A1A]'}`}>
        {value}
      </p>
      <div className="w-8 h-1 bg-[#4BA6B9] rounded-full opacity-30 mx-auto" />
      <p className="text-[11px] font-bold text-[#1A1A1A] uppercase tracking-tight leading-tight max-w-[140px] px-2">{label}</p>
    </div>
  );
}

function SocialIcon({ icon: Icon, color }) {
  return (
    <Link href="#" className={`w-10 h-10 rounded-full border border-[#E2E8F0] flex items-center justify-center ${color} bg-white hover:bg-[#F8F9FA] transition-all shadow-sm`}>
      <Icon size={16} />
    </Link>
  );
}

function ArticleCard({ article }) {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-8 hover:shadow-2xl transition-all group flex flex-col h-full shadow-sm relative overflow-hidden">
      <div className="flex flex-wrap items-center gap-4 mb-6 text-[10px] font-bold text-[#1A1A1A]">
        <div className="flex items-center space-x-1.5 text-orange-600 bg-orange-50 px-2.5 py-1 rounded-md">
          <Plus size={10} className="rotate-45" /> <span>Open Access</span>
        </div>
        <div className="bg-[#7c1414] text-white px-2.5 py-1 rounded-md">Article</div>
        <div className="flex items-center space-x-1.5"><Globe size={11} className="text-[#4BA6B9]" /> <span>{article.views || 0} views</span></div>
        <div className="flex items-center space-x-1.5"><Calendar size={11} className="text-[#4BA6B9]" /> <span>First Online</span></div>
      </div>

      <Link href={`/articles/${article.id}`} className="block flex-grow">
        <h3 className="text-lg font-bold text-[#1e78ff] group-hover:text-[#4BA6B9] transition-colors leading-tight mb-4">
          {article.title}
        </h3>
      </Link>

      <div className="space-y-5 pt-6 border-t border-[#F1F5F9]">
        {article.doi && (
          <div className="flex items-center space-x-2">
            <span className="text-[11px] font-bold text-[#1A1A1A] whitespace-nowrap">DOI :</span>
            <span className="text-[11px] font-bold text-[#4BA6B9] truncate tracking-tight">{article.doi}</span>
          </div>
        )}
        <div className="text-[#1A1A1A] font-bold text-[10px] tracking-tight">
          {article.authors || 'Authors not listed'}
        </div>
        {article.abstract && (
          <p className="text-[11px] font-bold text-[#1A1A1A] leading-relaxed line-clamp-3 opacity-60">{article.abstract}</p>
        )}
      </div>
    </div>
  );
}
