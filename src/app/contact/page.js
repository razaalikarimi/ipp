import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, Globe, Search } from 'lucide-react';
import { journals } from '@/lib/data';

export const metadata = {
  title: "Contact Directory | Eye-Innovations Scientific Research",
  description: "Reach the publisher team or contact a specific journal directly.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white selection:bg-[#4BA6B9]/10">
      <Header />
      
      <main className="flex-grow pb-40 px-6 mt-12">
        <section className="bg-white pb-20 text-center space-y-4">
           <div className="max-w-[1240px] mx-auto space-y-4">
              <span className="text-[11px] font-bold text-[#4BA6B9]">Contact • Eye-Innovations Scientific Research</span>
              <h1 className="text-4xl md:text-5xl font-sans font-bold text-[#1A1A1A] tracking-tight">Contact Directory</h1>
              <p className="text-[13px] font-bold text-[#333333] max-w-xl mx-auto mt-6 leading-relaxed">Reach the publisher team or contact a specific journal directly.</p>
           </div>
        </section>

        {/* Publisher Email Section */}
        <section className="flex justify-center">
           <div className="w-full max-w-[800px] bg-white rounded-3xl p-12 border border-[#E2E8F0] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-10 group transition-all hover:bg-[#FBFCFD]">
              <div className="space-y-4 shrink-0 text-center md:text-left">
                 <h4 className="text-[11px] font-bold text-[#333333]">Primary Publisher Inquiry</h4>
                 <p className="text-3xl font-bold text-[#1A1A1A] tracking-tight">info@eisr.com</p>
              </div>
              <div className="flex items-center space-x-4">
                 <a href="mailto:info@eisr.com" className="px-10 py-4 bg-[#1A1A1A] rounded-2xl text-[12px] font-bold text-white shadow-xl hover:bg-[#4BA6B9] transition-all">Send Email Invitation</a>
              </div>
           </div>
        </section>

        {/* Journals Grid */}
        <section className="mt-32 max-w-[1240px] mx-auto">
           <div className="flex flex-col md:flex-row items-center justify-between gap-10 mb-20 border-b border-[#E2E8F0] pb-10">
              <h2 className="text-2xl font-bold text-[#1A1A1A] tracking-tight">Scientific Journal Contacts</h2>
              
              <div className="relative group w-full md:w-96">
                 <input type="text" placeholder="Search journal or email..." className="w-full bg-[#F8F9FB] border border-[#E2E8F0] rounded-2xl p-5 pl-8 text-sm font-bold placeholder:text-[#BBBBBB]/40 outline-none transition-all focus:ring-2 focus:ring-[#4BA6B9]" />
                 <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-[#BBBBBB]/40 group-hover:text-[#4BA6B9] transition-colors" size={18} />
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {journals.map((j) => (
                 <div key={j.id} className="bg-white rounded-3xl p-12 border border-[#E2E8F0] shadow-sm hover:shadow-2xl transition-all duration-500 space-y-10 group overflow-hidden relative">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                       <div className="space-y-4">
                          <h4 className="text-xl font-bold text-[#1A1A1A] group-hover:text-[#4BA6B9] transition-colors leading-tight">{j.title}</h4>
                          <p className="text-[13px] text-[#4BA6B9] font-bold">editor.{j.slug}@eisr.com</p>
                       </div>
                    </div>
                    <div className="flex items-center justify-between pt-8 border-t border-[#F1F5F9]">
                       <span className="text-[11px] font-bold text-[#BBBBBB]">Journal contact inbox</span>
                       <a href={`mailto:editor.${j.slug}@eisr.com`} className="text-[12px] font-bold text-[#1A1A1A] hover:text-[#4BA6B9] transition-all flex items-center group/btn">
                          Compose email <Globe size={14} className="ml-3 transition-transform group-hover/btn:rotate-12" />
                       </a>
                    </div>
                 </div>
              ))}
           </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
