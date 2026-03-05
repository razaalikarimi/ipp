
'use client';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { journals } from '@/lib/data';
import { ShieldCheck, BookOpen, Clock, Activity, Fingerprint, Info, Users, Globe, ChevronRight } from 'lucide-react';

export default function PolicyDetailPage() {
  const { slug } = useParams();
  const journal = journals[0]; // Using primary journal for policies or generalized policies
  const policyTitle = slug.replace(/-/g, ' ');

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white selection:bg-[#4BA6B9]/10">
      <Header />
      
      {/* Policy Page Hero */}
      <section className="bg-[#0B1F3A] text-white pt-48 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#4BA6B9]/10 rounded-full blur-[100px] -mr-48 -mt-48" />
        <div className="max-w-[1240px] mx-auto relative z-10 space-y-8">
           <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#4BA6B9]">Journal Global Policy Repository</span>
              <h1 className="text-4xl md:text-5xl font-sans font-bold  leading-tight  uppercase">{policyTitle}</h1>
           </div>
        </div>
      </section>

      {/* Breadcrumb Band */}
      <div className="w-full bg-[#FAFBFC] py-4 px-6 border-b border-[#F1F5F9] text-[10px] font-bold uppercase tracking-widest text-[#999999]">
         <div className="max-w-[1240px] mx-auto space-x-3 flex items-center">
            <Link href="/" className="hover:text-[#4BA6B9]">Main</Link>
            <ChevronRight size={10} />
            <Link href="/journals" className="hover:text-[#4BA6B9]">Journals</Link>
            <ChevronRight size={10} />
            <span className="text-[#1A1A1A]">Policies</span>
            <ChevronRight size={10} />
            <span className="text-[#1A1A1A] uppercase">{policyTitle}</span>
         </div>
      </div>

      <main className="flex-grow pb-40 px-6">
        <div className="max-w-[1240px] mx-auto mt-20 grid lg:grid-cols-12 gap-20">
           
           <div className="lg:col-span-8 space-y-16">
              <div className="space-y-8">
                 <h2 className="text-2xl font-sans font-bold text-[#1A1A1A] border-b border-[#F1F5F9] pb-6">Policy Overview</h2>
                 <p className="text-base text-[#555555] leading-loose font-medium text-justify">
                    Eye-Innovations Scientific Research (EISR) maintains rigorous publishing policies to ensure the integrity, transparency, and reproducibility of scholarly research. The {policyTitle} is central to our commitment to academic excellence.
                 </p>
              </div>

              <div className="space-y-10">
                 {/* Placeholder for specific policy details based on slug */}
                 <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-10 rounded-2xl shadow-sm space-y-8">
                    <h3 className="text-xl font-sans font-bold  border-b border-[#F1F5F9] pb-4 uppercase">{policyTitle} Content</h3>
                    <div className="text-sm font-medium text-[#555555] leading-loose whitespace-pre-line">
                       {journal.policies[slug.replace(/-/g, '')] || `The full ${policyTitle} content is defined to align with global COPE and metadata standards. This policy governs all journals under the EISR Scientific Research umbrella.`}
                    </div>
                 </div>
              </div>
           </div>

           <div className="lg:col-span-4 space-y-10">
              <div className="bg-[#1A1A1A] p-8 rounded-2xl text-white space-y-8">
                 <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#4BA6B9]">Other Policies</h3>
                 <div className="space-y-4">
                    {['Publication Ethics', 'Open Access Policy', 'Peer Review Policy', 'Archiving Policy'].map(p => (
                       <Link key={p} href={`/policies/${p.toLowerCase().replace(/ /g, '-')}`} className="block text-[11px] font-bold uppercase tracking-widest text-white/60 hover:text-[#4BA6B9] transition-all pb-3 border-b border-white/5 last:border-0">{p}</Link>
                    ))}
                 </div>
              </div>

              <div className="p-8 bg-white border border-[#E2E8F0] rounded-2xl shadow-sm text-center">
                 <ShieldCheck size={40} className="text-[#4BA6B9] mx-auto mb-4" />
                 <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]">Verified Policy</h4>
                 <p className="text-[11px] text-[#999999] font-bold mt-2 uppercase">Compliant with International Standards</p>
              </div>
           </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
