'use client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { User, Lock, Mail, ChevronRight, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Normally you would store the JWT token here (e.g., localStorage or cookies)
      localStorage.setItem('eisr_token', data.token);

      alert('Login successful!');
      router.push('/'); // Redirecting to home after login
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFBFC] font-sans selection:bg-[#4BA6B9]/10">
      <Header />
      
      <main className="flex-grow pt-24 pb-24 px-6 flex items-center justify-center">
        <div className="max-w-[480px] w-full mx-auto">
          {/* Subtle Branding Accent */}
          <div className="flex justify-center mb-8">
             <div className="h-1.5 w-16 bg-[#4BA6B9] rounded-full opacity-40"></div>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#1A1A1A] tracking-tight mb-3">
               Login
            </h1>
            <p className="text-[14px] font-bold text-[#1A1A1A]">
               Sign in to manage your articles and account
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 px-6 py-4 rounded-xl mb-8 text-[13px] font-bold flex items-center gap-3">
               <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></div>
               {error}
            </div>
          )}

          <div className="bg-white border border-[#E2E8F0] shadow-2xl rounded-3xl overflow-hidden">
            <form onSubmit={handleSubmit} className="p-10 lg:p-12 space-y-8">
              {/* Email/Username Field */}
              <div className="space-y-3">
                <label className="text-[12px] font-bold text-[#1A1A1A] ml-1">
                   Email or Username
                </label>
                <div className="relative group">
                   <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#BBBBBB] group-focus-within:text-[#4BA6B9] transition-colors">
                      <Mail size={18} strokeWidth={1.5} />
                   </div>
                   <input 
                      type="text" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="Email or Username"
                      className="w-full bg-[#F8F9FA] border border-[#EEEEEE] focus:border-[#4BA6B9] focus:bg-white pl-12 pr-5 py-5 rounded-2xl text-sm font-bold text-[#1A1A1A] outline-none transition-all placeholder:text-[#888888]"
                   />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-3">
                <label className="text-[12px] font-bold text-[#1A1A1A] ml-1">
                   Password
                </label>
                <div className="relative group">
                   <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#BBBBBB] group-focus-within:text-[#4BA6B9] transition-colors">
                      <Lock size={18} strokeWidth={1.5} />
                   </div>
                   <input 
                      type="password" 
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      placeholder="••••••••"
                      className="w-full bg-[#F8F9FA] border border-[#EEEEEE] focus:border-[#4BA6B9] focus:bg-white pl-12 pr-5 py-5 rounded-2xl text-sm font-bold text-[#1A1A1A] outline-none transition-all placeholder:text-[#888888]"
                   />
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center pt-2">
                <label className="flex items-center space-x-3 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input type="checkbox" className="peer appearance-none w-5 h-5 border border-[#E2E8F0] rounded-md checked:bg-[#4BA6B9] checked:border-[#4BA6B9] transition-all cursor-pointer" />
                    <CheckCircle2 size={12} className="absolute left-1 text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-[12px] font-bold text-[#1A1A1A] group-hover:text-[#4BA6B9] transition-colors tracking-tight">Remember me on this device</span>
                </label>
              </div>

              {/* Action Button */}
              <button 
                type="submit" 
                disabled={loading} 
                className="w-full bg-[#0B1F3A] hover:bg-[#4BA6B9] text-white py-5 rounded-xl font-bold text-[13px] transition-all shadow-xl hover:shadow-[#4BA6B9]/20 group disabled:opacity-50"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div className="text-center pt-8 border-t border-[#F1F5F9] mt-auto pb-8">
            <p className="text-[13px] font-bold text-[#1A1A1A] mb-4">
               New to EISR Research Center?
            </p>
            <Link 
               href="/register" 
               className="inline-flex items-center gap-2 text-[#4BA6B9] font-bold text-[13px] hover:translate-x-1 transition-all group"
            >
               Register Researcher ID <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          </div>

          {/* Institutional Support */}
          <div className="mt-12 text-center space-y-4 max-w-md">
           <div className="flex items-center justify-center space-x-4">
              <div className="h-px w-12 bg-[#E2E8F0]"></div>
              <span className="text-[11px] font-bold text-[#1A1A1A]">Institutional Support</span>
              <div className="h-px w-12 bg-[#E2E8F0]"></div>
           </div>
           <p className="text-[11px] font-bold text-[#1A1A1A] leading-relaxed">
              For assistance or recovery, contact the <br />
              <button className="text-[#4BA6B9] hover:underline font-bold">Global Editorial Office</button>
           </p>
        </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
