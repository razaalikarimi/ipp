'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { User, Lock, Mail, Globe, Eye, EyeOff, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    givenName: '',
    familyName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!agreedPrivacy) {
      setError('You must agree to the privacy statement.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: `${formData.givenName} ${formData.familyName}`,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      const search = typeof window !== 'undefined' ? window.location.search : '';
      router.push(`/register/complete${search}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Header />

      <main className="flex-grow flex items-center justify-center p-6 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-200 p-8 sm:p-10"
        >
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">Create an account</h1>
            <p className="text-[14px] text-slate-500 mb-6">Join us to get started with your publishing journey</p>
            <div className="text-[13px] text-slate-500">
               Required fields are marked with an asterisk: <span className="text-red-500 font-bold">*</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="overflow-hidden"
              >
                <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-[13px] font-medium flex items-center gap-2">
                  <AlertCircle size={16} className="shrink-0" />
                  <p>{error}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="space-y-4">
              <h2 className="text-[14px] font-bold text-slate-900 uppercase tracking-wider">Profile Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-slate-700">Given Name <span className="text-red-500">*</span></label>
                  <input 
                    type="text" required
                    placeholder="e.g. John"
                    value={formData.givenName}
                    onChange={e => setFormData({ ...formData, givenName: e.target.value })}
                    className="w-full h-13 bg-white border border-slate-300 rounded-lg px-4 text-[15px] text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-[#4BA6B9] focus:ring-[3px] focus:ring-[#4BA6B9]/10 hover:border-slate-400 shadow-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-slate-700">Family Name</label>
                  <input 
                    type="text"
                    placeholder="e.g. Doe"
                    value={formData.familyName}
                    onChange={e => setFormData({ ...formData, familyName: e.target.value })}
                    className="w-full h-13 bg-white border border-slate-300 rounded-lg px-4 text-[15px] text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-[#4BA6B9] focus:ring-[3px] focus:ring-[#4BA6B9]/10 hover:border-slate-400 shadow-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-slate-700">Affiliation <span className="text-red-500">*</span></label>
                  <input 
                    type="text" required
                    placeholder="University or Organization"
                    className="w-full h-13 bg-white border border-slate-300 rounded-lg px-4 text-[15px] text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-[#4BA6B9] focus:ring-[3px] focus:ring-[#4BA6B9]/10 hover:border-slate-400 shadow-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-slate-700">Country <span className="text-red-500">*</span></label>
                  <select 
                    required
                    className="w-full h-13 bg-white border border-slate-300 rounded-lg px-4 text-[15px] text-slate-900 outline-none transition-all focus:border-[#4BA6B9] focus:ring-[3px] focus:ring-[#4BA6B9]/10 hover:border-slate-400 appearance-none shadow-sm"
                    style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2364748B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.8rem center', backgroundSize: '1.2em' }}
                  >
                    <option value="">Select your country</option>
                    <option value="IN">India</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="my-6 border-t border-slate-100"></div>

            <div className="space-y-4">
              <h2 className="text-[14px] font-bold text-slate-900 uppercase tracking-wider">Login Credentials</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-slate-700">Email Address <span className="text-red-500">*</span></label>
                  <input 
                    type="email" required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full h-13 bg-white border border-slate-300 rounded-lg px-4 text-[15px] text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-[#4BA6B9] focus:ring-[3px] focus:ring-[#4BA6B9]/10 hover:border-slate-400 shadow-sm"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-slate-700">Username <span className="text-red-500">*</span></label>
                  <input 
                    type="text" required
                    placeholder="Choose a username"
                    value={formData.username}
                    onChange={e => setFormData({ ...formData, username: e.target.value })}
                    className="w-full h-13 bg-white border border-slate-300 rounded-lg px-4 text-[15px] text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-[#4BA6B9] focus:ring-[3px] focus:ring-[#4BA6B9]/10 hover:border-slate-400 shadow-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-slate-700">Password <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input 
                      type={showPassword ? 'text' : 'password'} required
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={e => setFormData({ ...formData, password: e.target.value })}
                      className="w-full h-13 bg-white border border-slate-300 rounded-lg pl-4 pr-11 text-[15px] text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-[#4BA6B9] focus:ring-[3px] focus:ring-[#4BA6B9]/10 hover:border-slate-400 shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#4BA6B9] transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-slate-700">Confirm Password <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <input 
                      type={showPassword ? 'text' : 'password'} required
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full h-13 bg-white border border-slate-300 rounded-lg pl-4 pr-11 text-[15px] text-slate-900 placeholder-slate-400 outline-none transition-all focus:border-[#4BA6B9] focus:ring-[3px] focus:ring-[#4BA6B9]/10 hover:border-slate-400 shadow-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="my-6 border-t border-slate-100"></div>

            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <input 
                  id="agreedPrivacy" type="checkbox" required checked={agreedPrivacy} 
                  onChange={e => setAgreedPrivacy(e.target.checked)}
                  className="mt-[3px] w-4 h-4 rounded-[4px] border-slate-300 text-[#4BA6B9] focus:ring-[#4BA6B9] focus:ring-offset-0 cursor-pointer shrink-0 transition-colors" 
                />
                <label htmlFor="agreedPrivacy" className="text-[13px] text-slate-600 leading-tight cursor-pointer">
                  I agree to have my data collected and stored according to the <Link href="/privacy" className="text-[#4BA6B9] hover:underline font-semibold">privacy statement</Link>. <span className="text-red-500">*</span>
                </label>
              </div>

              <div className="flex items-start gap-2.5">
                <input 
                  id="agreedNotify" type="checkbox" 
                  className="mt-[3px] w-4 h-4 rounded-[4px] border-slate-300 text-[#4BA6B9] focus:ring-[#4BA6B9] focus:ring-offset-0 cursor-pointer shrink-0 transition-colors" 
                />
                <label htmlFor="agreedNotify" className="text-[13px] text-slate-600 leading-tight cursor-pointer">
                  Yes, I would like to be notified of new publications and announcements.
                </label>
              </div>

              <div className="flex items-start gap-2.5">
                <input 
                  id="agreedReview" type="checkbox" 
                  className="mt-[3px] w-4 h-4 rounded-[4px] border-slate-300 text-[#4BA6B9] focus:ring-[#4BA6B9] focus:ring-offset-0 cursor-pointer shrink-0 transition-colors" 
                />
                <label htmlFor="agreedReview" className="text-[13px] text-slate-600 leading-tight cursor-pointer">
                  Yes, I would like to be contacted with requests to review submissions to this journal.
                </label>
              </div>
            </div>

            <div className="pt-2 flex flex-col md:flex-row items-center gap-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto md:flex-1 h-13 bg-[#0B1F3A] hover:opacity-90 text-white rounded-lg font-bold text-base transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center shadow-lg shadow-slate-200"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  'Create Account'
                )}
              </button>
            </div>
            
            <div className="pt-6 border-t border-slate-100 text-center">
              <p className="text-[13px] text-slate-500">
                Already have an account?{' '}
                <Link href="/login" className="font-semibold text-slate-900 hover:text-[#4BA6B9] transition-colors">
                  Sign in here
                </Link>
              </p>
            </div>
          </form>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
