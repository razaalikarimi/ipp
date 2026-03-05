
'use client';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { articles, journals } from '@/lib/data';
import { FileText, Calendar, User, Search, Globe, ChevronRight, BookOpen, Download, Activity, Eye, FilePieChart, Mail, MapPin } from 'lucide-react';

export default function ArticlePage() {
  const { slug } = useParams();
  const article = articles.find(a => a.slug === slug) || articles[0];
  const journal = journals.find(j => j.id === article.journal.toLowerCase()) || journals[0];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white selection:bg-[#4BA6B9]/10">
      <Header />
      
      {/* Article Hero Header */}
      <section className="bg-[#0B1F3A] text-white pt-48 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#4BA6B9]/10 rounded-full blur-[100px] -mr-48 -mt-48" />
        <div className="max-w-[1240px] mx-auto relative z-10 space-y-8">
           <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#4BA6B9]">Research Article | Open Access</span>
              <h1 className="text-3xl md:text-5xl font-sans font-bold leading-tight max-w-5xl ">{article.title}</h1>
           </div>
           
           <div className="flex flex-wrap gap-x-12 gap-y-6 pt-4 border-t border-white/10 mt-8">
              <div className="space-y-2">
                 <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Authors</p>
                 <p className="text-sm font-bold text-white">{article.authors}</p>
              </div>
              <div className="space-y-2">
                 <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Journal</p>
                 <p className="text-sm font-bold text-[#4BA6B9]">{article.journal}</p>
              </div>
              <div className="space-y-2">
                 <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">Publication Date</p>
                 <p className="text-sm font-bold text-white">{article.published}</p>
              </div>
              <div className="space-y-2">
                 <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">DOI</p>
                 <p className="text-sm font-bold text-white">{article.doi}</p>
              </div>
           </div>
        </div>
      </section>

      {/* Breadcrumb Band */}
      <div className="w-full bg-[#FAFBFC] py-4 px-6 border-b border-[#F1F5F9] text-[10px] font-bold uppercase tracking-widest text-[#999999]">
         <div className="max-w-[1240px] mx-auto space-x-3 flex items-center">
            <Link href="/" className="hover:text-[#4BA6B9]">Main</Link>
            <ChevronRight size={10} />
            <Link href="/articles" className="hover:text-[#4BA6B9]">Articles</Link>
            <ChevronRight size={10} />
            <span className="text-[#1A1A1A] truncate max-w-[200px]">{article.title}</span>
         </div>
      </div>

      <main className="flex-grow pb-40 px-6">
        <div className="max-w-[1240px] mx-auto mt-20 grid lg:grid-cols-12 gap-20 items-start">
           
           {/* Sidebar Options */}
           <div className="lg:col-span-3 space-y-10">
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-8 space-y-8">
                 <div className="space-y-4">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#4BA6B9]">Metrics</h4>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-sm flex flex-col items-center">
                          <Eye size={16} className="text-[#4BA6B9] mb-2" />
                          <span className="text-xs font-bold text-[#1A1A1A]">{article.views}</span>
                          <span className="text-[9px] font-bold text-[#999999] uppercase">Views</span>
                       </div>
                       <div className="bg-white p-4 rounded-xl border border-[#E2E8F0] shadow-sm flex flex-col items-center">
                          <Activity size={16} className="text-[#4BA6B9] mb-2" />
                          <span className="text-xs font-bold text-[#1A1A1A]">15</span>
                          <span className="text-[9px] font-bold text-[#999999] uppercase">Citations</span>
                       </div>
                    </div>
                 </div>
                 
                 <div className="space-y-4">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#4BA6B9]">Actions</h4>
                    <Link href={article.pdfUrl} className="w-full bg-[#1A1A1A] text-white py-4 text-[10px] font-bold uppercase tracking-[0.3em] flex items-center justify-center space-x-3 hover:bg-[#4BA6B9] transition-all rounded-xl shadow-lg shadow-black/10">
                       <Download size={14} />
                       <span>Download PDF</span>
                    </Link>
                 </div>

                 <div className="space-y-4">
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#4BA6B9]">Cite info</h4>
                    <div className="bg-white p-5 rounded-xl border border-[#E2E8F0] text-[11px] text-[#555555] leading-relaxed font-bold">
                       {article.authors} ({article.published.split('/').pop()}). {article.title}. {article.journal}. DOI: {article.doi}
                    </div>
                 </div>
              </div>

              {/* Journal Info Small */}
              <div className="p-8 bg-white border border-[#E2E8F0] rounded-2xl shadow-sm space-y-4 group cursor-pointer">
                 <div className="w-full aspect-square bg-[#0B1F3A] rounded-xl flex items-center justify-center p-6 mb-4">
                    <img src={journal.cover} alt={journal.title} className="max-w-full max-h-full object-contain" />
                 </div>
                 <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4BA6B9]">Published In</h4>
                 <h5 className="text-sm font-bold text-[#1A1A1A] group-hover:text-[#4BA6B9] transition-colors leading-tight uppercase underline decoration-2 decoration-transparent group-hover:decoration-[#4BA6B9]">{journal.title}</h5>
              </div>
           </div>

           {/* Main Content Area */}
           <div className="lg:col-span-9 space-y-16">
              <div className="space-y-8">
                 <h2 className="text-2xl font-sans font-bold text-[#1A1A1A] border-b border-[#F1F5F9] pb-6">Abstract</h2>
                 <p className="text-base text-[#333333] leading-loose font-medium text-justify">
                    {article.abstract}
                 </p>
              </div>

              <div className="space-y-8">
                 <h2 className="text-2xl font-sans font-bold text-[#1A1A1A] border-b border-[#F1F5F9] pb-6">Author Affiliations</h2>
                 <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-full bg-[#F4F6F9] flex items-center justify-center shrink-0">
                       <MapPin size={18} className="text-[#4BA6B9]" />
                    </div>
                    <p className="text-sm font-bold text-[#555555] leading-loose">
                       {article.affiliations}
                    </p>
                 </div>
              </div>

              <div className="space-y-8">
                 <h2 className="text-2xl font-sans font-bold text-[#1A1A1A] border-b border-[#F1F5F9] pb-6">Keywords</h2>
                 <div className="flex flex-wrap gap-3">
                    {['Machine Learning', 'Cyber Security', 'Digital Forensics', 'Risk Auditing', 'Deep Learning'].map(tag => (
                       <span key={tag} className="px-5 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-full text-[10px] font-bold uppercase tracking-widest text-[#555555] hover:bg-[#4BA6B9] hover:text-white hover:border-[#4BA6B9] transition-all cursor-default">
                          {tag}
                       </span>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
