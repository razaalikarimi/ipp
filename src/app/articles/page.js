import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { articles, journals } from '@/lib/data';

export const metadata = {
  title: "Published Articles | Eye-Innovations Scientific Research",
  description: "Browse the repository of peer-reviewed scientific articles published by EISR.",
};

export default function ArticlesPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white selection:bg-[#4BA6B9]/10">
      <Header />
      
      <main className="flex-grow pb-20 px-6 mt-8">
        <section className="bg-white pb-10 text-center">
           <div className="max-w-[1240px] mx-auto space-y-3">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4BA6B9] mb-1">Scientific Repositories</span>
              <h1 className="text-3xl md:text-4xl font-sans font-black text-[#1A1A1A] tracking-tighter">Published Articles</h1>
              <p className="text-[13px] font-bold text-[#6B7280] max-w-xl mx-auto opacity-70 leading-relaxed">Repository of peer-reviewed international scientific research publications.</p>
           </div>
        </section>

        <section className="mt-10">
           <div className="max-w-[1240px] mx-auto lg:px-6">
              <div className="space-y-8">
                   {articles.map((art) => {
                     const journal = journals.find(j => j.id.toLowerCase() === art.journal.toLowerCase());
                     return (
                        <Link key={art.slug} href={`/articles/${art.slug}`} className="bg-white rounded-2xl p-6 md:p-8 border border-[#E2E8F0] shadow-sm hover:shadow-xl transition-all duration-500 group block relative overflow-hidden">
                           <div className="absolute top-0 right-0 w-3 h-full bg-[#4BA6B9] opacity-0 group-hover:opacity-100 transition-opacity" />
                           <div className="space-y-6">
                             <div className="space-y-3">
                               <div className="flex items-center gap-6">
                                 <div className="px-2 py-0.5 bg-[#F1F5F9] rounded text-[9px] font-black text-[#4BA6B9] uppercase tracking-wider">{art.type || 'Research Article'}</div>
                                 <div className="h-px bg-gray-100 flex-grow" />
                                 <div className="text-[10px] font-bold text-[#999999]">{art.published}</div>
                               </div>
                               <h3 className="text-xl font-sans font-black text-[#1A1A1A] group-hover:text-[#4BA6B9] leading-tight tracking-tight">{art.title}</h3>
                             </div>

                             <div className="grid md:grid-cols-2 gap-8 pt-2">
                               <div className="space-y-2">
                                  <h4 className="text-[10px] font-black text-[#BBBBBB] uppercase tracking-widest">Contributing Authors</h4>
                                  <div className="text-[12px] font-bold text-[#555555]">
                                     {Array.isArray(art.authors) ? art.authors.join(' | ') : art.authors}
                                  </div>
                               </div>
                               <div className="space-y-2">
                                  <h4 className="text-[10px] font-black text-[#BBBBBB] uppercase tracking-widest">Source Repository</h4>
                                  <div className="text-[12px] font-bold text-[#4BA6B9]">
                                     {journal ? journal.title : art.journal}
                                  </div>
                               </div>
                             </div>
                           </div>
                        </Link>
                     );
                   })}
              </div>
           </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
