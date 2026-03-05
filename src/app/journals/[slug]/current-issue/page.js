
'use client';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { journals, articles } from '@/lib/data';
import { Calendar, ChevronRight, FileText, Download, User, Globe, Activity, Eye, FilePieChart, Mail, MapPin } from 'lucide-react';

import JournalHero from '@/components/JournalHero';

export default function CurrentIssuePage() {
  const { slug } = useParams();
  const journal = journals.find(j => j.slug === slug) || journals[0];
  const journalArticles = articles.filter(a => a.journal.toLowerCase() === journal.id.toLowerCase());

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white selection:bg-[#4BA6B9]/10">
      <Header />
      
      <JournalHero journal={journal} activeTab="current" />

      {/* Breadcrumb Band */}
      <div className="w-full bg-[#FAFBFC] py-4 px-6 border-b border-[#F1F5F9] text-[10px] font-bold uppercase tracking-widest text-[#999999]">
         <div className="max-w-[1240px] mx-auto space-x-3 flex items-center">
            <Link href="/" className="hover:text-[#4BA6B9]">Main</Link>
            <ChevronRight size={10} />
            <Link href={`/journals/${journal.slug}`} className="hover:text-[#4BA6B9]">{journal.title}</Link>
            <ChevronRight size={10} />
            <span className="text-[#1A1A1A]">Current Issue</span>
         </div>
      </div>

      <main className="flex-grow pb-40 px-6">
        <div className="max-w-[1240px] mx-auto mt-20 grid lg:grid-cols-12 gap-20 items-start">
           
           <div className="lg:col-span-12 space-y-12">

              <div className="space-y-10">
                 <h3 className="text-2xl font-sans font-bold text-[#1A1A1A] border-b border-[#F1F5F9] pb-6 uppercase">Current Published Status</h3>
                 <div className="flex flex-col items-center justify-center py-40 space-y-8 bg-[#FAFBFC] rounded-3xl border-2 border-dashed border-[#E2E8F0]">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl border border-[#F1F5F9]">
                       <Calendar size={32} className="text-[#BBBBBB]" />
                    </div>
                    <div className="text-center space-y-4">
                       <h3 className="text-2xl font-sans font-bold text-[#1A1A1A] uppercase tracking-tight">No issues published yet</h3>
                       <p className="text-sm font-bold text-[#999999] uppercase tracking-widest max-w-sm mx-auto leading-relaxed">The debut issue of this journal is currently in preparation. All accepted articles will be published shortly.</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
