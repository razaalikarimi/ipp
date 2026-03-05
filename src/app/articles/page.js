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
      
      <main className="flex-grow pb-40 px-6 mt-12">
        <section className="bg-white pb-20 text-center space-y-4">
           <div className="max-w-[1240px] mx-auto space-y-4">
              <span className="text-[11px] font-bold text-[#4BA6B9]">Scientific Repositories</span>
              <h1 className="text-4xl md:text-5xl font-sans font-bold text-[#1A1A1A] tracking-tight">Published Articles</h1>
              <p className="text-[13px] font-bold text-[#6B7280] max-w-xl mx-auto opacity-70 mt-6 leading-relaxed">Repository of peer-reviewed international scientific research publications.</p>
           </div>
        </section>

        <section className="mt-20">
           <div className="max-w-[1240px] mx-auto lg:px-6">
              <div className="space-y-12">
                   {articles.map((art) => {
                     const journal = journals.find(j => j.id.toLowerCase() === art.journal.toLowerCase());
                     return (
                        <Link key={art.slug} href={`/articles/${art.slug}`} className="bg-white rounded-3xl p-10 lg:p-14 border border-[#E2E8F0] shadow-sm hover:shadow-2xl transition-all duration-500 group block relative overflow-hidden">
                           <div className="absolute top-0 right-0 w-4 h-full bg-[#4BA6B9] opacity-0 group-hover:opacity-100 transition-opacity" />
                           <div className="space-y-8">
                             <div className="space-y-4">
                               <div className="flex items-center gap-6">
                                 <div className="px-3 py-1 bg-[#F1F5F9] rounded text-[10px] font-bold text-[#4BA6B9]">{art.type || 'Research Article'}</div>
                                 <div className="h-px bg-gray-100 flex-grow" />
                                 <div className="text-[10px] font-bold text-[#999999]">{art.published}</div>
                               </div>
                               <h3 className="text-2xl font-sans font-bold text-[#1A1A1A] group-hover:text-[#4BA6B9] leading-tight tracking-tight">{art.title}</h3>
                             </div>

                             <div className="grid md:grid-cols-2 gap-10 pt-4">
                               <div className="space-y-4">
                                  <h4 className="text-[11px] font-bold text-[#BBBBBB]">Contributing Authors</h4>
                                  <div className="text-[13px] font-bold text-[#555555] flex flex-wrap gap-2">
                                     {Array.isArray(art.authors) ? art.authors.join(' | ') : art.authors}
                                  </div>
                               </div>
                               <div className="space-y-4">
                                  <h4 className="text-[11px] font-bold text-[#BBBBBB]">Source Repository</h4>
                                  <div className="text-[13px] font-bold text-[#4BA6B9]">
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
