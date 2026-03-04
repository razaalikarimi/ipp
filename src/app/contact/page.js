import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, Globe, Clock, MapPin, Send, Search } from 'lucide-react';

export const metadata = {
  title: "Contact Directory | Eye-Innovations Scientific Research",
  description: "Reach the publisher team or contact a specific journal directly.",
};

const journalContacts = [
  { name: 'Journal of Eye-Innovation in Machine...', email: 'editor.jeiml@eisr.org' },
  { name: 'EISR International Journal of Acc...', email: 'editor.ijabi@eisr.org' },
  { name: 'EISR Journal of Security Risk Ma...', email: 'editor.jsrm@eisr.org' },
  { name: 'EISR Jordanian Journal of Inf...', email: 'editor.jjic@eisr.org' }
];

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white italic lowercase">
      <Header />
      
      <main className="flex-grow pb-40">
        <section className="bg-white py-24 text-center space-y-4">
           <div className="max-w-[1240px] mx-auto px-6">
              <div className="text-[10px] font-black uppercase tracking-[0.25em] text-[#555555]">Contact • Eye-Innovations Scientific Research</div>
              <h1 className="text-5xl font-bold text-[#1A1A1A] tracking-tight uppercase underline-offset-[16px]">Contact Directory</h1>
              <p className="text-sm font-bold text-[#6B7280] italic max-w-xl mx-auto opacity-70 mt-6 leading-relaxed">Reach the publisher team or contact a specific journal directly.</p>
           </div>
        </section>

        {/* Publisher Email Section */}
        <section className="px-6 flex justify-center">
           <div className="w-full max-w-[800px] bg-white rounded-3xl p-12 border border-[#F1F1F1] shadow-2xl flex flex-col md:row items-center justify-between gap-10 group transition-all hover:bg-[#FBFCFD]">
              <div className="space-y-3 shrink-0">
                 <h4 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#555555]">Publisher Email</h4>
                 <p className="text-2xl font-bold text-[#1A1A1A] tracking-tight">{`contact@eisr.org`}</p>
              </div>
              <div className="flex items-center space-x-4">
                 <button className="px-8 py-3.5 border border-[#F1F1F1] rounded-full text-xs font-bold text-[#555555] hover:bg-[#F1F1F1] transition-all">Copy</button>
                 <button className="px-8 py-3.5 bg-[#1A1A1A] rounded-full text-xs font-bold text-white shadow-xl hover:bg-[#4BA6B9] transition-all">Email us</button>
              </div>
           </div>
        </section>

        {/* Journals Grid */}
        <section className="mt-32 max-w-[1240px] mx-auto px-6">
           <div className="flex flex-col md:row items-center justify-between gap-10 mb-20 border-b border-[#F1F1F1] pb-10">
              <h2 className="text-xl font-bold text-[#1A1A1A] italic uppercase tracking-tighter decoration-4 decoration-[#4BA6B9] underline underline-offset-8">Journal contacts</h2>
              
              {/* Search placeholder */}
              <div className="relative group w-full md:w-96">
                 <input type="text" placeholder="Search journal or email..." className="w-full bg-[#F4F6F9] border-none rounded-2xl p-4 pl-6 text-sm italic font-bold placeholder:text-[#BBBBBB]/40 outline-none transition-all focus:ring-2 focus:ring-[#4BA6B9]" />
                 <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-[#BBBBBB]/40 group-hover:text-[#4BA6B9] transition-colors" size={18} />
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {journalContacts.map((jc, idx) => (
                 <div key={idx} className="bg-white rounded-2xl p-10 border border-[#F1F1F1] shadow-sm hover:shadow-2xl transition-all duration-500 space-y-10 group overflow-hidden relative">
                    <div className="flex items-center justify-between">
                       <div className="space-y-3">
                          <h4 className="text-[13px] font-bold text-[#1A1A1A] italic uppercase tracking-tight group-hover:text-[#4BA6B9] transition-colors">{jc.name}</h4>
                          <p className="text-[12px] text-[#BBBBBB] italic font-medium">{jc.email}</p>
                       </div>
                       <button className="p-3 border border-[#F1F1F1] rounded hover:bg-[#F1F1F1] transition-all shadow-sm">
                          <span className="text-[10px] uppercase font-black text-[#555555]">Copy</span>
                       </button>
                    </div>
                    <div className="flex items-center justify-between pt-6 border-t border-[#F1F1F1]">
                       <span className="text-[10px] font-black uppercase text-[#BBBBBB] tracking-widest leading-loose">Journal contact inbox</span>
                       <button className="text-[11px] font-black uppercase text-[#1A1A1A] hover:text-[#4BA6B9] transition-all flex items-center group/btn">
                          Compose email <Globe size={14} className="ml-3 transition-transform group-hover/btn:rotate-12" />
                       </button>
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
