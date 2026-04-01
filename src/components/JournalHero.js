
'use client';
import Link from 'next/link';
import { ChevronDown, LayoutDashboard, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { journalMenuItems, journalPolicyItems, journalAboutItems } from '@/lib/data';

const BANNERS = [
  '/baner0001.jpg',
  '/baner0002.jpg',
  '/baner0003.jpg',
  '/baner0004.jpg',
];

export default function JournalHero({ journal, activeTab = 'home' }) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const isActive = (tab) => activeTab === tab;

  return (
    <section className="relative text-white pt-32 pb-0 px-6 bg-[#050B14] z-40">

      {/* ── Background image layers — clipped separately so dropdowns can overflow ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {BANNERS.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{
              backgroundImage: `url('${src}')`,
              opacity: i === current ? 1 : 0,
            }}
          />
        ))}
        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Dot indicators — bottom left */}
      <div className="absolute bottom-16 left-8 flex gap-1.5 z-20">
        {BANNERS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="border-none cursor-pointer p-0 transition-all duration-400"
            style={{
              width: i === current ? '28px' : '8px',
              height: '8px',
              borderRadius: '4px',
              backgroundColor: i === current ? '#4BA6B9' : 'rgba(255,255,255,0.4)',
              transition: 'all 0.4s ease',
            }}
          />
        ))}
      </div>

      {/* ── Content ── */}
      <div className="max-w-[1240px] mx-auto relative z-[100] space-y-10">
        <div className="space-y-4 max-w-full md:max-w-[55%]">
          <span className="text-[11px] font-bold text-[#4BA6B9] tracking-widest uppercase">
            Scientific Journal Gateway
          </span>
          <h1
            className="font-sans font-bold leading-snug"
            style={{
              fontSize: 'clamp(22px, 3vw, 42px)',
              color: '#ffffff',
              textShadow: '0 2px 16px rgba(0,0,0,0.85), 0 1px 4px rgba(0,0,0,0.9)',
              letterSpacing: '-0.01em',
            }}
          >
            {journal.title}
          </h1>
          <p className="text-sm font-bold" style={{ color: 'rgba(255,255,255,0.82)', textShadow: '0 1px 6px rgba(0,0,0,0.7)' }}>
            Publishing model:{' '}
            <Link href="/policies/open-access" className="underline underline-offset-4 hover:text-[#4BA6B9]">
              Open access
            </Link>
          </p>
        </div>

        {/* Navigation Bar */}
        <div className="flex flex-wrap gap-x-4 md:gap-x-10 gap-y-4 border-b border-white/5 pb-0 text-[13px] font-bold">
          <Link
            href={`/journals/${journal.slug}`}
            className={`pb-4 border-b-2 transition-all ${isActive('home') ? 'border-[#4BA6B9] text-[#4BA6B9]' : 'border-transparent hover:border-white'}`}
          >
            Home
          </Link>
          <Link
            href={`/journals/${journal.slug}/archives`}
            className={`pb-4 border-b-2 transition-all ${isActive('archives') ? 'border-[#4BA6B9] text-[#4BA6B9]' : 'border-transparent hover:border-white'}`}
          >
            Archives
          </Link>
          <Link
            href={`/journals/${journal.slug}/current-issue`}
            className={`pb-4 border-b-2 transition-all ${isActive('current') ? 'border-[#4BA6B9] text-[#4BA6B9]' : 'border-transparent hover:border-white'}`}
          >
            Current Issues
          </Link>

          {/* Journal Menu Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setActiveDropdown('menu')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className={`flex items-center gap-2 pb-4 px-4 -mx-4 border-b-2 transition-all ${activeDropdown === 'menu' ? 'bg-[#1e78ff] border-transparent' : 'border-transparent hover:border-white'}`}>
              Journal Menu <ChevronDown size={12} className={activeDropdown === 'menu' ? 'rotate-180 transition-transform' : 'transition-transform'} />
            </button>
            <div className={`absolute top-full left-0 w-72 bg-white shadow-2xl border border-[#E2E8F0] py-0 rounded-b-xl z-[200] transition-all duration-300 ${activeDropdown === 'menu' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
              {journalMenuItems.map(item => (
                <Link
                  key={item.name}
                  href={`/journals/${journal.slug}/${item.slug}`}
                  className="block px-8 py-5 text-[13px] font-bold text-[#1A1A1A] hover:bg-[#F8FBFF] hover:text-[#4BA6B9] transition-all border-b border-[#F1F5F9] last:border-0"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Journal Policies Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setActiveDropdown('policies')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className={`flex items-center gap-2 pb-4 px-4 -mx-4 border-b-2 transition-all ${activeDropdown === 'policies' ? 'bg-[#1e78ff] border-transparent' : 'border-transparent hover:border-white'}`}>
              Journal Policies <ChevronDown size={12} className={activeDropdown === 'policies' ? 'rotate-180 transition-transform' : 'transition-transform'} />
            </button>
            <div className={`absolute top-full left-0 w-[320px] bg-white shadow-2xl border border-[#E2E8F0] py-0 rounded-b-xl z-[200] transition-all duration-300 ${activeDropdown === 'policies' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
              {journalPolicyItems.map(item => (
                <Link
                  key={item.name}
                  href={`/policies/${item.slug}?journal=${journal.id}`}
                  className="block px-8 py-5 text-[13px] font-bold text-[#1A1A1A] hover:bg-[#F8FBFF] hover:text-[#4BA6B9] transition-all border-b border-[#F1F5F9] last:border-0"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* About Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setActiveDropdown('about')}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className={`flex items-center gap-2 pb-4 px-4 -mx-4 border-b-2 transition-all ${activeDropdown === 'about' ? 'bg-[#1e78ff] border-transparent' : 'border-transparent hover:border-white'}`}>
              About <ChevronDown size={12} className={activeDropdown === 'about' ? 'rotate-180 transition-transform' : 'transition-transform'} />
            </button>
            <div className={`absolute top-full left-0 w-64 bg-white shadow-2xl border border-[#E2E8F0] py-0 rounded-b-xl z-[200] transition-all duration-300 ${activeDropdown === 'about' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
              {journalAboutItems.map(item => (
                <Link
                  key={item.slug}
                  href={item.slug === 'contact' ? '/contact' : item.slug === 'about' ? `/journals/${journal.slug}/about` : `/policies/${item.slug}`}
                  className="block px-8 py-5 text-[13px] font-bold text-[#1A1A1A] hover:bg-[#F8FBFF] hover:text-[#4BA6B9] transition-all border-b border-[#F1F5F9] last:border-0"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
