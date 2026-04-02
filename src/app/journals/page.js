import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { journals } from '@/lib/data';

export const metadata = {
  title: "Journals Portfolio | Eye-Innovations Scientific Research",
  description: "Explore our multidisciplinary portfolio of peer-reviewed scientific journals.",
};

export default function JournalsPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      <Header />
      
      <main className="flex-grow pb-40">
        <section className="bg-white py-24 text-center border-b border-[#F1F1F1]">
           <div className="max-w-[1240px] mx-auto px-6 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#4BA6B9]">Scientific Repositories</span>
              <h1 className="text-5xl font-sans font-bold text-[#1A1A1A] tracking-tight">Journals Portfolio</h1>
           </div>
        </section>

        <section className="px-6 mt-20">
           <div className="max-w-[1240px] mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 {journals.map((j) => (
                    <Link href={`/journals/${j.slug}`} key={j.id} className="group">
                       <div className="bg-white rounded-3xl shadow-sm border border-[#E2E8F0] overflow-hidden flex flex-col md:flex-row h-auto md:h-[350px] transition-all duration-500 cursor-pointer hover:shadow-2xl">
                          <div className="w-full md:w-[260px] shrink-0 border-b md:border-b-0 md:border-r border-[#E2E8F0] bg-[#F4F6F8] relative flex items-center justify-center p-0">
                             {j.cover ? (
                                <img src={j.cover} alt={j.title} className="w-full h-full object-cover" />
                             ) : (
                               <>
                                 <div className="absolute inset-0 opacity-20 pointer-events-none">
                                    <div className="h-full w-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400 to-transparent scale-150" />
                                 </div>
                                 <div className="z-10 text-white text-center font-bold text-lg uppercase p-6 border border-[#E2E8F0] bg-[#0B1F3A] rounded-xl">
                                    EISR <br />Portfolio <br />{j.id.substring(0,4)}
                                 </div>
                               </>
                             )}

                          </div>
                          <div className="flex-grow p-6 md:p-10 flex flex-col justify-between">
                             <div className="space-y-4">
                                <h3 className="text-2xl font-sans font-bold text-[#1A1A1A] group-hover:text-[#4BA6B9] leading-tight uppercase tracking-tight transition-colors">{j.title}</h3>
                             </div>
                             <div className="space-y-5 mt-6">
                                <div className="space-y-2">
                                   <p className="text-[13px] font-bold text-[#555555] group-hover:translate-x-1 transition-transform border-l-2 border-[#1e78ff] pl-3">Editor-in-Chief: {j.chief}</p>
                                </div>
                                {j.indexing && j.indexing.includes('Scopus') && (
                                   <div className="flex flex-col space-y-3">
                                      <span className="text-[#4BA6B9] font-bold text-[11px] uppercase tracking-widest leading-relaxed block">Indexed by Scopus</span>
                                      <div className="w-fit px-3 py-1.5 bg-[#F4F6F9] grayscale group-hover:grayscale-0 transition-all rounded text-[9px] flex items-center justify-center font-bold text-[#1A1A1A]">SCOPUS</div>
                                   </div>
                                )}
                             </div>
                          </div>
                       </div>
                    </Link>
                 ))}
              </div>
           </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
