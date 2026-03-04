import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: "Article Publishing Charges (APCs) | Eye-Innovations Scientific Research",
  description: "Transparent publication fee structures for all EISR scientific journals.",
};

const apcs = [
  { name: 'Journal of Eye-Innovation in Machine Learning (JEIML)', fee: 'No PC (No Publishing Charges)' },
  { name: 'EISR Journal of Security Risk Management', fee: 'No APC Until March 2026' },
  { name: 'EISR Jordanian Journal of Informatics and Computing', fee: 'No APC Until March 2026' },
  { name: 'EISR International Journal of Accounting and Business Intelligence', fee: 'No APC Until March 2026' }
];

export default function APCPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white selection:bg-[#4BA6B9]/10">
      <Header />
      
      <main className="flex-grow pb-40 px-6">
        <section className="bg-white pt-48 pb-20 text-center space-y-4">
           <div className="max-w-[1240px] mx-auto space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#4BA6B9]">Author Resources</span>
              <h1 className="text-4xl md:text-5xl font-serif font-black italic text-[#1A1A1A] tracking-tight scale-y-105">Article Publishing Charges</h1>
              <p className="text-sm font-bold text-[#6B7280] italic max-w-xl mx-auto opacity-70 mt-6 leading-relaxed">EISR is committed to fully open-access publishing models with transparent fee structures.</p>
           </div>
        </section>

        {/* Professional APC Table Section */}
        <section className="mt-20">
           <div className="max-w-[1000px] mx-auto bg-white rounded-3xl border border-[#E2E8F0] overflow-hidden shadow-sm">
              <table className="w-full text-left font-sans">
                 <thead>
                    <tr className="bg-[#FAFBFC] border-b border-[#E2E8F0]">
                       <th className="p-8 lg:p-12 text-[10px] font-black uppercase tracking-[0.2em] text-[#555555]">Scientific Journal Name</th>
                       <th className="p-8 lg:p-12 text-[10px] font-black uppercase tracking-[0.2em] text-[#555555] text-right">Fee Status (APC)</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-[#F1F5F9]">
                    {apcs.map((item, idx) => (
                       <tr key={idx} className="group hover:bg-[#F8FAFC] transition-colors">
                          <td className="p-8 lg:p-12">
                             <div className="text-sm font-black text-[#1A1A1A] italic group-hover:text-[#4BA6B9] transition-all uppercase tracking-tight scale-y-105">{item.name}</div>
                          </td>
                          <td className="p-8 lg:p-12 text-right">
                             <div className={`text-xs font-black px-4 py-2 rounded-lg inline-block ${item.fee.includes('No') ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>
                                {item.fee}
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>

           <div className="max-w-[1000px] mx-auto mt-20 p-12 bg-[#F8FAFC] rounded-3xl border border-[#E2E8F0] space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#555555]">Waiver Policy</h4>
              <p className="text-sm font-medium text-[#555555] leading-loose italic">
                 EISR recognizes that researchers from some institutions may face financial challenges. We provide a comprehensive waiver program for authors from low-income economies and those with documented financial constraints. Please contact our editorial office after manuscript acceptance to apply for institutional support.
              </p>
           </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
