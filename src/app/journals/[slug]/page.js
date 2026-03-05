'use client';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { journals, articles, journalMenuItems } from '@/lib/data';
import { 
  Globe, ChevronRight, FileText, Info, Users, ShieldCheck, Mail, 
  ChevronDown, LayoutGrid, Plus, Calendar, Linkedin, Instagram, Facebook 
} from 'lucide-react';
import JournalHero from '@/components/JournalHero';

export default function JournalPage() {
  const { slug } = useParams();
  const journal = journals.find(j => j.slug === slug) || journals[0]; 
  const journalArticles = articles.filter(a => a.journal.toLowerCase() === journal.id.toLowerCase());

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white selection:bg-[#4BA6B9]/10">
      <Header />
      
      <JournalHero journal={journal} activeTab="home" />

      {/* Breadcrumb Band */}
      <div className="w-full bg-[#FAFBFC] py-4 px-6 border-b border-[#F1F5F9] text-[11px] font-bold text-[#999999]">
         <div className="max-w-[1240px] mx-auto space-x-3 flex items-center">
            <Link href="/" className="hover:text-[#4BA6B9] transition-colors">Home</Link>
            <ChevronRight size={10} className="text-[#BBBBBB]" />
            <Link href="/journals" className="hover:text-[#4BA6B9] transition-colors">Journals</Link>
            <ChevronRight size={10} className="text-[#BBBBBB]" />
            <span className="text-[#1A1A1A] font-black">{journal.id.toUpperCase()}</span>
         </div>
      </div>

      <main className="flex-grow pb-40 px-6">
        <div className="max-w-[1240px] mx-auto mt-16 grid lg:grid-cols-12 gap-12 items-start">
           
           {/* Primary Content */}
           <div className="lg:col-span-8 space-y-16">
              
              {/* Journal Information Box */}
              <div className="space-y-8">
                <h2 className="text-xl font-bold text-[#1A1A1A]">Journal Information</h2>
                <div className="bg-white border-2 border-[#E2E8F0] rounded-2xl p-10 shadow-sm">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
                      <div className="space-y-6">
                        <InfoRow label="Title" value={journal.title} />
                        <InfoRow label="ISSN" value={journal.issn} />
                        <InfoRow label="Doi Prefix" value={journal.doiPrefix} />
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
                        <InfoRow label="Frequency" value={journal.frequency} color="text-[#1A1A1A]" />
                        <InfoRow label="Review Type" value={journal.reviewType} color="text-[#1A1A1A]" />
                        <InfoRow label="Indexing" value={journal.indexing} color="text-[#1A1A1A]" />
                        <InfoRow label="Archiving" value={journal.archiving || 'Portico'} color="text-[#1A1A1A]" />
                        <InfoRow label="Process Speed" value={journal.reviewSpeed} />
                        <InfoRow label="Submission" value="Open Journal System (OJS)" color="text-[#4BA6B9]" />
                      </div>
                   </div>
                </div>
              </div>

              {/* Journal Statistics Bar */}
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-[#1A1A1A]">Journal Statistics</h2>
                <div className="bg-[#white] rounded-2xl p-10 border-2 border-[#E2E8F0] shadow-sm">
                   <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 text-center divide-x divide-[#E2E8F0] overflow-hidden">
                      <StatItem value={journal.stats.citationsScopus} label="Citations By Scopus" />
                      <StatItem value={journal.stats.citationsGoogle} label="Citations By Google Scholar" />
                      <StatItem value={journal.stats.articles} label="Articles" />
                      <StatItem value={journal.stats.views} label="Total Views" />
                      <StatItem value={journal.stats.authors} label="Authors" />
                      <StatItem value={journal.stats.distribution} label="Authors Distribution" />
                      <StatItem value={journal.stats.acceptance} label="Acceptance Rate" />
                   </div>
                </div>
              </div>

              {/* Latest Published Articles Section - Grid approach from screenshot */}
              <div className="space-y-10 pt-4">
                 <h2 className="text-xl font-bold text-[#1A1A1A]">Latest Published Articles</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {journalArticles.map(article => (
                       <ArticleCard key={article.slug} article={article} />
                    ))}
                 </div>
              </div>

           </div>

           {/* Sidebar */}
           <aside className="lg:col-span-4 space-y-12">
              
              {/* Publisher Sidebar Box */}
              <div className="bg-[#F8F9FB] rounded-2xl p-12 text-center space-y-10 border border-[#E2E8F0] shadow-sm relative overflow-hidden group">
                 <div className="absolute top-0 left-0 w-32 h-32 bg-[#1e78ff]/5 rounded-full -ml-16 -mt-16 group-hover:scale-110 transition-transform" />
                 <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-2">
                       <span className="text-4xl font-black tracking-tighter text-[#1A1A1A]">EISR</span>
                    </div>
                    <p className="text-[11px] font-black text-[#1A1A1A] max-w-[200px] mx-auto opacity-40 leading-relaxed">Eye-Innovations Scientific Research</p>
                 </div>
                 <Link href="/submission" className="block w-full bg-[#1A1A1A] text-white py-5 rounded-xl text-[12px] font-black hover:bg-[#4BA6B9] transition-all shadow-xl shadow-black/5">
                    Submit Manuscript
                 </Link>
                 
                 <div className="space-y-8 pt-6">
                    {journal.editorialTeam.slice(0, 3).map(editor => (
                       <div key={editor.id} className="flex items-center space-x-5 text-left group/ed cursor-pointer">
                          <div className="w-14 h-14 rounded-full bg-white border border-[#E2E8F0] overflow-hidden flex items-center justify-center shrink-0 shadow-sm">
                             {editor.photo ? <img src={editor.photo} className="w-full h-full object-cover" /> : <Users size={24} className="text-[#BBBBBB]" />}
                          </div>
                          <div className="space-y-0.5">
                             <h4 className="text-[13px] font-bold text-[#1A1A1A] group-hover/ed:text-[#4BA6B9] transition-colors">{editor.name}</h4>
                             <p className="text-[11px] font-medium text-[#999999] tracking-wider">{editor.role}</p>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              {/* Journal Menu Sidebar Box */}
              <div className="border border-[#E2E8F0] rounded-2xl overflow-hidden bg-white shadow-sm">
                 <div className="bg-[#F8FBFF] px-8 py-5 border-b border-[#E2E8F0] flex items-center justify-between group cursor-pointer">
                    <span className="text-sm font-bold text-[#0B1F3A]">Journal Menu</span>
                    <ChevronDown size={14} className="text-[#1e78ff]" />
                 </div>
                 <div className="p-2">
                    {journalMenuItems.map(item => (
                       <Link key={item.slug} href={`/journals/${journal.slug}/${item.slug}`} className="group block px-8 py-4 text-[13px] font-bold text-[#1A1A1A] hover:bg-[#F8FBFF] hover:text-[#4BA6B9] rounded-xl transition-all border-b border-[#F1F5F9] last:border-0 relative">
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-[#4BA6B9] group-hover:h-6 transition-all rounded-r" />
                          {item.name}
                       </Link>
                    ))}
                 </div>
              </div>

              {/* Indexing Partners Sidebar */}
              <div className="bg-[#F8F9FA] p-10 rounded-2xl border border-[#E2E8F0] space-y-12 text-center shadow-sm">
                 <div className="space-y-2">
                    <h4 className="text-[12px] font-black text-[#1A1A1A]">Indexing Partners</h4>
                    <div className="w-8 h-0.5 bg-[#4BA6B9] mx-auto opacity-40"></div>
                 </div>
                 <div className="grid grid-cols-1 gap-12 group">
                    <div className="flex flex-col items-center space-y-2 group/item">
                        <div className="text-[14px] font-black text-[#1A1A1A] tracking-[0.2em] border-2 border-[#1A1A1A]/10 px-5 py-2.5 rounded-lg italic group-hover/item:border-[#FF6B00] group-hover/item:text-[#FF6B00] transition-all">Scopus</div>
                    </div>
                    <div className="flex flex-col items-center space-y-2 group/item">
                        <div className="text-[14px] font-black text-[#1A1A1A] tracking-[0.2em] border-2 border-[#1A1A1A]/10 px-5 py-2.5 rounded-lg font-serif group-hover/item:border-[#004A99] group-hover/item:text-[#004A99] transition-all">Ebsco</div>
                    </div>
                    <div className="flex flex-col items-center space-y-2 text-[18px] font-black text-[#1A1A1A] tracking-tighter opacity-80 group-hover:text-black group-hover:scale-110 transition-all cursor-default">
                        Crossref
                    </div>
                    <div className="flex flex-col items-center space-y-2 cursor-default group/item">
                        <span className="text-[16px] font-bold text-[#1A1A1A] opacity-80 group-hover/item:opacity-100 transition-all">Google <span className="text-[#4BA6B9]">Scholar</span></span>
                    </div>
                    <div className="flex flex-col items-center space-y-2 text-[11px] font-black text-[#1A1A1A] opacity-40 group-hover:opacity-80 transition-all cursor-default">
                        PORTICO
                    </div>
                 </div>
              </div>

           </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function InfoRow({ label, value, color = "text-[#1A1A1A]" }) {
  return (
    <div className="grid grid-cols-12 gap-4 border-b border-[#F1F5F9] pb-4 last:border-0">
      <p className="col-span-4 text-[11px] font-black text-[#1A1A1A]">{label}</p>
      <p className={`col-span-8 text-[13px] font-bold ${color} leading-snug`}>{value}</p>
    </div>
  );
}

function StatItem({ value, label }) {
  return (
    <div className="space-y-2 px-6 text-center first:pl-0">
       <p className="text-3xl font-bold text-[#1A1A1A] tracking-tighter">{value}</p>
        <p className="text-[10px] font-bold text-[#1A1A1A] leading-tight break-words">{label}</p>
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
          <div className="flex items-center space-x-1.5 font-bold"><Globe size={11} className="text-[#4BA6B9]" /> <span>{article.views} views</span></div>
          <div className="flex items-center space-x-1.5 font-bold"><Calendar size={11} className="text-[#4BA6B9]" /> <span>First Online</span></div>
       </div>
       
       <Link href={`/articles/${article.slug}`} className="block flex-grow">
          <h3 className="text-lg font-bold text-[#1e78ff] group-hover:text-[#4BA6B9] transition-colors leading-tight mb-4">
             {article.title}
          </h3>
       </Link>

       <div className="space-y-5 pt-6 border-t border-[#F1F5F9]">
          <div className="flex items-center space-x-2">
              <span className="text-[11px] font-bold text-[#1A1A1A] whitespace-nowrap">Doi :</span>
             <span className="text-[11px] font-bold text-[#4BA6B9] truncate hover:underline cursor-pointer tracking-tight">{article.doi}</span>
          </div>
           <div className="flex flex-wrap gap-2 text-[#1A1A1A] font-bold text-[10px] tracking-tight">
             {article.authors.join('   |   ')}
          </div>
          <p className="text-[11px] font-bold text-[#1A1A1A] leading-relaxed line-clamp-3 opacity-60">{article.affiliations}</p>
       </div>
    </div>
  );
}
