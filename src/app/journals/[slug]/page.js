'use client';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Search, Globe, ChevronRight, FileText, Info, Users, ShieldCheck, Mail, BookOpen, Clock, Activity, Fingerprint } from 'lucide-react';
import { useState } from 'react';

const journalData = {
  jeiml: {
    id: 'jeiml',
    title: 'Journal of Eye-Innovation in Machine Learning',
    issn: '3079-5354 (Online)',
    publishingModel: 'Open access',
    frequency: 'Bi-annual',
    reviewType: 'Double Blind Review',
    doiPrefix: '10.58913',
    publisher: 'Eye-Innovations Scientific Research (EISR)',
    reviewSpeed: '60 days',
    aims: 'JEIML aims to promote scientific excellence, foster interdisciplinary collaboration, and support the rapid dissemination of impactful research. All submitted manuscripts undergo a rigorous double-blind peer-review process to ensure originality, technical quality, clarity, and relevance.',
    scope: [
      'Machine Learning Algorithms and Models',
      'Deep Learning and Neural Networks',
      'Computer Vision and Image Processing',
      'Natural Language Processing (NLP)',
      'Explainable Artificial Intelligence (XAI)',
      'Data Mining and Big Data Analytics',
      'Reinforcement Learning',
      'AI in Healthcare and Medical Imaging',
      'Intelligent Systems and Robotics',
      'Smart Cities and IoT Applications'
    ],
    guidelines: `Journal of Eye-Innovation in Machine Learning is an international, peer-reviewed, open-access academic journal dedicated to publishing high-quality research in machine learning, artificial intelligence, deep learning, computer vision, data science, and related emerging technologies. The journal engages both established and emerging researchers from around the world and upholds the highest standards of academic integrity and scholarly excellence.\n\nAuthors are required to prepare their manuscripts using the JEIML Word Template and submit them through the online submission system. Only manuscripts that strictly follow the journal’s formatting and submission guidelines will be considered for peer review.\n\nSubmitted manuscripts must be original, unpublished, and not under consideration by any other journal or conference.\n\nAll submissions undergo a rigorous peer-review process conducted by experts in the relevant fields. Manuscripts are evaluated based on originality, technical quality, clarity of presentation, methodological soundness, and scientific contribution.\n\nIn line with our commitment to timely dissemination of research, the journal aims to complete the peer-review process within four weeks. If authors do not receive any updates within this period, they are encouraged to contact the editorial office via email.\n\nJournal of Eye-Innovation in Machine Learning (JEIML) is an open-access international journal, ensuring free and unrestricted access to published research for the global academic and professional community.`,
    editorialTeam: [
      { name: 'Rajit Nair', affiliation: 'VIT Bhopal University, Bhopal, India' },
      { name: 'Sultan Ahmed', affiliation: 'Prince Sattam Bin Abdulaziz University, Al-Kharj, Saudi Arabia' },
      { name: 'Nadhem Ebrahim', affiliation: 'University of Akron, Akron, United States' },
      { name: 'Dr. Rizwan Ali NAQVI', affiliation: 'Sejong University South Korea' },
      { name: 'Osamah Ibrahim Khalaf', affiliation: 'Al-Nahrain University, Al-Nahrain Nanorenewable Energy Research Center', email: 'Usama81818@nahrainuniv.edu.iq' },
      { name: 'Nesren S. Farhan', affiliation: 'Department of Health Informatics, College of Health Science, Saudi Electronic University, Riyadh, Saudi Arabia' }
    ],
    indexing: 'Journal of Eye-Innovation in Machine Learning (JEIML) is indexed and archived in leading scholarly platforms, ensuring global visibility and long-term accessibility of published research.',
    apc: 'No Article Publishing Charges (No PC)',
    policies: {
      ethics: `Journal of Eye-Innovation in Machine Learning (JEIML) is committed to upholding the highest standards of publication ethics and academic integrity. The journal follows internationally accepted ethical guidelines to ensure transparency, fairness, and quality in scholarly publishing.

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
• Taking appropriate actions in cases of suspected misconduct.

3. Duties of Reviewers:
• Conduct reviews objectively, fairly, and confidentially.
• Provide constructive feedback to improve the quality of manuscripts.
• Report any suspected plagiarism, duplication, or ethical issues.`,
      openAccess: 'JEIML is a fully open-access journal, providing immediate, free, and permanent access to all published content. Readers may read, download, copy, distribute, print, search, and link to full texts without restriction, ensuring global knowledge dissemination and increased research visibility.',
      peerReview: 'JEIML adopts a double-blind peer review process. Each submission is reviewed by at least two independent expert reviewers. Editors make publication decisions based on originality, quality, clarity, relevance, and technical soundness. Reviewers remain anonymous, and manuscripts are treated confidentially.',
      archiving: 'JEIML ensures long-term digital preservation of all published content using secure electronic archiving systems. Published articles are permanently stored on journal servers and third-party repositories to ensure content availability, accessibility, and integrity.',
      ai: 'Authors may use generative AI tools strictly for language editing, grammar checking, and formatting improvements. Authors must fully disclose the use of AI tools in manuscript preparation. AI tools must not be listed as authors, and responsibility for the accuracy, originality, and ethics of the content remains solely with human authors.',
      copyright: 'All articles published in JEIML are licensed under the Creative Commons Attribution (CC BY 4.0) license. Authors retain full copyright of their work, allowing readers to copy, distribute, and adapt the content with proper attribution.',
      plagiarism: 'All manuscripts submitted to JEIML are screened using professional plagiarism detection software. Manuscripts exceeding 15–20% similarity index (excluding references) will be rejected or returned for revision. Zero tolerance is applied to intentional plagiarism.',
      misconduct: 'Scientific misconduct includes: Plagiarism, Fabrication or falsification of data, Duplicate submission, Authorship manipulation, Citation manipulation. Confirmed misconduct results in rejection, retraction, notification of institutions, and banning from future submissions.',
      retractions: 'JEIML publishes retractions when major errors, ethical breaches, or scientific misconduct are confirmed. Retracted articles remain online but are clearly marked as Retracted, preserving the scholarly record.',
      misbehavior: 'Unethical actions such as submission manipulation, peer-review interference, citation gaming, and identity falsification are treated as serious violations and lead to strict disciplinary action.',
      corrections: 'JEIML allows Corrections (Errata) for minor errors not affecting conclusions, and Withdrawals for early-stage submissions before peer review. Post-publication withdrawals are permitted only in exceptional circumstances.'
    },
    about: 'Journal of Eye-Innovation in Machine Learning (JEIML) is an international, peer-reviewed, open-access scholarly journal dedicated to advancing research and innovation in the fields of machine learning, artificial intelligence, deep learning, computer vision, data science, pattern recognition, and intelligent systems. The journal aims to provide a global platform for researchers, academicians, industry professionals, and practitioners to disseminate high-quality original research, review articles, and technical contributions that present novel theoretical insights, practical methodologies, and real-world applications.',
    privacy: 'The names and email addresses entered in this journal site will be used exclusively for the stated purposes of this journal and will not be made available for any other purpose or to any other party.',
    cover: '/jeiml_cover.jpg'
  },
  security: {
    id: 'security',
    title: 'EISR Journal of Security Risk Management',
    issn: '3080-9444 (Online)',
    cover: '/jeisa_cover.jpg',
    about: 'The EISR Journal of Security Risk Management focuses on the strategic, tactical, and operational aspects of identifying, assessing, and mitigating risks in the global security landscape.',
    policies: {},
    editorialTeam: [],
  }
};

export default function JournalPage() {
  const { slug } = useParams();
  const journal = journalData[slug] || journalData['jeiml']; 
  const [activeMainTab, setActiveMainTab] = useState('home');
  const [activeMenuSection, setActiveMenuSection] = useState('aims');

  const renderContent = () => {
    switch (activeMainTab) {
      case 'home':
        return (
          <div className="space-y-12">
            <div className="border-l-4 border-[#4BA6B9] pl-6 py-2">
              <h2 className="text-3xl font-serif font-black text-[#1A1A1A] italic">Home</h2>
              <p className="text-sm font-bold text-[#555555] uppercase mt-2 tracking-widest">{journal.title}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#F8FAFC] p-8 rounded-2xl border border-[#E2E8F0] space-y-6">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4BA6B9]">Journal Statistics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-3">
                    <span className="text-xs font-bold text-[#555555]">Frequency</span>
                    <span className="text-xs font-black text-[#1A1A1A]">{journal.frequency}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-3">
                    <span className="text-xs font-bold text-[#555555]">Review Type</span>
                    <span className="text-xs font-black text-[#1A1A1A]">{journal.reviewType}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-3">
                    <span className="text-xs font-bold text-[#555555]">Review Speed</span>
                    <span className="text-xs font-black text-[#1A1A1A]">{journal.reviewSpeed}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-[#555555]">DOI Prefix</span>
                    <span className="text-xs font-black text-[#1A1A1A]">{journal.doiPrefix}</span>
                  </div>
                </div>
              </div>

               <div className="bg-[#F8FAFC] p-8 rounded-2xl border border-[#E2E8F0] space-y-6">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4BA6B9]">Publication Info</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-3">
                    <span className="text-xs font-bold text-[#555555]">Publisher</span>
                    <span className="text-xs font-black text-[#1A1A1A]">{journal.publisher}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-3">
                    <span className="text-xs font-bold text-[#555555]">Model</span>
                    <span className="text-xs font-black text-[#1A1A1A]">{journal.publishingModel}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-3">
                    <span className="text-xs font-bold text-[#555555]">APC Status</span>
                    <span className="text-xs font-black text-[#1A1A1A]">{journal.apc}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-[#555555]">Indexing</span>
                    <span className="text-xs font-black text-[#4BA6B9]">Verified Agency</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 text-[#555555] leading-relaxed text-[15px] font-medium italic">
              <p>{journal.about}</p>
            </div>
          </div>
        );
      case 'archives':
        return (
          <div className="space-y-12">
            <h2 className="text-3xl font-serif font-black text-[#1A1A1A] italic">Archives</h2>
            <div className="py-20 flex flex-col items-center justify-center border-2 border-dashed border-[#E2E8F0] rounded-3xl bg-[#F8FAFC]">
               <BookOpen size={48} className="text-[#CBD5E1] mb-4" />
               <p className="text-sm font-bold text-[#94A3B8] uppercase tracking-widest">No archived issues found</p>
            </div>
          </div>
        );
      case 'current':
        return (
          <div className="space-y-12">
            <h2 className="text-3xl font-serif font-black text-[#1A1A1A] italic">Current Issues</h2>
            <div className="py-20 flex flex-col items-center justify-center border-2 border-dashed border-[#E2E8F0] rounded-3xl bg-[#F8FAFC]">
               <Activity size={48} className="text-[#CBD5E1] mb-4" />
               <p className="text-sm font-bold text-[#94A3B8] uppercase tracking-widest">No published issues in repository</p>
            </div>
          </div>
        );
      case 'menu':
        return (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-1 space-y-2">
               {[
                 { id: 'aims', name: 'Aims and Scope' },
                 { id: 'guidelines', name: 'Author Guidelines' },
                 { id: 'editorial', name: 'Editorial Team' },
                 { id: 'indexing', name: 'Indexing' },
                 { id: 'apc', name: 'Publishing Charges' }
               ].map(sec => (
                 <button 
                  key={sec.id}
                  onClick={() => setActiveMenuSection(sec.id)}
                  className={`w-full text-left px-6 py-4 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${activeMenuSection === sec.id ? 'bg-[#1A1A1A] text-white shadow-lg' : 'bg-[#F8FAFC] text-[#555555] hover:bg-[#F1F5F9]'}`}
                 >
                   {sec.name}
                 </button>
               ))}
            </div>
            <div className="md:col-span-3 bg-white p-10 border border-[#E2E8F0] rounded-2xl shadow-sm min-h-[500px]">
               {activeMenuSection === 'aims' && (
                 <div className="space-y-8">
                    <h3 className="text-xl font-serif font-black italic border-b border-[#F1F5F9] pb-4">Aims & Scope</h3>
                    <p className="text-sm font-medium text-[#555555] leading-loose">{journal.aims}</p>
                    <div className="space-y-4">
                       <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#4BA6B9]">Scope Includes:</h4>
                       <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {journal.scope.map(s => (
                            <li key={s} className="flex items-center text-xs font-bold text-[#1A1A1A]">
                               <div className="w-1.5 h-1.5 bg-[#4BA6B9] rounded-full mr-3 shrink-0" />
                               {s}
                            </li>
                          ))}
                       </ul>
                    </div>
                 </div>
               )}
               {activeMenuSection === 'guidelines' && (
                 <div className="space-y-8">
                    <h3 className="text-xl font-serif font-black italic border-b border-[#F1F5F9] pb-4">Author Guidelines</h3>
                    <div className="text-sm font-medium text-[#555555] leading-loose whitespace-pre-line">
                       {journal.guidelines}
                    </div>
                 </div>
               )}
               {activeMenuSection === 'editorial' && (
                 <div className="space-y-8">
                    <h3 className="text-xl font-serif font-black italic border-b border-[#F1F5F9] pb-4">Editorial Team</h3>
                    <div className="grid grid-cols-1 gap-8">
                       {journal.editorialTeam.map((ed, i) => (
                         <div key={i} className="flex space-x-4 border-b border-[#F1F5F9] pb-6 last:border-0">
                            <div className="w-12 h-12 rounded-full bg-[#F4F6F9] flex items-center justify-center shrink-0">
                               <Users size={20} className="text-[#4BA6B9]" />
                            </div>
                            <div className="space-y-2">
                               <h4 className="text-sm font-black uppercase text-[#1A1A1A]">{i+1}. {ed.name}</h4>
                               <p className="text-[11px] font-bold text-[#555555] italic">{ed.affiliation}</p>
                               {ed.email && <p className="text-[10px] font-bold text-[#4BA6B9]">{ed.email}</p>}
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
               )}
               {activeMenuSection === 'indexing' && (
                 <div className="space-y-8">
                    <h3 className="text-xl font-serif font-black italic border-b border-[#F1F5F9] pb-4">Abstracting & Indexing</h3>
                    <p className="text-sm font-medium text-[#555555] leading-loose">{journal.indexing}</p>
                 </div>
               )}
               {activeMenuSection === 'apc' && (
                 <div className="space-y-8">
                    <h3 className="text-xl font-serif font-black italic border-b border-[#F1F5F9] pb-4">Article Publishing Charges</h3>
                    <div className="p-8 bg-[#F0FBFC] border border-[#4BA6B9]/20 rounded-xl">
                      <p className="text-lg font-black text-[#1A1A1A] tracking-tight italic">{journal.apc}</p>
                    </div>
                 </div>
               )}
            </div>
          </div>
        );
      case 'policies':
        return (
          <div className="space-y-12">
            <h2 className="text-3xl font-serif font-black text-[#1A1A1A] italic">Journal Policies</h2>
            <div className="grid grid-cols-1 gap-12">
               {Object.entries(journal.policies).map(([key, val]) => (
                 <div key={key} className="space-y-4">
                    <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#4BA6B9]">{key.replace(/([A-Z])/g, ' $1')}</h3>
                    <p className="text-sm font-medium text-[#555555] leading-loose max-w-4xl border-l-2 border-[#F1F5F9] pl-6 pb-2">
                       {val}
                    </p>
                 </div>
               ))}
            </div>
          </div>
        );
      case 'about':
        return (
           <div className="space-y-16">
            <div className="space-y-6">
              <h2 className="text-3xl font-serif font-black text-[#1A1A1A] italic">About The Journal</h2>
              <p className="text-sm font-medium text-[#555555] leading-loose max-w-4xl italic">
                {journal.about}
              </p>
            </div>
            <div className="space-y-6">
              <h3 className="text-xl font-serif font-black italic">Privacy Statement</h3>
              <p className="text-sm font-medium text-[#555555] leading-loose max-w-4xl italic">
                {journal.privacy}
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white selection:bg-[#4BA6B9]/10">
      <Header />
      
      {/* Journal Brand Header - Production Grade */}
      <section className="bg-[#0B1F3A] text-white pt-48 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#4BA6B9]/10 rounded-full blur-[100px] -mr-48 -mt-48" />
        <div className="max-w-[1240px] mx-auto relative z-10 space-y-12">
           <div className="space-y-4 max-w-2xl">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#4BA6B9]">Scientific Journal Gateway</span>
              <h1 className="text-4xl md:text-5xl font-serif font-black italic leading-tight scale-y-105">{journal.title}</h1>
           </div>
           
           {/* Tab Navigation - OJS Style */}
           <div className="flex flex-wrap gap-x-8 gap-y-4 border-b border-white/10 pb-6">
              {[
                { id: 'home', name: 'Home' },
                { id: 'archives', name: 'Archives' },
                { id: 'current', name: 'Current Issue' },
                { id: 'menu', name: 'Journal Menu' },
                { id: 'policies', name: 'Journal Policies' },
                { id: 'about', name: 'About' }
              ].map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveMainTab(tab.id)}
                  className={`text-[11px] font-black uppercase tracking-[0.3em] transition-all relative pb-2 group ${activeMainTab === tab.id ? 'text-[#4BA6B9]' : 'text-white/60 hover:text-white'}`}
                >
                  {tab.name}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-[#4BA6B9] transition-all ${activeMainTab === tab.id ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </button>
              ))}
           </div>
        </div>
      </section>

      {/* Breadcrumb Band */}
      <div className="w-full bg-[#FAFBFC] py-4 px-6 border-b border-[#F1F5F9] text-[10px] font-black uppercase tracking-widest text-[#999999]">
         <div className="max-w-[1240px] mx-auto space-x-3 flex items-center">
            <Link href="/" className="hover:text-[#4BA6B9]">Main</Link>
            <ChevronRight size={10} />
            <Link href="/journals" className="hover:text-[#4BA6B9]">Library</Link>
            <ChevronRight size={10} />
            <span className="text-[#1A1A1A]">{journal.id}</span>
         </div>
      </div>

      <main className="flex-grow pb-40 px-6">
        <div className="max-w-[1240px] mx-auto mt-20 grid lg:grid-cols-12 gap-20 items-start">
           
           {/* Sidebar Info Card */}
           <div className="lg:col-span-3 space-y-10">
              <div className="bg-white border border-[#E2E8F0] shadow-sm rounded-2xl overflow-hidden group">
                <div className="w-full aspect-[3/4] bg-[#0B1F3A] flex flex-col items-center justify-center relative overflow-hidden">
                   {journal.cover ? (
                     <img src={journal.cover} alt={journal.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                   ) : (
                     <div className="p-10 text-center z-10 border border-white/20 space-y-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#4BA6B9]">EISR Scientific</p>
                        <h4 className="text-xl font-serif font-black italic text-white leading-tight">{journal.title}</h4>
                     </div>
                   )}
                   <div className="absolute bottom-0 inset-x-0 bg-black/40 backdrop-blur py-4 text-[9px] font-black tracking-[0.3em] uppercase text-white/60 text-center z-10">Repository Visual</div>
                </div>
                
                <div className="p-8 space-y-8">
                  <div className="space-y-4">
                    <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-[#BBBBBB]">Journal ISSN</h4>
                    <p className="text-xs font-black text-[#1A1A1A]">{journal.issn}</p>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-[9px] font-black uppercase tracking-[0.3em] text-[#BBBBBB]">Fast Track</h4>
                    <div className="flex items-center space-x-2 text-[#4BA6B9]">
                       <Clock size={14} />
                       <span className="text-xs font-black italic">60 Day Review</span>
                    </div>
                  </div>
                  <button className="w-full bg-[#1A1A1A] text-white py-4 text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center space-x-3 hover:bg-[#4BA6B9] transition-all">
                    <span>Submit Manuscript</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>

               {/* Institutional Badge */}
               <div className="p-8 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-[#4BA6B9]/10 flex items-center justify-center text-[#4BA6B9]">
                     <ShieldCheck size={20} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-[#555555]">Peer Reviewed</p>
                    <p className="text-[10px] font-bold text-[#1A1A1A] italic">Verified Academic Quality</p>
                  </div>
               </div>
           </div>

           {/* Dynamic Content Display */}
           <div className="lg:col-span-9 bg-white min-h-[600px]">
              {renderContent()}
           </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
