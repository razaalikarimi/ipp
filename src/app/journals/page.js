import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: "Journals Portfolio | Eye-Innovations Scientific Research",
  description: "Explore our multidisciplinary portfolio of peer-reviewed scientific journals.",
};

const journals = [
  {
    id: 'jeiml',
    title: 'Journal of Eye-Innovation in Machine Learning (JEIML)',
    issn: '3079-5354 (Online)',
    chief: 'Dr. Mohammed Amin Almaayah',
    index: 'Indexed by Scopus',
    path: '/journals/jeiml',
    cover: '/jeiml_cover.jpg'
  },
  {
    id: 'informatics',
    title: 'EISR Jordanian Journal of Informatics and Computing',
    issn: '3080-6828 (Online)',
    chief: 'Dr. Shahed Almobydleen',
    index: null,
    path: '/journals/informatics',
    cover: null
  },
  {
    id: 'security',
    title: 'EISR Journal of Security Risk Management',
    issn: '3080-9444 (Online)',
    chief: 'Dr. Mohammed Amin',
    index: null,
    path: '/journals/security',
    cover: '/jeisa_cover.jpg'
  },
  {
    id: 'accounting',
    title: 'EISR International Journal of Accounting and Business Intelligence',
    issn: '3105-3726 (Online)',
    chief: 'Prof. Zalailah Salleh',
    index: null,
    path: '/journals/accounting',
    cover: null
  }
];

export default function JournalsPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      <Header />
      
      <main className="flex-grow pb-40">
        <section className="bg-white py-24 text-center border-b border-[#F1F1F1]">
           <div className="max-w-[1240px] mx-auto px-6 space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#4BA6B9]">Scientific Repositories</span>
              <h1 className="text-5xl font-serif font-black italic text-[#1A1A1A] tracking-tight scale-y-105">Journals Portfolio</h1>
           </div>
        </section>

        <section className="px-6 mt-20">
           <div className="max-w-[1240px] mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 {journals.map((j, i) => (
                    <Link href={j.path} key={i}>
                       <div className="bg-white rounded-3xl shadow-sm border border-[#E2E8F0] overflow-hidden flex h-[350px] group hover:shadow-2xl hover:border-[#4BA6B9] transition-all duration-500 cursor-pointer">
                          <div className="w-56 bg-[#0B1F3A] flex flex-col justify-center items-center relative overflow-hidden shrink-0 border-r border-[#E2E8F0]">
                             {j.cover ? (
                               <img src={j.cover} alt={j.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                             ) : (
                               <>
                                 <div className="absolute inset-0 opacity-20 pointer-events-none">
                                    <div className="h-full w-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400 to-transparent scale-150" />
                                 </div>
                                 <div className="z-10 text-white text-center italic font-black text-lg uppercase p-6 border border-white/20 scale-y-105">
                                    EISR <br />Portfolio <br />{j.id.substring(0,4)}
                                 </div>
                               </>
                             )}
                             <div className="absolute bottom-4 left-0 right-0 text-center z-10">
                                <span className="text-[9px] font-black uppercase tracking-widest text-white/40 bg-black/40 backdrop-blur px-3 py-1 rounded-full">Academic Press</span>
                             </div>
                          </div>
                          <div className="flex-grow p-12 flex flex-col justify-between">
                             <div className="space-y-6">
                                <h3 className="text-2xl font-serif font-black text-[#1A1A1A] group-hover:text-[#4BA6B9] leading-tight italic uppercase tracking-tight scale-y-105">{j.title}</h3>
                                <p className="text-[11px] font-black text-[#888888] uppercase tracking-[0.2em]">ISSN: {j.issn}</p>
                             </div>
                             <div className="space-y-6">
                                <div className="space-y-2">
                                   <p className="text-[13px] font-bold text-[#555555] italic group-hover:translate-x-1 transition-transform border-l-2 border-[#F1F1F1] pl-4">{j.chief}</p>
                                </div>
                                {j.index && (
                                   <div className="flex items-center space-x-3 text-[#4BA6B9] font-black text-[10px] uppercase tracking-widest">
                                      <span>{j.index}</span>
                                      <div className="px-3 py-1 bg-[#F4F6F9] grayscale group-hover:grayscale-0 transition-all rounded text-[8px] flex items-center justify-center font-black text-[#1A1A1A]">SCOPUS</div>
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
