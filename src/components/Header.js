'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronDown, LayoutDashboard, LogOut, User } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
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
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userInitials, setUserInitials] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const menuRef = useRef(null);

  // Check auth state on mount and on pathname change
  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('eisr_token');
        if (token) {
          const payload = JSON.parse(atob(token.split('.')[1]));
          // Check expiry
          if (payload.exp && payload.exp * 1000 < Date.now()) {
            localStorage.removeItem('eisr_token');
            setLoggedIn(false);
            return;
          }
          setLoggedIn(true);
          const name = payload.name || payload.username || payload.email || 'User';
          setUserName(name);
          setUserInitials(
            name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
          );
        } else {
          setLoggedIn(false);
        }
      } catch {
        setLoggedIn(false);
      }
    };
    checkAuth();
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20 || pathname !== '/');
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  // Close user dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('eisr_token');
    setLoggedIn(false);
    setShowUserMenu(false);
    router.push('/login');
  };

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300 bg-white border-b border-[#F1F1F1]",
      isScrolled ? "h-20 shadow-md" : "h-24"
    )}>
      <div className="max-w-[1240px] mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
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
            const active = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
            return (
              <Link
                key={item.name}
                href={item.path}
                className={cn(
                  "text-[15px] font-bold transition-all tracking-tight relative group",
                  active ? "text-[#1A1A1A]" : "text-[#555555] hover:text-[#1A1A1A]"
                )}
              >
                {item.name}
                <span className={cn(
                  "absolute -bottom-2 left-0 h-0.5 bg-[#4BA6B9] transition-all",
                  active ? "w-full" : "w-0 group-hover:w-full"
                )} />
              </Link>
            );
          })}

          {/* Auth Button */}
          {loggedIn ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowUserMenu(v => !v)}
                className="flex items-center gap-2.5 px-4 py-2 rounded-full border-2 border-[#4BA6B9] bg-white hover:bg-[#4BA6B9]/5 transition-all"
              >
                {/* Avatar */}
                <div className="w-7 h-7 rounded-full bg-[#4BA6B9] text-white flex items-center justify-center text-[11px] font-black flex-shrink-0">
                  {userInitials}
                </div>
                <span className="text-[13px] font-bold text-[#1A1A1A] max-w-[110px] truncate">
                  {userName.split(' ')[0]}
                </span>
                <ChevronDown size={14} className={cn("text-[#555] transition-transform", showUserMenu && "rotate-180")} />
              </button>

              {/* Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 top-[calc(100%+8px)] w-52 bg-white border border-[#E5E7EB] rounded-xl shadow-xl overflow-hidden z-50">
                  {/* User info */}
                  <div className="px-4 py-3 border-b border-[#F1F1F1] bg-[#F8FAFC]">
                    <p className="text-[12px] font-black text-[#1A1A1A] truncate">{userName}</p>
                    <p className="text-[11px] text-[#9CA3AF] mt-0.5">Logged in</p>
                  </div>

                  <Link
                    href="/dashboard"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-3 px-4 py-3 text-[13px] font-bold text-[#1A1A1A] hover:bg-[#F1F8FF] hover:text-[#4BA6B9] transition-colors"
                  >
                    <LayoutDashboard size={15} /> My Dashboard
                  </Link>

                  <Link
                    href="/dashboard/profile"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-3 px-4 py-3 text-[13px] font-bold text-[#1A1A1A] hover:bg-[#F1F8FF] hover:text-[#4BA6B9] transition-colors"
                  >
                    <User size={15} /> Edit Profile
                  </Link>

                  <div className="border-t border-[#F1F1F1]">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-3 text-[13px] font-bold text-[#DC2626] hover:bg-[#FEF2F2] transition-colors"
                    >
                      <LogOut size={15} /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className={cn(
                "px-8 py-2.5 border-2 transition-all rounded-full font-black text-[14px] shadow-lg",
                pathname === '/login'
                  ? "bg-[#4BA6B9] border-[#4BA6B9] text-white"
                  : "border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white"
              )}
            >
              Login
            </Link>
          )}
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
                  "text-lg font-bold tracking-tight",
                  pathname === item.path ? "text-[#4BA6B9]" : "text-[#555555]"
                )}
              >
                {item.name}
              </Link>
            );
          })}

          {/* Mobile auth buttons */}
          <div className="pt-4 border-t border-[#F1F1F1] space-y-4">
            {loggedIn ? (
              <>
                <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 text-[15px] font-bold text-[#4BA6B9]">
                  <LayoutDashboard size={18} /> My Dashboard
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-3 text-[15px] font-bold text-[#DC2626]">
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-[15px] font-bold text-[#4BA6B9]">
                Login
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
