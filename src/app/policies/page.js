import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PolicyAccordion from '@/components/PolicyAccordion';
import { ShieldCheck, Info } from 'lucide-react';

export const metadata = {
  title: "Publication Ethics & Journal Policies | EISR Academic Publishing",
  description: "Guidelines and ethical standards for all scientific publications across the EISR multidisciplinary ecosystem.",
};

const policyItems = [
  {
    title: "5.1 Publication Ethics Policy",
    content: `Journal of Eye-Innovation in Machine Learning (JEIML) is committed to upholding the highest standards of publication ethics and academic integrity. The journal follows internationally accepted ethical guidelines to ensure transparency, fairness, and quality in scholarly publishing.

1. Duties of Authors:
• The submitted work is original, unpublished, and not under consideration elsewhere.
• All sources are properly cited, and plagiarism in any form is strictly prohibited.
• Data presented in the manuscript is accurate, honest, and not fabricated or manipulated.
• All listed authors have made significant contributions to the research.
• Any conflicts of interest are clearly disclosed.

2. Duties of Editors:
• Making fair, unbiased, and timely publication decisions based solely on academic merit.
• Maintaining the confidentiality of submitted manuscripts.
• Ensuring a rigorous and transparent peer-review process.
• Taking appropriate actions in cases of suspected misconduct.`
  },
  {
    title: "5.2 Open Access Policy",
    content: "JEIML is a fully open-access journal, providing immediate, free, and permanent access to all published content. Readers may read, download, copy, distribute, print, search, and link to full texts without restriction, ensuring global knowledge dissemination and increased research visibility."
  },
  {
    title: "5.3 Peer Review Policy",
    content: "JEIML adopts a double-blind peer review process. Each submission is reviewed by at least two independent expert reviewers. Editors make publication decisions based on originality, quality, clarity, relevance, and technical soundness. Reviewers remain anonymous, and manuscripts are treated confidentially."
  },
  {
    title: "5.4 Archiving Policy",
    content: "JEIML ensures long-term digital preservation of all published content using secure electronic archiving systems. Published articles are permanently stored on journal servers and third-party repositories to ensure content availability, accessibility, and integrity."
  },
  {
    title: "5.5 Generative AI Policy",
    content: "Authors may use generative AI tools strictly for language editing, grammar checking, and formatting improvements. Authors must fully disclose the use of AI tools in manuscript preparation. AI tools must not be listed as authors, and responsibility for the accuracy, originality, and ethics of the content remains solely with human authors."
  },
  {
    title: "5.6 Copyright and Licenses Policy",
    content: "All articles published in JEIML are licensed under the Creative Commons Attribution (CC BY 4.0) license. Authors retain full copyright of their work, allowing readers to copy, distribute, and adapt the content with proper attribution."
  },
  {
    title: "5.7 Plagiarism Check Policy",
    content: "All manuscripts submitted to JEIML are screened using professional plagiarism detection software. Manuscripts exceeding 15–20% similarity index (excluding references) will be rejected or returned for revision. Zero tolerance is applied to intentional plagiarism."
  },
  {
    title: "5.8 Misconduct Policy",
    content: "Scientific misconduct includes: Plagiarism, Fabrication or falsification of data, Duplicate submission, Authorship manipulation, Citation manipulation. Confirmed misconduct results in rejection, retraction, notification of institutions, and banning from future submissions."
  },
  {
    title: "5.9 Retractions Policy",
    content: "JEIML publishes retractions when major errors, ethical breaches, or scientific misconduct are confirmed. Retracted articles remain online but are clearly marked as Retracted, preserving the scholarly record."
  },
  {
    title: "5.10 Publication Misbehavior Policy",
    content: "Unethical actions such as submission manipulation, peer-review interference, citation gaming, and identity falsification are treated as serious violations and lead to strict disciplinary action."
  },
  {
    title: "5.11 Corrections & Withdrawals Policy",
    content: "JEIML allows: Corrections (Errata) for minor errors not affecting conclusions. Withdrawals for early-stage submissions before peer review. Post-publication withdrawals are permitted only in exceptional circumstances."
  }
];

export default function PoliciesPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FAFBFC] selection:bg-[#4BA6B9]/10">
      <Header />
      
      <main className="flex-grow pb-40 px-6">
        <section className="bg-white pt-48 pb-20 border-b border-[#F1F5F9] relative overflow-hidden">
           <div className="max-w-[1240px] mx-auto relative z-10">
              <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                 <div className="space-y-6 max-w-2xl text-center md:text-left">
                    <div className="inline-flex items-center space-x-3 text-[10px] font-black uppercase tracking-[0.4em] text-[#4BA6B9]">
                       <span className="w-12 h-px bg-[#4BA6B9]" />
                       <span>Institutional Governance Hub</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-black  text-[#1A1A1A] tracking-tight scale-y-105">Publication Ethics &<br />Institutional Standards</h1>
                    <p className="text-sm text-[#555555] leading-relaxed font-sans  max-w-xl">Upholding the highest standards of integrity, transparency, and scientific quality across our entire multidisciplinary ecosystem.</p>
                 </div>
                 <div className="bg-[#0B1F3A] p-10 rounded-xl text-white space-y-6 w-full md:w-80 shadow-2xl relative group overflow-hidden border border-white/5">
                    <ShieldCheck className="w-12 h-12 text-[#4BA6B9] group-hover:scale-110 transition-transform duration-700" />
                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4BA6B9]">COPE Ethics Hub</h4>
                    <p className="text-xs font-bold  leading-relaxed opacity-60 uppercase tracking-widest leading-loose">Verified Academic Standards</p>
                    <div className="absolute -bottom-6 -right-6 text-white/5 font-serif font-black text-9xl pointer-events-none select-none">EISR</div>
                 </div>
              </div>
           </div>
        </section>

        <section className="mt-20">
           <div className="max-w-[1240px] mx-auto">
              <div className="grid lg:grid-cols-12 gap-16">
                 
                 {/* Sidebar Info */}
                 <div className="lg:col-span-4 space-y-10">
                    <div className="bg-white p-10 rounded-2xl shadow-sm space-y-8 border border-[#E2E8F0]">
                       <h3 className="text-xl font-serif font-black  text-[#1A1A1A]">Academic Integrity</h3>
                       <div className="h-1 w-16 bg-[#4BA6B9]" />
                       <p className="text-sm font-medium leading-loose text-[#555555] ">
                          All authors, editors, reviewers, and publishers involved in EISR publications must strictly adhere to the ethical principles outlined in these documents.
                       </p>
                       <button className="w-full bg-[#1A1A1A] text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#4BA6B9] transition-all shadow-lg hover:shadow-[#4BA6B9]/20">
                          Contact Ethics Directorate
                       </button>
                    </div>

                    <div className="p-10 bg-[#FAFBFC] rounded-2xl border border-[#E2E8F0] space-y-6">
                       <div className="flex items-center space-x-3 text-[#4BA6B9]">
                          <Info size={16} />
                          <span className="text-[10px] font-black uppercase tracking-[0.2em]">Note for Authors</span>
                       </div>
                       <p className="text-xs text-[#555555] leading-relaxed font-bold  opacity-70">Compliance with these policies is a prerequisite for submission consideration across all EISR portfolio journals.</p>
                    </div>
                 </div>

                 {/* Accordion Component */}
                 <div className="lg:col-span-8">
                    <div className="space-y-4 mb-12">
                       <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#BBBBBB]">Institutional Policy Repository</h3>
                       <div className="h-px w-full bg-[#E2E8F0]" />
                    </div>
                    <PolicyAccordion items={policyItems} />
                 </div>
                 
              </div>
           </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
