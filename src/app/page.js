'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { FileText, Calendar, User, Search, Globe, ChevronRight, BookOpen, Target, Microscope, ArrowRight, Linkedin } from 'lucide-react';
import { journals, articles, leaders } from '@/lib/data';

export default function Home() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const banners = ['/baner0001.jpg', '/baner0002.jpg', '/baner0003.jpg', '/baner0004.jpg'];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      <Header />
      
      <main className="flex-grow">
        {/* Sliding Hero Section */}
        <section 
          id="home"
          className="relative h-[500px] bg-[#050B14] bg-cover bg-center flex items-center px-6 antialiased z-40 transition-all duration-1000 ease-in-out"
          style={{ 
            backgroundImage: `url('${banners[currentBanner]}')`,
            backgroundRepeat: "no-repeat",
            imageRendering: "auto"
          }}
        >
          {/* Enhanced Clarity Overlay */}
          <div className="absolute inset-0 bg-black/10"></div>
          
          <div className="max-w-[1240px] mx-auto w-full flex justify-end relative z-10">
             {/* Text is directly in the image */}
          </div>

          {/* Banner Indicators */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex space-x-2 z-50">
            {banners.map((_, i) => (
              <button 
                key={i} 
                onClick={() => setCurrentBanner(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${i === currentBanner ? 'bg-[#4BA6B9] w-8' : 'bg-white/50 hover:bg-white'}`}
              />
            ))}
          </div>

          {/* Floating Stats Bar */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-full max-w-[950px] px-6 z-50">
             <div className="bg-white rounded-xl shadow-xl py-8 px-12 lg:px-20 grid grid-cols-3 gap-4 lg:gap-8 border border-[#F1F1F1]">
                {/* Metric 1 */}
                <div className="flex items-start space-x-4">
                   <div className="w-[1.5px] h-12 bg-[#4BA6B9] shrink-0"></div>
                   <div className="flex flex-col">
                      <span className="text-lg font-bold text-[#1A1A1A]">----</span>
                      <span className="text-sm font-medium text-[#555555]">Articles</span>
                   </div>
                </div>
                
                {/* Metric 2 */}
                <div className="flex items-start space-x-4">
                   <div className="w-[1.5px] h-12 bg-[#4BA6B9] shrink-0"></div>
                   <div className="flex flex-col">
                      <span className="text-lg font-bold text-[#1A1A1A]">----</span>
                      <span className="text-sm font-medium text-[#555555]">Article view</span>
                   </div>
                </div>

                {/* Metric 3 */}
                <div className="flex items-start space-x-4">
                   <div className="w-[1.5px] h-12 bg-[#4BA6B9] shrink-0"></div>
                   <div className="flex flex-col">
                      <span className="text-lg font-bold text-[#1A1A1A]">{journals.length}</span>
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
                    Eye-Innovations Scientific Research (EISR) stands as a premier global multidisciplinary scientific publishing and innovation ecosystem. Dedicated to advancing the frontiers of future-driven research, EISR serves as a foundational pillar for scholars, industry leaders, and policymakers. By facilitating the translation of rigorous academic inquiry into tangible societal progress, the organization forms a vital nexus connecting scientific discovery with technological and sustainable advancement on a global scale.
                 </p>
              </div>

              {/* 3-Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
                 <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-[#F1F1F1] p-10 flex flex-col h-full hover:shadow-xl transition-shadow">
                    <div className="flex flex-col items-center mb-6">
                       <BookOpen className="text-[#1D4ED8] w-12 h-12 mb-4" strokeWidth={1.5} />
                       <h2 className="text-lg font-bold text-[#1A1A1A]">About</h2>
                    </div>
                    <div className="w-full h-px bg-[#F1F1F1] mb-6"></div>
                    <p className="text-sm text-[#555555] leading-relaxed text-center">
                       Eye-Innovations Scientific Research (EISR) is a global multidisciplinary research publishing ecosystem dedicated to advancing scientific knowledge and innovation.
                    </p>
                 </div>

                 <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-[#F1F1F1] p-10 flex flex-col h-full hover:shadow-xl transition-shadow">
                    <div className="flex flex-col items-center mb-6">
                       <Target className="text-[#1D4ED8] w-12 h-12 mb-4" strokeWidth={1.5} />
                       <h2 className="text-lg font-bold text-[#1A1A1A]">Our Mission</h2>
                    </div>
                    <div className="w-full h-px bg-[#F1F1F1] mb-6"></div>
                    <p className="text-sm text-[#555555] leading-relaxed text-center">
                       Our mission is to publish high-quality peer-reviewed research that promotes technological innovation and fosters collaboration between academia and industry worldwide.
                    </p>
                 </div>

                 <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-[#F1F1F1] p-10 flex flex-col h-full hover:shadow-xl transition-shadow">
                    <div className="flex flex-col items-center mb-6">
                       <Microscope className="text-[#1D4ED8] w-12 h-12 mb-4" strokeWidth={1.5} />
                       <h2 className="text-lg font-bold text-[#1A1A1A]">Our Scope</h2>
                    </div>
                    <div className="w-full h-px bg-[#F1F1F1] mb-6"></div>
                    <ul className="text-sm text-[#555555] space-y-3">
                       {['Machine Learning', 'Cybersecurity', 'IT Infrastructure', 'Risk Auditing'].map(s => (
                          <li key={s} className="flex items-center space-x-3">
                             <div className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8]" />
                             <span>{s}</span>
                          </li>
                       ))}
                    </ul>
                 </div>
              </div>
           </div>
        </section>

        {/* Indexed & Abstracted Section */}
        <section className="bg-white py-24 border-t border-[#F1F1F1]">
           <div className="max-w-[1240px] mx-auto px-6 text-center space-y-12">
              <h2 className="text-3xl font-bold text-[#1A1A1A] tracking-tight">Indexed & Abstracted In</h2>
              <div className="flex flex-wrap justify-center items-center gap-16 pt-6 opacity-80 hover:opacity-100 transition-all">
                 <img src="/google-scholar.jpg" alt="Google Scholar" className="h-20 md:h-24 object-contain" />
                 <img src="/crossref.png" alt="Crossref" className="h-12 md:h-16 object-contain" />
              </div>
           </div>
        </section>

        {/* Journals Grid */}
        <section id="journals" className="bg-white py-24 border-t border-[#F1F1F1]">
           <div className="max-w-[1240px] mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 {journals.map((j) => (
                    <Link key={j.slug} href={`/journals/${j.slug}`} className="bg-white rounded-xl shadow-lg border border-[#F1F1F1] overflow-hidden flex h-[280px] group hover:shadow-2xl transition-all duration-500">
                       <div className="w-48 bg-[#0B1F3A] p-2 flex flex-col justify-center items-center relative overflow-hidden shrink-0">
                          <img src={j.cover} alt={j.title} className="w-full h-full object-cover rounded-md border border-white/10" />
                       </div>
                       <div className="flex-grow p-8 flex flex-col justify-between">
                          <div className="space-y-4">
                             <h3 className="text-xl font-bold text-[#4BA6B9] leading-tight group-hover:underline">{j.title}</h3>

                          </div>
                          <div className="space-y-4">
                             <p className="text-sm font-bold text-[#1A1A1A]">Editor-in-Chief: {j.chief}</p>
                             <div className="flex items-center space-x-3 text-[#4BA6B9] font-bold text-[11px]">
                                <span>{j.indexing.split(',')[0]}</span>
                                <div className="w-10 h-6 bg-[#F1F1F1] rounded text-[8px] flex items-center justify-center font-extrabold opacity-40">INDEX</div>
                             </div>
                          </div>
                       </div>
                    </Link>
                 ))}
              </div>
           </div>
        </section>

        {/* Recent Articles */}
        <section id="articles" className="bg-white py-24 border-t border-[#F1F1F1]">
           <div className="max-w-[1240px] mx-auto px-6 space-y-12">
              <h2 className="text-3xl font-bold text-[#1A1A1A] tracking-tight">Recent Articles</h2>
              <div className="space-y-8">
                 {/* Empty as requested */}
              </div>
           </div>
        </section>

        {/* Leadership Team Section (Home) */}
        <section className="bg-white py-32 border-t border-[#F1F1F1]">
           <div className="max-w-[1240px] mx-auto px-6 space-y-16 text-center">
              <div className="space-y-4">
                 <h2 className="text-4xl font-medium text-[#1A1A1A] tracking-tight">Leadership Team</h2>
                 <div className="w-16 h-0.5 bg-[#4BA6B9]/20 mx-auto"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1100px] mx-auto pt-4">
                 {leaders.map((leader, idx) => (
                    <div key={idx} className="bg-white rounded-3xl p-6 border border-[#F1F1F1] shadow-sm hover:shadow-xl transition-all duration-500 group relative flex items-center overflow-hidden text-left">
                       {/* Top Gradient Accent */}
                       <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#2dd4bf] opacity-80" />
                       
                       {/* Left: Rounded Image Container */}
                       <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0 border border-[#F1F1F1]">
                          {leader.image ? (
                             <img 
                               src={leader.image} 
                               alt={leader.name} 
                               className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                             />
                          ) : (
                             <div className="w-full h-full bg-[#F8F9FA] flex flex-col items-center justify-center text-[#CCCCCC]">
                                <User size={24} strokeWidth={1} />
                             </div>
                          )}
                       </div>

                       {/* Center: Details */}
                       <div className="flex-grow pl-6 space-y-1">
                          <h3 className="text-[16px] font-bold text-[#1A1A1A] tracking-tight group-hover:text-[#4BA6B9] transition-colors leading-tight">
                             {leader.name}
                          </h3>
                          <p className="text-[11px] text-[#555555] font-semibold tracking-tight">
                             {leader.title}
                          </p>
                       </div>

                       {/* Right: LinkedIn Button */}
                       <div className="shrink-0 pl-4">
                          <a href="#" className="w-8 h-8 rounded-lg bg-[#F8F9FA] flex items-center justify-center text-[#1A1A1A] hover:bg-[#0077B5] hover:text-white transition-all shadow-sm">
                             <Linkedin size={14} fill="currentColor" stroke="none" />
                          </a>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* APC Table */}
        <section id="apc" className="bg-white py-32 border-t border-[#F1F1F1]">
           <div className="max-w-[1240px] mx-auto px-6 space-y-12">
              <h2 className="text-3xl font-bold text-[#1A1A1A] tracking-tight text-center">Article Publishing Charges (APCs)</h2>
              <div className="max-w-[800px] mx-auto bg-[#F8F9FB] rounded-2xl border border-[#EEEEEE] overflow-hidden">
                 <table className="w-full text-left text-sm">
                    <thead>
                       <tr className="bg-[#F1F5F9] border-b border-gray-200">
                          <th className="py-4 px-8 font-bold text-[#1A1A1A]">Journal</th>
                          <th className="py-4 px-8 font-bold text-[#1A1A1A]">Charge</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                       {journals.map((j) => (
                          <tr key={j.slug} className="hover:bg-white transition-colors">
                             <td className="py-4 px-8 font-medium text-[#1A1A1A]">{j.title}</td>
                             <td className="py-4 px-8 font-bold text-[#4BA6B9]">{j.apc}</td>
                          </tr>
                       ))}
                    </tbody>
                 </table>
              </div>
           </div>
        </section>

        {/* Contact Form */}
        <section id="contact" className="bg-[#F8F9FB] py-32 border-t border-[#F1F1F1]">
           <div className="max-w-[1240px] mx-auto px-6">
              <div className="grid lg:grid-cols-2 gap-20">
                 <div className="space-y-8">
                    <h2 className="text-3xl font-bold text-[#1A1A1A] tracking-tight">Get in Touch</h2>
                     <p className="text-[#1A1A1A] leading-relaxed font-bold">Have questions about submissions or peer-review? Our editorial team is ready to assist you.</p>
                    <div className="flex flex-col space-y-6 group py-4">
                       <div className="flex items-center space-x-6">
                          <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center text-[#4BA6B9]">
                             <Search size={20} />
                          </div>
                          <div>
                              <p className="text-[11px] font-black text-[#1A1A1A]">Inquiries</p>
                             <p className="font-bold text-[#1A1A1A]">info@eisr.com</p>
                          </div>
                       </div>
                       <div className="flex items-center space-x-6">
                          <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center text-[#4BA6B9]">
                             <Globe size={20} />
                          </div>
                          <div>
                              <p className="text-[11px] font-black text-[#1A1A1A]">Address</p>
                             <p className="font-bold text-[#1A1A1A]">Amman-Jordan</p>
                          </div>
                       </div>
                    </div>
                 </div>
                 <form className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 space-y-6">
                    <input type="text" placeholder="Full Name" className="w-full bg-[#F8F9FB] border-none rounded-lg p-5 text-sm font-bold" />
                    <input type="email" placeholder="Email Address" className="w-full bg-[#F8F9FB] border-none rounded-lg p-5 text-sm font-bold" />
                    <textarea placeholder="Your Message" rows={4} className="w-full bg-[#F8F9FB] border-none rounded-lg p-5 text-sm font-bold" />
                    <button className="w-full bg-[#1A1A1A] text-white py-5 rounded-xl font-bold hover:bg-[#4BA6B9] transition-all">Send Message</button>
                 </form>
              </div>
           </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
