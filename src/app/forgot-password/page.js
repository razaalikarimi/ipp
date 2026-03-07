'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Mail, ArrowRight, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error'
  const [message, setMessage] = useState('');
  const [devLink, setDevLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    setDevLink('');

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setMessage(data.message);
        if (data.devLink) setDevLink(data.devLink);
      } else {
        setStatus('error');
        setMessage(data.message || 'Something went wrong.');
      }
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] font-sans selection:bg-[#4BA6B9]/10">
      <Header />

      <main className="flex-grow flex items-center justify-center py-20 px-6 relative overflow-hidden">
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-[10%] -right-[5%] w-[40%] h-[40%] bg-[#4BA6B9]/5 rounded-full blur-[120px]" />
          <div className="absolute -bottom-[10%] -left-[5%] w-[30%] h-[30%] bg-[#6366f1]/5 rounded-full blur-[100px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full max-w-[520px] bg-white rounded-[32px] shadow-2xl overflow-hidden border border-[#F1F1F1] relative z-10"
        >
          <div className="p-12 lg:p-14 space-y-8">

            {/* Header */}
            <div className="space-y-2 text-center">
              <div className="w-16 h-16 bg-[#4BA6B9]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Mail size={28} className="text-[#4BA6B9]" />
              </div>
              <h1 className="text-2xl font-bold text-[#1A1A1A] tracking-tight">Forgot Password?</h1>
              <p className="text-[#555555] text-[14px] font-semibold">
                Enter your email and we'll send you a reset link.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {/* Success state */}
              {status === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4"
                >
                  <div className="bg-green-50 border border-green-100 p-5 rounded-2xl flex items-start gap-3">
                    <CheckCircle size={20} className="text-green-500 shrink-0 mt-0.5" />
                    <p className="text-green-700 text-[13px] font-semibold">{message}</p>
                  </div>

                  {/* Dev mode: show link directly */}
                  {devLink && (
                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl space-y-2">
                      <p className="text-amber-700 text-[11px] font-black uppercase tracking-wider">
                        ⚙️ Dev Mode — No SMTP configured
                      </p>
                      <p className="text-amber-700 text-[11px] font-semibold break-all">
                        Reset link (click to test):
                      </p>
                      <a
                        href={devLink}
                        className="block text-[#4BA6B9] text-[12px] font-bold underline break-all hover:text-[#005f96]"
                      >
                        {devLink}
                      </a>
                    </div>
                  )}

                  <Link
                    href="/login"
                    className="flex items-center justify-center gap-2 w-full h-12 bg-[#1A1A1A] hover:bg-[#4BA6B9] text-white rounded-2xl font-black text-[14px] transition-all duration-300"
                  >
                    <ArrowLeft size={16} /> Back to Login
                  </Link>
                </motion.div>
              )}

              {/* Error state */}
              {status === 'error' && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3"
                >
                  <AlertCircle size={18} className="text-red-500 shrink-0" />
                  <p className="text-red-600 text-[13px] font-bold">{message}</p>
                </motion.div>
              )}

              {/* Form */}
              {status !== 'success' && (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2 group">
                    <label className="text-[13px] font-black text-[#1A1A1A] uppercase tracking-wider">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#CCCCCC] group-focus-within:text-[#4BA6B9] transition-colors" size={18} />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter your registered email"
                        className="w-full h-14 bg-[#F8F9FA] border border-[#F1F1F1] rounded-2xl pl-12 pr-4 text-[14px] font-bold text-[#1A1A1A] outline-none transition-all focus:border-[#4BA6B9] focus:bg-white focus:ring-4 focus:ring-[#4BA6B9]/5"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 bg-[#1A1A1A] hover:bg-[#4BA6B9] text-white rounded-2xl font-black text-[15px] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <><span>SEND RESET LINK</span><ArrowRight size={18} /></>
                    )}
                  </button>

                  <div className="text-center">
                    <Link
                      href="/login"
                      className="inline-flex items-center gap-1.5 text-[13px] font-bold text-[#555555] hover:text-[#4BA6B9] transition-colors"
                    >
                      <ArrowLeft size={14} /> Back to Login
                    </Link>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
