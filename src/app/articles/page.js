import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { FileText } from 'lucide-react';

export const metadata = {
  title: "Published Articles | Eye-Innovations Scientific Research",
  description: "Browse the repository of peer-reviewed scientific articles published by EISR.",
};

const articles = [
  {
    title: "Cybersecurity threats, countermeasures and mitigation techniques on the IoT: Future research directions",
    authors: "Almaha Adel Almuqren",
    journal: "Journal of Eye-Innovation in Machine Learning (JEIML)",
    published: "1/22/2025",
    doi: "#"
  },
  {
     title: "Applying risk analysis for determining threats and countermeasures in workstation domain",
     authors: "Rama Soliman Mousa, Rami Shehab",
     journal: "Journal of Eye-Innovation in Machine Learning (JEIML)",
     published: "1/25/2025",
     doi: "#"
  },
  {
     title: "Risk auditing for Digital Twins in cyber physical systems: A systematic review",
     authors: "Shahed Otoom",
     journal: "JEIML",
     published: "1/29/2025",
     doi: "#"
  },
  {
     title: "A Comprehensive Review of Security and Privacy Challenges and Solutions in Autonomous Driving Systems",
     authors: "Mohammed Amin, Youakim Badr, Qais Al-Na'amneh, Mahmoud Aljawarneh, Rahaf Hazaymih, Shahid Munir Shah",
     journal: "EISR Journal of Security Risk Management",
     published: "11/16/2024",
     doi: "#"
  },
  {
     title: "Adaptive and Context-Aware Authentication Framework Using Edge AI and Blockchain in Future Vehicular Networks",
     authors: "Mohammed Almaayah, Rejwan Bin Sulaiman",
     journal: "EISR Journal of Security Risk Management",
     published: "10/6/2024",
     doi: "#"
  }
];

export default function ArticlesPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      <Header />
      
      <main className="flex-grow pb-40">
        <section className="bg-white py-24 border-b border-[#F1F1F1]">
           <div className="max-w-[1240px] mx-auto px-6">
              <h1 className="text-4xl font-bold text-[#1A1A1A]  uppercase tracking-tight">Published Articles</h1>
           </div>
        </section>

        <section className="mt-16">
           <div className="max-w-[1240px] mx-auto px-6">
              <div className="space-y-12">
                 {articles.map((art, idx) => (
                    <div key={idx} className="bg-white rounded-2xl p-10 lg:p-12 border border-[#F1F1F1] shadow-sm hover:shadow-2xl transition-all duration-500 space-y-4 group">
                       <h3 className="text-xl font-bold text-[#4BA6B9] group-hover:underline  uppercase">{art.title}</h3>
                       <div className="space-y-2 text-sm text-[#555555] font-bold ">
                          <p>Authors: {art.authors}</p>
                          <p>Journal: {art.journal}</p>
                          <p>Published: {art.published}</p>
                       </div>
                    </div>
                 ))}
                 
                 {/* Simple Pagination */}
                 <div className="mt-20 pt-10 border-t border-[#F1F1F1] flex justify-center">
                    <div className="flex items-center space-x-2">
                       <button className="px-4 py-2 bg-[#F1F1F1] rounded text-sm font-bold text-[#555555]">Prev</button>
                       <button className="px-4 py-2 bg-[#4BA6B9] rounded text-sm font-bold text-white shadow-xl">1</button>
                       <button className="px-4 py-2 bg-white border border-[#F1F1F1] rounded text-sm font-bold text-[#555555]">2</button>
                       <button className="px-4 py-2 bg-[#F1F1F1] rounded text-sm font-bold text-[#555555]">Next</button>
                    </div>
                 </div>
              </div>
           </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
