'use client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { User, Mail, Lock, Globe, Building2, ShieldCheck, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';

export default function Register() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBFC] font-sans selection:bg-[#4BA6B9]/10">
      <Header />
      
      <main className="flex-grow pt-40 pb-24 px-6">
        <div className="max-w-[1240px] mx-auto">
          {/* Breadcrumb - Clean & Subtle */}
          <nav className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-[#999999] mb-12">
            <Link href="/" className="hover:text-[#4BA6B9]">Main Page</Link>
            <ChevronRight size={10} />
            <Link href="/login" className="hover:text-[#4BA6B9]">Login Gateway</Link>
            <ChevronRight size={10} />
            <span className="text-[#1A1A1A]">Scholar Registration</span>
          </nav>

          <div className="max-w-4xl mx-auto">
            {/* Minimal Header */}
            <div className="border-l-4 border-[#4BA6B9] pl-6 mb-16">
              <h1 className="text-5xl font-serif font-black text-[#1A1A1A] italic leading-tight">
                Scholar <br />Registration
              </h1>
              <p className="text-sm font-medium text-[#555555] mt-3 max-w-lg">Join the EISR global research ecosystem to submit manuscripts and participate in professional peer reviews.</p>
            </div>

            {/* Production Grade Form Structure */}
            <form className="space-y-16">
              
              {/* Section 1: Professional Profile */}
              <div className="bg-white border border-[#E2E8F0] shadow-sm rounded-xl overflow-hidden">
                <div className="bg-[#FAFBFC] px-10 py-6 border-b border-[#F1F5F9] flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-[#4BA6B9]">
                    <User size={18} />
                    <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#1A1A1A]">Scholar Profile</h2>
                  </div>
                  <span className="text-[9px] font-bold text-[#BBBBBB] uppercase">Required Section</span>
                </div>

                <div className="p-10 lg:p-12 space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-[#555555]">Given Name</label>
                       <input type="text" placeholder="First Name" className="w-full border-b-2 border-[#F1F5F9] focus:border-[#4BA6B9] py-3 text-sm font-semibold text-[#1A1A1A] outline-none transition-all placeholder:text-[#BBBBBB] bg-transparent" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-[#555555]">Family Name</label>
                       <input type="text" placeholder="Middle & Last Names" className="w-full border-b-2 border-[#F1F5F9] focus:border-[#4BA6B9] py-3 text-sm font-semibold text-[#1A1A1A] outline-none transition-all placeholder:text-[#BBBBBB] bg-transparent" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#555555] flex items-center">
                      <Building2 size={12} className="mr-2 text-[#4BA6B9]" />
                      Institutional Affiliation
                    </label>
                    <input type="text" placeholder="University, Department, or Research Institute" className="w-full border-b-2 border-[#F1F5F9] focus:border-[#4BA6B9] py-3 text-sm font-semibold text-[#1A1A1A] outline-none transition-all placeholder:text-[#BBBBBB] bg-transparent" />
                  </div>

                  <div className="space-y-2 max-w-sm">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#555555] flex items-center">
                      <Globe size={12} className="mr-2 text-[#4BA6B9]" />
                      Resident Country
                    </label>
                    <select className="w-full border-b-2 border-[#F1F5F9] focus:border-[#4BA6B9] py-3 text-sm font-semibold text-[#1A1A1A] outline-none transition-all bg-transparent appearance-none bg-[url('https://www.svgrepo.com/show/511311/chevron-down.svg')] bg-[length:12px_12px] bg-[right_0rem_center] bg-no-repeat">
                       <option value="">Select Region</option>
                       <option>Jordan</option>
                       <option>United Arab Emirates</option>
                       <option>United Kingdom</option>
                       <option>United States</option>
                       <option>Other</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 2: Account Access */}
              <div className="bg-white border border-[#E2E8F0] shadow-sm rounded-xl overflow-hidden">
                <div className="bg-[#FAFBFC] px-10 py-6 border-b border-[#F1F5F9] flex items-center space-x-3 text-[#4BA6B9]">
                  <Lock size={18} />
                  <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#1A1A1A]">Account Credentials</h2>
                </div>

                <div className="p-10 lg:p-12 space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-[#555555] flex items-center">
                         <Mail size={12} className="mr-2 text-[#4BA6B9]" />
                         Official Email
                       </label>
                       <input type="email" placeholder="researcher@university.edu" className="w-full border-b-2 border-[#F1F5F9] focus:border-[#4BA6B9] py-3 text-sm font-semibold text-[#1A1A1A] outline-none transition-all placeholder:text-[#BBBBBB] bg-transparent" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-[#555555]">Scholar ID (Username)</label>
                       <input type="text" placeholder="unique_login_id" className="w-full border-b-2 border-[#F1F5F9] focus:border-[#4BA6B9] py-3 text-sm font-semibold text-[#1A1A1A] outline-none transition-all placeholder:text-[#BBBBBB] bg-transparent" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-[#555555]">Secure Password</label>
                       <input type="password" placeholder="••••••••" className="w-full border-b-2 border-[#F1F5F9] focus:border-[#4BA6B9] py-3 text-sm font-semibold text-[#1A1A1A] outline-none transition-all placeholder:text-[#BBBBBB] bg-transparent" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase tracking-widest text-[#555555]">Verify Password</label>
                       <input type="password" placeholder="••••••••" className="w-full border-b-2 border-[#F1F5F9] focus:border-[#4BA6B9] py-3 text-sm font-semibold text-[#1A1A1A] outline-none transition-all placeholder:text-[#BBBBBB] bg-transparent" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Institutional Consent */}
              <div className="bg-[#0B1F3A] p-10 lg:p-12 rounded-xl text-white space-y-10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#4BA6B9]/10 rounded-full blur-3xl -mr-32 -mt-32" />
                <div className="flex items-center space-x-3 text-[#4BA6B9]">
                  <ShieldCheck size={18} />
                  <h2 className="text-[11px] font-black uppercase tracking-[0.2em] text-white">Institutional Consent</h2>
                </div>

                <div className="space-y-6 relative z-10">
                  <label className="flex items-start space-x-4 cursor-pointer group/check">
                    <input type="checkbox" className="mt-1 w-4 h-4 border-2 border-white/20 rounded-sm text-[#4BA6B9] focus:ring-0 bg-transparent" />
                    <span className="text-[13px] font-medium text-white/70 leading-relaxed group-hover/check:text-white transition-colors">
                      I agree to the <Link href="/policies" className="text-[#4BA6B9] font-bold hover:underline">EISR Privacy Policy</Link> and data collection standards. 
                    </span>
                  </label>

                  <label className="flex items-start space-x-4 cursor-pointer group/check">
                    <input type="checkbox" className="mt-1 w-4 h-4 border-2 border-white/20 rounded-sm text-[#4BA6B9] focus:ring-0 bg-transparent" />
                    <span className="text-[13px] font-medium text-white/70 leading-relaxed group-hover/check:text-white transition-colors">
                      Notify me of new journal publications and scientific research calls.
                    </span>
                  </label>

                  <label className="flex items-start space-x-4 cursor-pointer group/check">
                    <input type="checkbox" className="mt-1 w-4 h-4 border-2 border-white/20 rounded-sm text-[#4BA6B9] focus:ring-0 bg-transparent" />
                    <span className="text-[13px] font-medium text-white/70 leading-relaxed group-hover/check:text-white transition-colors">
                      I am willing to act as a peer reviewer in my specialized domain of expertise.
                    </span>
                  </label>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-10 pt-10 border-t border-[#F1F5F9]">
                <button className="w-full md:w-auto bg-[#1A1A1A] hover:bg-[#4BA6B9] text-white px-16 py-5 font-black text-[11px] uppercase tracking-[0.3em] transition-all shadow-xl hover:shadow-[#4BA6B9]/20 group">
                  Finalize Registration
                </button>
                <Link 
                  href="/login" 
                  className="text-xs font-black text-[#1A1A1A] uppercase tracking-[0.2em] border-b-2 border-transparent hover:border-[#4BA6B9] transition-all"
                >
                  Return to Login
                </Link>
              </div>

            </form>

            <p className="mt-20 text-center text-[10px] font-bold text-[#BBBBBB] italic">
               EISR ensures all submitted research and user data is protected by global institutional security standards.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
