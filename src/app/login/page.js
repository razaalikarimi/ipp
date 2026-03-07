'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowRight, UserCheck } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
      if (!res.ok) throw new Error(data.message || 'Login failed');
      localStorage.setItem('eisr_token', data.token);
      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] font-sans selection:bg-[#4BA6B9]/10">
      <Header />

      <main className="flex-grow flex items-center justify-center py-20 px-6 relative overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
            <div className="absolute -top-[10%] -right-[5%] w-[40%] h-[40%] bg-[#4BA6B9]/5 rounded-full blur-[120px]" />
            <div className="absolute -bottom-[10%] -left-[5%] w-[30%] h-[30%] bg-[#6366f1]/5 rounded-full blur-[100px]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-[540px] bg-white rounded-[32px] shadow-2xl overflow-hidden border border-[#F1F1F1] relative z-10"
        >
          {/* Main: Login Form */}
          <div className="p-12 lg:p-16">
            <div className="space-y-10">
              <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold text-[#1A1A1A] tracking-tight">Sign In</h1>
                <p className="text-[#555555] text-[15px] font-semibold">
                  Manage your submissions and editorial tasks
                </p>
              </div>

              <AnimatePresence mode="wait">
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3"
                  >
                    <div className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                    <p className="text-red-600 text-[13px] font-bold">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-5">
                  <div className="space-y-2 group">
                    <label className="text-[13px] font-black text-[#1A1A1A] uppercase tracking-wider">
                      Email address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#CCCCCC] group-focus-within:text-[#4BA6B9] transition-colors" size={18} />
                      <input 
                        type="text"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Enter your email"
                        className="w-full h-14 bg-[#F8F9FA] border border-[#F1F1F1] rounded-2xl pl-12 pr-4 text-[14px] font-bold text-[#1A1A1A] outline-none transition-all focus:border-[#4BA6B9] focus:bg-white focus:ring-4 focus:ring-[#4BA6B9]/5"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 group">
                    <div className="flex justify-between items-center">
                      <label className="text-[13px] font-black text-[#1A1A1A] uppercase tracking-wider">
                        Password
                      </label>
                      <Link href="/forgot-password" className="text-[12px] font-black text-[#4BA6B9] hover:text-[#1A1A1A] transition-colors tracking-tighter">
                        FORGOT PASSWORD?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#CCCCCC] group-focus-within:text-[#4BA6B9] transition-colors" size={18} />
                      <input 
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={formData.password}
                        onChange={e => setFormData({ ...formData, password: e.target.value })}
                        placeholder="••••••••"
                        className="w-full h-14 bg-[#F8F9FA] border border-[#F1F1F1] rounded-2xl pl-12 pr-12 text-[14px] font-bold text-[#1A1A1A] outline-none transition-all focus:border-[#4BA6B9] focus:bg-white focus:ring-4 focus:ring-[#4BA6B9]/5"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#CCCCCC] hover:text-[#1A1A1A] transition-colors"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 py-2">
                  <input id="remember-me" type="checkbox" className="w-5 h-5 rounded-lg border-[#F1F1F1] text-[#4BA6B9] focus:ring-[#4BA6B9] cursor-pointer" />
                  <label htmlFor="remember-me" className="text-[13px] font-bold text-[#555555] cursor-pointer hover:text-[#1A1A1A] transition-colors">
                    Keep me logged in
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 bg-[#1A1A1A] hover:bg-[#4BA6B9] text-white rounded-2xl font-black text-[15px] transition-all duration-300 shadow-xl shadow-[#1A1A1A]/5 hover:shadow-[#4BA6B9]/20 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>SIGN IN</span>
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>

                <div className="pt-8 text-center">
                   <p className="text-[14px] font-bold text-[#555555]">
                    Don't have an account?{' '}
                    <Link href="/register" className="text-[#4BA6B9] hover:text-[#1A1A1A] underline transition-colors decoration-2 underline-offset-4">
                      Register Now
                    </Link>
                   </p>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
