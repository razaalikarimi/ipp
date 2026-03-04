'use client';
import Link from 'next/link';
import { Linkedin, Globe } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0B1521] text-white pt-24 pb-12 font-sans overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-6">
        
        {/* Main Footer - 4 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16">
          
          {/* Column 1: Branding (Spans 5 cols on lg) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="inline-block bg-white p-5 rounded-xl shadow-lg w-[260px]">
              <div className="relative w-full h-auto flex items-center justify-center">
                 <img 
                   src="/eisr_logo.png" 
                   alt="EISR Eye-Innovations Scientific Research" 
                   className="w-full h-auto object-contain"
                 />
              </div>
            </div>
            <p className="text-[#8F9CAE] text-sm leading-relaxed  pr-4 max-w-sm">
              Eye-Innovations Scientific Research (EISR) is an international scholarly publisher dedicated to the rapid dissemination of impactful research in multidisciplinary sciences.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <div className="h-px w-8 bg-[#C38452]/60"></div>
              <p className="text-[#C38452] text-[10px] font-black uppercase tracking-[0.2em]">Verified Academic Publisher</p>
            </div>
          </div>

          {/* Column 2: Links 1 (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-5 pt-4">
             <Link href="/journals" className="block text-sm font-medium text-[#8F9CAE] hover:text-white transition-colors">Journals Portfolio</Link>
             <Link href="/articles" className="block text-sm font-medium text-[#8F9CAE] hover:text-white transition-colors">Latest Articles</Link>
             <Link href="/apc" className="block text-sm font-medium text-[#8F9CAE] hover:text-white transition-colors">APC Policies</Link>
             <Link href="/policies" className="block text-sm font-medium text-[#8F9CAE] hover:text-white transition-colors">Publishing Ethics</Link>
          </div>

          {/* Column 3: Links 2 (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-5 pt-4">
             <Link href="/leadership" className="block text-sm font-medium text-[#8F9CAE] hover:text-white transition-colors">Leadership Team</Link>
             <Link href="/contact" className="block text-sm font-medium text-[#8F9CAE] hover:text-white transition-colors">Contact Office</Link>
             <Link href="/login" className="block text-sm font-medium text-[#8F9CAE] hover:text-white transition-colors">Login Gateway</Link>
             <Link href="/register" className="block text-sm font-medium text-[#8F9CAE] hover:text-white transition-colors">Member Register</Link>
          </div>

          {/* Column 4: Contact & Social (Spans 3 cols on lg) */}
          <div className="lg:col-span-3 space-y-8 pt-4">
             <div className="space-y-3">
                <h4 className="text-[#C38452] text-[10px] font-black uppercase tracking-[0.2em]">Global HQ</h4>
                <p className="text-sm font-medium text-[#8F9CAE]">Amman, Jordan • Dubai, UAE</p>
             </div>
             <div className="space-y-3">
                <h4 className="text-[#C38452] text-[10px] font-black uppercase tracking-[0.2em]">Inquiries</h4>
                <a href="mailto:info@EyeISR.com" className="block text-sm font-medium text-[#8F9CAE] hover:text-white transition-colors">info@eisr.org</a>
             </div>
             <div className="flex space-x-4 pt-2">
                <a 
                  href="https://linkedin.com" 
                  className="w-9 h-9 rounded border border-[#2A3544] flex items-center justify-center text-[#8F9CAE] hover:text-white hover:border-[#4BA6B9] hover:bg-[#2A3544]/50 transition-all"
                >
                   <Linkedin size={15} />
                </a>
                <a 
                  href="#" 
                  className="w-9 h-9 rounded border border-[#2A3544] flex items-center justify-center text-[#8F9CAE] hover:text-white hover:border-[#4BA6B9] hover:bg-[#2A3544]/50 transition-all"
                >
                   <Globe size={15} />
                </a>
             </div>
          </div>

        </div>

        {/* Bottom Bar Container */}
        <div className="pt-10 border-t border-[#1C2634] flex flex-col items-center space-y-8">
           <p className="text-[10px] font-bold text-[#566579] tracking-[0.2em] uppercase text-center">
             {currentYear}© Eye-Innovations Scientific Research. All Rights Reserved.
           </p>
           
           <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-[10px] font-bold text-[#566579] tracking-[0.2em] uppercase">
              <Link href="/policies" className="hover:text-[#8F9CAE] transition-colors">Publication Ethics</Link>
              <Link href="/policies" className="hover:text-[#8F9CAE] transition-colors">Privacy Policy</Link>
              <Link href="/policies" className="hover:text-[#8F9CAE] transition-colors">Terms of Use</Link>
           </div>
        </div>

      </div>
    </footer>
  );
}
