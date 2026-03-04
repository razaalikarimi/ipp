import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { FileText, Calendar, User, Search, Globe, ChevronRight, BookOpen, Target, Microscope, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      <Header />
      
      <main className="flex-grow">
        {/* Exact EISR Hero Section */}
        <section 
          id="home"
          className="relative h-[500px] bg-[#050B14] bg-cover bg-[center_top] flex items-center px-6 antialiased z-40"
          style={{ 
            backgroundImage: "url('/eisr_hero_exact.jpg')",
            backgroundRepeat: "no-repeat",
            imageRendering: "auto"
          }}
        >
          {/* Enhanced Clarity Overlay */}
          <div className="absolute inset-0 bg-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/10"></div>
          
          <div className="max-w-[1240px] mx-auto w-full flex justify-end relative z-10">
             {/* Text is directly in the image */}
          </div>

          {/* Floating Stats Bar - Redesigned to exact requested style */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[950px] px-6 z-50">
             <div className="bg-white rounded-xl shadow-xl py-8 px-12 lg:px-20 grid grid-cols-3 gap-4 lg:gap-8 border border-[#F1F1F1]">
                {/* Metric 1 */}
                <div className="flex items-start space-x-4">
                   <div className="w-[1.5px] h-12 bg-[#4BA6B9] shrink-0"></div>
                   <div className="flex flex-col">
                      <span className="text-lg font-bold text-[#1A1A1A]">87</span>
                      <span className="text-sm font-medium text-[#555555]">Articles</span>
                   </div>
                </div>
                
                {/* Metric 2 */}
                <div className="flex items-start space-x-4">
                   <div className="w-[1.5px] h-12 bg-[#4BA6B9] shrink-0"></div>
                   <div className="flex flex-col">
                      <span className="text-lg font-bold text-[#1A1A1A]">24K</span>
                      <span className="text-sm font-medium text-[#555555]">Article view</span>
                   </div>
                </div>

                {/* Metric 3 */}
                <div className="flex items-start space-x-4">
                   <div className="w-[1.5px] h-12 bg-[#4BA6B9] shrink-0"></div>
                   <div className="flex flex-col">
                      <span className="text-lg font-bold text-[#1A1A1A]">4</span>
                      <span className="text-sm font-medium text-[#555555]">Journals</span>
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* Foundations Section */}
        <section id="about" className="pt-48 pb-20 px-6 bg-white relative z-0">
           <div className="max-w-[1240px] mx-auto space-y-16">
              
              {/* 1. Introductory Paragraph */}
              <div className="max-w-4xl mx-auto">
                 <p className="text-lg md:text-xl text-[#333333] leading-relaxed text-justify font-medium">
                    Eye-Innovations Scientific Research (EISR) stands as a premier global multidisciplinary scientific publishing and innovation ecosystem. Dedicated to advancing the frontiers of future-driven research,EISR serves as a foundational pillar for scholars, industry leaders, and policymakers. By facilitating the translation of rigorous academic inquiry into tangible societal progress, the organization forms a vital nexus connecting scientific discovery with technological and sustainable advancement on a global scale.
                 </p>
              </div>

              {/* 3-Column Grid for About, Mission, Scope */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                 {/* 1. About */}
                 <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-[#F1F1F1] p-10 flex flex-col h-full hover:shadow-xl transition-shadow">
                    <div className="flex flex-col items-center mb-6">
                       <BookOpen className="text-[#1D4ED8] w-12 h-12 mb-4" strokeWidth={1.5} />
                       <h2 className="text-lg font-bold text-[#1A1A1A] uppercase tracking-wider">About</h2>
                    </div>
                    <div className="w-full h-px bg-[#F1F1F1] mb-6"></div>
                    <div className="flex flex-col flex-grow">
                       <h3 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider text-center mb-6">About</h3>
                       <p className="text-sm text-[#555555] leading-relaxed mb-4 flex-grow">
                          Eye-Innovations Scientific Research (EISR) is a global multidisciplinary research publishing ecosystem dedicated to advancing scientific knowledge and innovation. The platform connects researchers, academic institutions, and industry leaders to transform research into real-world impact.
                       </p>
                    </div>
                 </div>

                 {/* 2. Our Mission */}
                 <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-[#F1F1F1] p-10 flex flex-col h-full hover:shadow-xl transition-shadow">
                    <div className="flex flex-col items-center mb-6">
                       <Target className="text-[#1D4ED8] w-12 h-12 mb-4" strokeWidth={1.5} />
                       <h2 className="text-lg font-bold text-[#1A1A1A] uppercase tracking-wider">Our Mission</h2>
                    </div>
                    <div className="w-full h-px bg-[#F1F1F1] mb-6"></div>
                    <div className="flex flex-col flex-grow">
                       <h3 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider text-center mb-6">Driving Knowledge<br/>& Innovation</h3>
                       <p className="text-sm text-[#555555] leading-relaxed mb-4 flex-grow">
                          Our mission is to publish high-quality peer-reviewed research that promotes technological innovation, supports evidence-based policy development, and fosters collaboration between academia and industry worldwide.
                       </p>
                    </div>
                 </div>

                 {/* 3. Our Scope */}
                 <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-[#F1F1F1] p-10 flex flex-col h-full hover:shadow-xl transition-shadow">
                    <div className="flex flex-col items-center mb-6">
                       <Microscope className="text-[#1D4ED8] w-12 h-12 mb-4" strokeWidth={1.5} />
                       <h2 className="text-lg font-bold text-[#1A1A1A] uppercase tracking-wider">Our Scope</h2>
                    </div>
                    <div className="w-full h-px bg-[#F1F1F1] mb-6"></div>
                    <div className="flex flex-col flex-grow">
                       <h3 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-wider text-center mb-6">Research Domains</h3>
                       <ul className="text-sm text-[#555555] space-y-3 mb-8 flex-grow ml-2">
                          {[
                             'Artificial Intelligence',
                             'Engineering & Technology',
                             'Digital Transformation',
                             'Data Science & Analytics',
                             'Environmental Sustainability',
                             'Biomedical Sciences',
                             'Innovation & Policy Research'
                          ].map((domain, i) => (
                             <li key={i} className="flex items-start">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8] mt-1.5 mr-3 shrink-0"></div>
                                <span>{domain}</span>
                             </li>
                          ))}
                       </ul>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Indexed & Abstracted Section */}
        <section className="bg-white py-24 border-t border-[#F1F1F1]">
           <div className="max-w-[1240px] mx-auto px-6 text-center">
              <h2 className="text-3xl font-bold text-[#1A1A1A]  tracking-tight uppercase">Indexed & Abstracted In</h2>
              {/* Logos will be added here in the future when available */}
              <div className="mt-12 text-[#555555]  text-sm">
                 Indexing updates coming soon.
              </div>
           </div>
        </section>

        {/* Journals Grid Section */}
        <section id="journals" className="bg-white py-24 border-t border-[#F1F1F1]">
           <div className="max-w-[1240px] mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 {[
                   {
                     title: 'Journal of Eye-Innovation in Machine Learning (JEIML)',
                     issn: 'ISSN 3079-5354 (Online)',
                     chief: 'Prof. Dr. M. Irfan Uddin',
                     image: '/jeiml_cover.jpg',
                     index: 'Indexed by Scopus'
                   },
                   {
                     title: 'Journal of Eye Innovation in Security Analysis (JEISA)',
                     issn: 'ISSN 3080-9444 (Online)',
                     chief: 'Prof. Ali Kashif Bashir',
                     image: '/jeisa_cover.jpg',
                     index: null
                   }
                 ].map((j, i) => (
                    <div key={i} className="bg-white rounded-xl shadow-lg border border-[#F1F1F1] overflow-hidden flex h-[280px] group hover:shadow-2xl transition-all duration-500">
                       <div className="w-48 bg-[#0B1F3A] p-2 flex flex-col justify-center items-center relative overflow-hidden shrink-0">
                          {j.image ? (
                             <img src={j.image} alt={j.title} className="w-full h-full object-cover rounded-md border border-white/10" />
                          ) : (
                             <>
                                <div className="absolute inset-0 opacity-20 pointer-events-none">
                                   <div className="h-full w-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-400 to-transparent scale-150" />
                                </div>
                                <div className="z-10 text-white text-center  font-bold text-[10px] uppercase p-4 border border-white/20">
                                   EISR Scientific <br />Journal
                                </div>
                             </>
                          )}
                       </div>
                       <div className="flex-grow p-8 flex flex-col justify-between">
                          <div className="space-y-4">
                             <h3 className="text-xl font-bold text-[#4BA6B9] leading-tight group-hover:underline  uppercase">{j.title}</h3>
                             <p className="text-xs font-bold text-[#555555] ">{j.issn}</p>
                          </div>
                          <div className="space-y-4">
                             <div className="space-y-2">
                                <p className="text-sm font-bold text-[#555555] ">{j.chief}</p>
                             </div>
                             {j.index && (
                                <div className="flex items-center space-x-3 text-[#4BA6B9] font-bold text-xs  tracking-wider">
                                   <span>{j.index}</span>
                                   <div className="w-10 h-6 bg-[#F1F1F1] grayscale group-hover:grayscale-0 transition-all rounded text-[8px] flex items-center justify-center font-black opacity-40">SCOPUS</div>
                                </div>
                             )}
                          </div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Recent Articles Section */}
        <section id="articles" className="bg-white py-24 border-t border-[#F1F1F1]">
           <div className="max-w-[1240px] mx-auto px-6 space-y-12">
              <h2 className="text-3xl font-bold text-[#1A1A1A]  tracking-tight uppercase underline decoration-4 decoration-[#F1F1F1]">Recent Articles</h2>
              
              <div className="space-y-10">
                 {[
                   { 
                     title: 'Cybersecurity threats, countermeasures and mitigation techniques on the IoT: Future research directions',
                     authors: 'Almaha Adel Almuqren',
                     journal: 'JEIML',
                     published: '1/22/2025',
                     doi: '#'
                   },
                   { 
                     title: 'Applying risk analysis for determining threats and countermeasures in workstation domain',
                     authors: 'Rama Soliman Mousa, Rami Shehab',
                     journal: 'JEIML',
                     published: '1/25/2025',
                     doi: '#'
                   }
                 ].map((art, idx) => (
                    <div key={idx} className="bg-white rounded-2xl p-10 lg:p-12 border border-[#F1F1F1] shadow-sm hover:shadow-2xl transition-all duration-500 space-y-4 group">
                       <h3 className="text-xl font-bold text-[#4BA6B9] group-hover:underline  uppercase">{art.title}</h3>
                       <div className="space-y-2 text-sm text-[#555555] font-bold ">
                          <p>Authors: {art.authors}</p>
                          <p>Journal: {art.journal}</p>
                          <p>Published: {art.published}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </section>


        {/* Journals APC Section - Redesigned to exact table style */}
        <section id="apc" className="bg-white py-32 border-t border-[#F1F1F1]">
           <div className="max-w-[1240px] mx-auto px-6 space-y-12">
              <h2 className="text-3xl font-bold text-[#1A1A1A]  tracking-tight text-center uppercase">Article Publishing Charges (APCs) for EISR Journals</h2>
              
              <div className="max-w-[1000px] mx-auto bg-[#F8F9FB] rounded-2xl border border-[#EEEEEE] overflow-hidden shadow-sm">
                 <table className="w-full text-left font-sans text-sm">
                    <thead className="bg-[#F8F9FB]">
                       <tr className="border-b border-[#EEEEEE]">
                          <th className="py-5 px-8 font-bold text-[#1A1A1A]">Journal Name</th>
                          <th className="py-5 px-8 font-bold text-[#1A1A1A]">Article Publishing Charges (APCs)</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EEEEEE]">
                       {[
                         { name: 'Journal of Eye-Innovation in Machine Learning', fee: 'No APC' },
                         { name: 'Journal of Eye Innovation in Security Analysis', fee: 'No APC' }
                       ].map((item, idx) => (
                          <tr key={idx} className="hover:bg-white transition-colors">
                             <td className="py-5 px-8 font-medium text-[#3B82F6]">{item.name}</td>
                             <td className="py-5 px-8 font-bold text-[#1A1A1A]">{item.fee}</td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        </section>

        {/* Leadership Team Section */}
        <section id="leadership" className="bg-white py-32">
           <div className="max-w-[1240px] mx-auto px-6 space-y-16">
              <h2 className="text-3xl font-bold text-[#1A1A1A]  tracking-tight uppercase underline decoration-4 decoration-[#F1F1F1]">Leadership Team</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                 {[
                    { name: "Dr. Mohammed Amin Almaayah", title: "Chief Executive Officer" },
                    { name: "Marwan Alrawashdeh", title: "Chief Technology Officer" }
                 ].map((leader, idx) => (
                    <div key={idx} className="flex items-center space-x-8 bg-white p-8 rounded-2xl border border-[#F1F1F1] shadow-sm hover:shadow-xl transition-all group">
                       <div className="w-20 h-20 bg-[#F1F1F1] rounded-full flex items-center justify-center shrink-0">
                          <User size={30} className="text-[#BBBBBB]" />
                       </div>
                       <div className="space-y-1">
                          <h4 className="text-xl font-bold text-[#1A1A1A] group-hover:text-[#4BA6B9] transition-colors  uppercase">{leader.name}</h4>
                          <p className="text-xs font-bold text-[#555555] opacity-60 uppercase tracking-widest">{leader.title}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-[#F8F9FB] py-32 border-t border-[#F1F1F1]">
           <div className="max-w-[1240px] mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-20">
                 <div className="space-y-8">
                    <h2 className="text-3xl font-bold text-[#1A1A1A]  tracking-tight uppercase">Get in Touch</h2>
                    <p className="text-[#555555]  leading-relaxed">
                       Have questions about submissions, peer review, or specific journals? Our editorial team is here to assist you with global academic inquiries.
                    </p>
                    <div className="space-y-6 pt-6">
                       <div className="flex items-center space-x-6 group">
                          <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center text-[#4BA6B9] group-hover:bg-[#4BA6B9] group-hover:text-white transition-all">
                             <Search size={20} />
                          </div>
                          <div>
                             <p className="text-[10px] font-black uppercase tracking-widest text-[#555555] opacity-60">General Inquiries</p>
                             <p className="font-bold text-[#1A1A1A]">info@thestap.com</p>
                          </div>
                       </div>
                       <div className="flex items-center space-x-6 group">
                          <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center text-[#4BA6B9] group-hover:bg-[#4BA6B9] group-hover:text-white transition-all">
                             <Globe size={20} />
                          </div>
                          <div>
                             <p className="text-[10px] font-black uppercase tracking-widest text-[#555555] opacity-60">Global HQ</p>
                             <p className="font-bold text-[#1A1A1A]">Amman, Jordan | Dubai, UAE</p>
                          </div>
                       </div>
                    </div>
                 </div>
                 
                 <form className="bg-white p-10 rounded-3xl shadow-xl border border-[#F1F1F1] space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-[#555555]">Full Name</label>
                          <input type="text" className="w-full bg-[#F8F9FB] border-none rounded-lg p-4 text-sm font-medium focus:ring-2 focus:ring-[#4BA6B9] transition-all" />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-[#555555]">Email Address</label>
                          <input type="email" className="w-full bg-[#F8F9FB] border-none rounded-lg p-4 text-sm font-medium focus:ring-2 focus:ring-[#4BA6B9] transition-all" />
                       </div>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-[#555555]">Message</label>
                       <textarea rows={4} className="w-full bg-[#F8F9FB] border-none rounded-lg p-4 text-sm font-medium focus:ring-2 focus:ring-[#4BA6B9] transition-all" />
                    </div>
                    <button type="submit" className="w-full bg-[#1A1A1A] text-white py-5 rounded-xl font-black text-xs uppercase tracking-[0.3em] hover:bg-[#4BA6B9] transition-all shadow-lg hover:shadow-[#4BA6B9]/40">
                       Send Message
                    </button>
                 </form>
              </div>
           </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
