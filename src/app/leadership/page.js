import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Linkedin } from 'lucide-react';

export const metadata = {
  title: "Leadership Team | Eye-Innovations Scientific Research",
  description: "Meet the academic visionaries and specialized experts behind the EISR global platform.",
};

const leaders = [
  {
    name: "Dr. Mohammed Amin Almaayah",
    title: "Chief Executive Officer",
  },
  {
    name: "Marwan Alrawashdeh",
    title: "Chief Technology Officer",
  }
];

export default function Leadership() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white italic lowercase">
      <Header />
      
      <main className="flex-grow pb-40">
        {/* Header Hero */}
        <section className="bg-white py-24 text-center">
           <div className="max-w-[1240px] mx-auto px-6">
              <h1 className="text-5xl font-bold text-[#1A1A1A] tracking-tight uppercase underline decoration-8 decoration-[#F1F1F1]/50 underline-offset-8">Leadership Team</h1>
           </div>
        </section>

        {/* Content Section */}
        <section className="mt-20">
           <div className="max-w-[1000px] mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 {leaders.map((leader, idx) => (
                    <div key={idx} className="bg-white rounded-3xl p-10 border border-[#F1F1F1] shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden group flex items-center justify-between space-x-8">
                       <div className="flex items-center space-x-8">
                          {/* Image placeholder */}
                          <div className="w-24 h-24 bg-[#F1F1F1] rounded-2xl flex items-center justify-center text-[#BBBBBB] shrink-0 italic text-[10px] uppercase font-bold text-center p-2 leading-tight">
                             Image <br />Placeholder
                          </div>
                          <div className="space-y-1">
                             <h3 className="text-xl font-bold text-[#1A1A1A] group-hover:text-[#4BA6B9] transition-colors uppercase tracking-tight">{leader.name}</h3>
                             <p className="text-xs text-[#555555] font-bold italic opacity-60 uppercase tracking-widest leading-loose">{leader.title}</p>
                          </div>
                       </div>
                       <div className="p-2 border border-[#F1F1F1] rounded-lg hover:bg-[#4BA6B9] hover:text-white transition-all transform group-hover:scale-110">
                          <Linkedin size={18} strokeWidth={1.5} />
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
