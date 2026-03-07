
'use client';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { journals } from '@/lib/data';
import { ChevronRight, Users, Info, BookOpen, ShieldCheck, Mail, Globe, MapPin, Activity, Fingerprint, Clock } from 'lucide-react';

import JournalHero from '@/components/JournalHero';

export default function JournalSectionPage() {
  const { slug, section } = useParams();
  const journal = journals.find(j => j.slug === slug) || journals[0];
  
  // Normalized section key
  const sectionKey = section.replace(/-/g, ' ');

  const renderSectionContent = () => {
    switch (section) {
      case 'aims-and-scope':
        return (
          <div className="space-y-12">
             <h2 className="text-3xl font-sans font-bold text-[#1A1A1A] border-b border-[#F1F5F9] pb-6 uppercase">Aims & Scope</h2>
             <p className="text-base text-[#555555] leading-loose font-medium text-justify">{journal.aims}</p>
             <div className="space-y-6 pt-6">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4BA6B9]">Scope Includes (but is not limited to):</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {journal.scope.map(s => (
                      <li key={s} className="flex items-center text-sm font-bold text-[#1A1A1A]">
                         <div className="w-2 h-2 bg-[#4BA6B9] rounded-full mr-4 shrink-0 shadow-sm shadow-[#4BA6B9]/40" />
                         {s}
                      </li>
                   ))}
                </ul>
             </div>
          </div>
        );
      case 'author-guidelines':
        return (
           <div className="space-y-12">
              <h2 className="text-3xl font-sans font-bold text-[#1A1A1A] border-b border-[#F1F5F9] pb-6 uppercase">Author Guidelines</h2>
              <div className="text-base text-[#555555] leading-loose font-medium whitespace-pre-line text-justify">
                {journal.guidelines}
              </div>
           </div>
        );
      case 'editorial-team':
        return (
          <div className="space-y-12">
            <h2 className="text-3xl font-sans font-bold text-[#1A1A1A] border-b border-[#F1F5F9] pb-6 uppercase">Editorial Team</h2>
            <div className="grid grid-cols-1 gap-12">
               {journal.editorialTeam.map((ed, i) => (
                  <div key={ed.id} className="bg-white border border-[#E2E8F0] p-8 rounded-2xl shadow-sm flex flex-col md:flex-row gap-8 items-start hover:shadow-xl transition-all group">
                     <div className="w-16 h-16 rounded-full bg-[#FAFBFC] border border-[#E2E8F0] flex items-center justify-center shrink-0 shadow-sm text-[#4BA6B9]">
                        <Users size={24} />
                     </div>
                     <div className="space-y-4">
                        <div className="space-y-1">
                           <p className="text-[9px] font-bold uppercase tracking-widest text-[#4BA6B9]">{ed.role}</p>
                           <h4 className="text-xl font-bold text-[#1A1A1A] group-hover:text-[#4BA6B9] transition-colors">{ed.name}</h4>
                        </div>
                        <p className="text-sm font-bold text-[#555555]">{ed.affiliation}</p>
                        <div className="flex gap-6">
                           <Link href={`/editors/${ed.id}`} className="text-[10px] font-bold uppercase tracking-widest text-[#4BA6B9] underline underline-offset-4">View Profile</Link>
                           {ed.email && <span className="text-[10px] font-bold uppercase tracking-widest text-[#999999]">{ed.email}</span>}
                        </div>
                     </div>
                  </div>
               ))}
            </div>
          </div>
        );
      case 'about':
        return (
          <div className="space-y-12">
             <h2 className="text-3xl font-sans font-bold text-[#1A1A1A] border-b border-[#F1F5F9] pb-6 uppercase">About The Journal</h2>
             <div className="text-base text-[#555555] leading-loose font-medium text-justify whitespace-pre-line">
                {journal.about}
             </div>
          </div>
        );
      case 'indexing':
        return (
          <div className="space-y-12">
             <h2 className="text-3xl font-sans font-bold text-[#1A1A1A] border-b border-[#F1F5F9] pb-6 uppercase">Abstracting & Indexing</h2>
             <p className="text-base text-[#555555] leading-loose font-medium text-justify">{journal.indexing}</p>
             <div className="flex flex-wrap items-center gap-12 pt-8">
                <img src="/google-scholar.jpg" alt="Google Scholar" className="h-16 opacity-80 hover:opacity-100 transition-all" />
                <img src="/crossref.png" alt="Crossref" className="h-10 opacity-80 hover:opacity-100 transition-all" />
             </div>
          </div>
        );
      case 'apc':
        return (
          <div className="space-y-12">
             <h2 className="text-3xl font-sans font-bold text-[#1A1A1A] border-b border-[#F1F5F9] pb-6 uppercase">Article Publishing Charges</h2>
             <div className="p-12 bg-[#F0FBFC] border border-[#4BA6B9]/20 rounded-3xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#4BA6B9]/5 rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-700" />
                <h3 className="text-4xl font-bold text-[#1A1A1A] tracking-tighter mb-4">{journal.apc}</h3>
                <p className="text-base text-[#555555] font-medium leading-relaxed max-w-xl">There are no publication fees or article processing charges (APCs) for the 2024-2025 period. EISR Scientific Research supports open knowledge dissemination without financial barriers for authors.</p>
             </div>
          </div>
        );
      case 'partnerships':
        return (
          <div className="space-y-12">
             <h2 className="text-3xl font-sans font-bold text-[#1A1A1A] border-b border-[#F1F5F9] pb-6 uppercase">Journal Partnerships</h2>
             <p className="text-base text-[#555555] leading-loose font-medium text-justify">EISR Scientific Research collaborates with leading academic institutions, research groups, and scientific societies globally. Our partnerships foster the exchange of scientific ideas and strengthen the international multidisciplinary research community.</p>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                {['Global Research Council', 'World Scientific Informatics Society', 'International Cybersecurity Forum', 'IEEE Multidisciplinary Council'].map(p => (
                   <div key={p} className="p-10 border border-[#E2E8F0] rounded-2xl bg-[#FAFBFC] hover:shadow-xl hover:border-[#4BA6B9] transition-all group">
                      <div className="w-12 h-12 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center mb-6 text-[#999999] group-hover:bg-[#4BA6B9] group-hover:text-white transition-all shadow-sm">
                         <Globe size={24} />
                      </div>
                      <h4 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-tighter">{p}</h4>
                      <p className="text-[10px] font-bold text-[#4BA6B9] uppercase mt-2 tracking-widest">Active Partner</p>
                   </div>
                ))}
             </div>
          </div>
        );
      default:
        // Assume policy if sub-route structure allows it, or just generic 404
        return (
           <div className="space-y-12 text-center py-20">
              <Info size={48} className="text-[#CBD5E1] mx-auto mb-6" />
              <h2 className="text-2xl font-sans font-bold uppercase tracking-tight">Section Not Found</h2>
              <p className="text-sm text-[#999999] uppercase font-bold tracking-widest">Requested informational repository is currently being updated.</p>
           </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white selection:bg-[#4BA6B9]/10">
      <Header />
      
      <JournalHero journal={journal} activeTab={section} />

      {/* Breadcrumb Band */}
      <div className="w-full bg-[#FAFBFC] py-4 px-6 border-b border-[#F1F5F9] text-[10px] font-bold uppercase tracking-widest text-[#999999]">
         <div className="max-w-[1240px] mx-auto space-x-3 flex items-center">
            <Link href="/" className="hover:text-[#4BA6B9]">Main</Link>
            <ChevronRight size={10} />
            <Link href={`/journals/${journal.slug}`} className="hover:text-[#4BA6B9]">{journal.title}</Link>
            <ChevronRight size={10} />
            <span className="text-[#1A1A1A] truncate max-w-[200px] uppercase">{sectionKey}</span>
         </div>
      </div>

      <main className="flex-grow pb-40 px-6">
        <div className="max-w-[1240px] mx-auto mt-20 grid lg:grid-cols-12 gap-20 items-start">
           
           {/* Sidebar Info Card */}
           <div className="lg:col-span-3 space-y-10">
              <div className="bg-white border border-[#E2E8F0] shadow-sm rounded-2xl overflow-hidden group">
                <div className="w-full aspect-[3/4] bg-[#0B1F3A] flex flex-col items-center justify-center relative overflow-hidden">
                   <img src={journal.cover} alt={journal.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                   <div className="absolute bottom-0 inset-x-0 bg-black/40 backdrop-blur py-4 text-[9px] font-bold tracking-[0.3em] uppercase text-white/60 text-center z-10">Repository Visual</div>
                </div>
                
                <div className="p-8 space-y-8">

                  <Link href="/submission" className="w-full bg-[#1A1A1A] text-white py-4 text-[10px] font-bold uppercase tracking-[0.3em] flex items-center justify-center space-x-3 hover:bg-[#4BA6B9] transition-all rounded-xl">
                    <span>Submit Manuscript</span>
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </div>

               <div className="p-8 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-[#4BA6B9]/10 flex items-center justify-center text-[#4BA6B9]">
                     <ShieldCheck size={20} />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-[#555555]">Peer Reviewed</p>
                    <p className="text-[10px] font-bold text-[#1A1A1A] ">Verified Academic Quality</p>
                  </div>
               </div>
           </div>

           {/* Main Content Area */}
           <div className="lg:col-span-9 bg-white min-h-[600px]">
              {renderSectionContent()}
           </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
