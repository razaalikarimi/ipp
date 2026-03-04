'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, X, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import Logo from './Logo';

const navItems = [
  { name: 'Home', path: '/', id: 'home' },
  { name: 'Journals', path: '/journals', id: 'journals' },
  { name: 'Articles', path: '/articles', id: 'articles' },
  { name: 'Journals APC', path: '/apc', id: 'apc' },
  { name: 'Leadership Team', path: '/leadership', id: 'leadership' },
  { name: 'Contact', path: '/contact', id: 'contact' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      // Shrink if scrolled OR if we are on ANY page other than the home root
      setIsScrolled(scrolled || pathname !== '/');
    };
    
    // Run once on mount to catch initial state (e.g. landing on /login or /#contact)
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300 bg-white border-b border-[#F1F1F1]",
      isScrolled ? "h-20 shadow-md" : "h-24"
    )}>
      <div className="max-w-[1240px] mx-auto px-6 h-full flex items-center justify-between">
        {/* Absolutely Positioned Boxed Logo - shifted further left for extreme focus */}
        <div className="relative w-[220px] h-full flex items-center">
           <Link href="/" className={cn(
               "relative z-[100] transition-all duration-500 hover:scale-110 h-auto",
               isScrolled ? "scale-90 -left-12" : "top-2 -left-10"
           )}>
              <Logo variant="full" scrolled={isScrolled} />
           </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-10">
          {navItems.map((item) => {
            const isHomePage = pathname === '/';
            // If on home page, use anchors. If on other page, use full path.
            const href = isHomePage ? `/#${item.id}` : item.path;
            
            return (
              <Link 
                key={item.name} 
                href={href} 
                className="text-[13px] font-bold text-[#555555] hover:text-[#4BA6B9] transition-all uppercase tracking-widest relative group "
              >
                {item.name}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#4BA6B9] transition-all group-hover:w-full"></span>
              </Link>
            );
          })}
          
          {/* Login Button */}
          <Link 
            href="/login" 
            className="px-6 py-2 border-2 border-[#4BA6B9] text-[#4BA6B9] text-[12px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-[#4BA6B9] hover:text-white transition-all shadow-lg hover:shadow-[#4BA6B9]/20"
          >
            Login
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden p-2 text-[#555555] hover:text-[#4BA6B9] transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Overlay */}
      <div className={cn(
        "lg:hidden fixed inset-0 top-24 bg-white z-40 transition-transform duration-500",
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <nav className="flex flex-col py-10 px-8 space-y-8">
          {navItems.map((item) => {
            const isHomePage = pathname === '/';
            const href = isHomePage ? `/#${item.id}` : item.path;
            return (
              <Link
                key={item.name}
                href={href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "text-lg font-bold  uppercase tracking-widest",
                  pathname === item.path ? "text-[#4BA6B9]" : "text-[#555555]"
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
