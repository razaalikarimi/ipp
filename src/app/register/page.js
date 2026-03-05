'use client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { User, Mail, Lock, Globe, Building2, ShieldCheck, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({ fullName: '', username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      alert('Registration successful! Please login.');
      router.push('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBFC] font-sans selection:bg-[#4BA6B9]/10">
      <Header />
      
      <main className="flex-grow pt-24 pb-32 px-6">
        <div className="max-w-[800px] mx-auto">
          
          <div className="mb-16 border-l-4 border-[#4BA6B9] pl-8">
            <h1 className="text-5xl font-bold text-[#1A1A1A] tracking-tight leading-tight mb-4">
               Register
            </h1>
            <p className="text-[14px] font-black text-[#1A1A1A] max-w-md">
               Create your account to start submitting and reviewing articles.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 px-6 py-4 rounded-xl mb-10 text-[13px] font-bold flex items-center gap-3">
               <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></div>
               {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Section 1: Identity */}
            <div className="bg-white border border-[#E2E8F0] shadow-sm rounded-2xl overflow-hidden">
               <div className="bg-[#F8F9FA] px-10 py-5 border-b border-[#F1F5F9] flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-[#4BA6B9]">
                     <User size={18} />
                     <h2 className="text-[12px] font-bold text-[#1A1A1A]">Your Information</h2>
                  </div>
               </div>
               
               <div className="p-10 lg:p-12 space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     <div className="space-y-3">
                        <label className="text-[12px] font-bold text-[#1A1A1A] ml-1">First Name</label>
                        <input 
                           type="text" 
                           placeholder="Enter first name" 
                           required
                           value={formData.fullName}
                           onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                           className="w-full bg-[#F8F9FA] border border-[#EEEEEE] focus:border-[#4BA6B9] focus:bg-white px-5 py-4 rounded-xl text-sm font-bold text-[#1A1A1A] outline-none transition-all placeholder:text-[#888888]" 
                        />
                     </div>
                     <div className="space-y-3">
                        <label className="text-[12px] font-bold text-[#1A1A1A] ml-1">Last Name</label>
                        <input 
                           type="text" 
                           placeholder="Enter last name" 
                           className="w-full bg-[#F8F9FA] border border-[#EEEEEE] focus:border-[#4BA6B9] focus:bg-white px-5 py-4 rounded-xl text-sm font-bold text-[#1A1A1A] outline-none transition-all placeholder:text-[#888888]" 
                        />
                     </div>
                  </div>

                  <div className="space-y-3">
                     <label className="text-[12px] font-bold text-[#1A1A1A] ml-1 flex items-center gap-2">
                        <Building2 size={12} className="text-[#4BA6B9]" />
                        University or Institution
                     </label>
                     <input 
                        type="text" 
                        placeholder="Your university or organization name" 
                        className="w-full bg-[#F8F9FA] border border-[#EEEEEE] focus:border-[#4BA6B9] focus:bg-white px-5 py-4 rounded-xl text-sm font-bold text-[#1A1A1A] outline-none transition-all placeholder:text-[#888888]" 
                     />
                  </div>
               </div>
            </div>

            {/* Section 2: Access & Credentials */}
            <div className="bg-white border border-[#E2E8F0] shadow-sm rounded-2xl overflow-hidden">
               <div className="bg-[#F8F9FA] px-10 py-5 border-b border-[#F1F5F9] flex items-center space-x-3 text-[#4BA6B9]">
                  <Lock size={18} />
                  <h2 className="text-[12px] font-bold text-[#1A1A1A]">Account Details</h2>
               </div>

               <div className="p-10 lg:p-12 space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     <div className="space-y-3">
                        <label className="text-[12px] font-bold text-[#555555] ml-1 flex items-center gap-2">
                           <Mail size={12} className="text-[#4BA6B9]" />
                           Email Address
                        </label>
                        <input 
                           type="email" 
                           required
                           placeholder="research@institute.com"
                           value={formData.email}
                           onChange={(e) => setFormData({...formData, email: e.target.value})}
                           className="w-full bg-[#F8F9FA] border border-[#EEEEEE] focus:border-[#4BA6B9] focus:bg-white px-5 py-4 rounded-xl text-sm font-semibold text-[#1A1A1A] outline-none transition-all placeholder:text-[#BBBBBB]" 
                        />
                     </div>
                     <div className="space-y-3">
                        <label className="text-[12px] font-bold text-[#1A1A1A] ml-1">Username</label>
                        <input 
                           type="text" 
                           required
                           placeholder="Choose a username"
                           value={formData.username}
                           onChange={(e) => setFormData({...formData, username: e.target.value})}
                           className="w-full bg-[#F8F9FA] border border-[#EEEEEE] focus:border-[#4BA6B9] focus:bg-white px-5 py-4 rounded-xl text-sm font-bold text-[#1A1A1A] outline-none transition-all placeholder:text-[#888888]" 
                        />
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     <div className="space-y-3">
                        <label className="text-[12px] font-bold text-[#1A1A1A] ml-1">Password</label>
                        <input 
                           type="password" 
                           required
                           placeholder="••••••••"
                           value={formData.password}
                           onChange={(e) => setFormData({...formData, password: e.target.value})}
                           className="w-full bg-[#F8F9FA] border border-[#EEEEEE] focus:border-[#4BA6B9] focus:bg-white px-5 py-4 rounded-xl text-sm font-bold text-[#1A1A1A] outline-none transition-all placeholder:text-[#888888]" 
                        />
                     </div>
                     <div className="space-y-3">
                        <label className="text-[12px] font-bold text-[#555555] ml-1">Verify Password</label>
                         <input 
                           type="password" 
                           required
                           placeholder="••••••••"
                           className="w-full bg-[#F8F9FA] border border-[#EEEEEE] focus:border-[#4BA6B9] focus:bg-white px-5 py-4 rounded-xl text-sm font-semibold text-[#1A1A1A] outline-none transition-all placeholder:text-[#BBBBBB]" 
                        />
                     </div>
                  </div>
               </div>
            </div>

            {/* Section 3: Authorization */}
            <div className="bg-[#0B1F3A] p-10 lg:p-12 rounded-3xl text-white space-y-8 relative overflow-hidden group shadow-2xl">
               <div className="absolute top-0 right-0 w-64 h-64 bg-[#4BA6B9]/10 rounded-full blur-3xl -mr-32 -mt-32" />
               <div className="flex items-center space-x-3 text-[#4BA6B9]">
                  <ShieldCheck size={18} />
                  <h2 className="text-[12px] font-bold text-white">Terms & Consent</h2>
               </div>

               <div className="space-y-5 relative z-10">
                  <label className="flex items-start space-x-4 cursor-pointer group/check">
                     <input type="checkbox" required className="mt-1 w-5 h-5 border-2 border-white/20 rounded text-[#4BA6B9] focus:ring-0 bg-transparent cursor-pointer" />
                     <span className="text-[13px] font-bold text-white leading-relaxed group-hover/check:text-[#4BA6B9] transition-colors">
                        I agree to the EISR <span className="underline">Privacy Policy</span> and data standards.
                     </span>
                  </label>
                  <label className="flex items-start space-x-4 cursor-pointer group/check">
                     <input type="checkbox" className="mt-1 w-5 h-5 border-2 border-white/20 rounded text-[#4BA6B9] focus:ring-0 bg-transparent cursor-pointer" />
                     <span className="text-[13px] font-bold text-white leading-relaxed group-hover/check:text-[#4BA6B9] transition-colors">
                        I want to be a peer reviewer for my area of expertise.
                     </span>
                  </label>
               </div>
            </div>

            {/* Final Submission */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-10 pt-10 border-t border-[#F1F5F9]">
               <button 
                  type="submit" 
                  disabled={loading} 
                  className="w-full md:w-auto bg-[#1A1A1A] hover:bg-[#4BA6B9] text-white px-16 py-5 rounded-2xl font-bold text-[12px] transition-all shadow-xl hover:shadow-[#4BA6B9]/20 group disabled:opacity-50"
               >
                  {loading ? 'Processing...' : 'Create Account'}
               </button>
                <Link 
                   href="/login" 
                   className="inline-flex items-center text-[12px] font-bold text-[#4BA6B9] group gap-2"
                >
                   Already have an account? Sign In
                   <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
          </form>

          <footer className="mt-24 text-center">
             <p className="text-[11px] font-bold text-[#1A1A1A]">
                Verified Secure Researcher Enrollment Portal
             </p>
          </footer>
        </div>
      </main>

      <Footer />
    </div>
  );
}
