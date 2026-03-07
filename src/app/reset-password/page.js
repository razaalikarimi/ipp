'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Lock, Eye, EyeOff, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

function ResetForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error'
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setStatus('error');
      setMessage('Passwords do not match.');
      return;
    }
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      setStatus(data.success ? 'success' : 'error');
      setMessage(data.message);
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="bg-red-50 border border-red-100 p-6 rounded-2xl text-center space-y-4">
        <AlertCircle size={32} className="text-red-400 mx-auto" />
        <p className="text-red-600 font-bold">Invalid reset link.</p>
        <Link href="/forgot-password" className="text-[#4BA6B9] font-bold text-sm underline">
          Request a new one
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4">
            <div className="bg-green-50 border border-green-100 p-5 rounded-2xl flex items-start gap-3">
              <CheckCircle size={20} className="text-green-500 shrink-0 mt-0.5" />
              <p className="text-green-700 text-[13px] font-semibold">{message}</p>
            </div>
            <Link
              href="/login"
              className="flex items-center justify-center gap-2 w-full h-14 bg-[#4BA6B9] hover:bg-[#1A1A1A] text-white rounded-2xl font-black text-[15px] transition-all duration-300"
            >
              Go to Login <ArrowRight size={18} />
            </Link>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={handleSubmit} className="space-y-5">
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3"
              >
                <AlertCircle size={18} className="text-red-500 shrink-0" />
                <p className="text-red-600 text-[13px] font-bold">{message}</p>
              </motion.div>
            )}

            {/* New Password */}
            <div className="space-y-2 group">
              <label className="text-[13px] font-black text-[#1A1A1A] uppercase tracking-wider">New Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#CCCCCC] group-focus-within:text-[#4BA6B9] transition-colors" size={18} />
                <input
                  type={showPass ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full h-14 bg-[#F8F9FA] border border-[#F1F1F1] rounded-2xl pl-12 pr-12 text-[14px] font-bold text-[#1A1A1A] outline-none transition-all focus:border-[#4BA6B9] focus:bg-white focus:ring-4 focus:ring-[#4BA6B9]/5"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#CCCCCC] hover:text-[#1A1A1A]">
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2 group">
              <label className="text-[13px] font-black text-[#1A1A1A] uppercase tracking-wider">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#CCCCCC] group-focus-within:text-[#4BA6B9] transition-colors" size={18} />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  required
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  placeholder="Re-enter your new password"
                  className="w-full h-14 bg-[#F8F9FA] border border-[#F1F1F1] rounded-2xl pl-12 pr-12 text-[14px] font-bold text-[#1A1A1A] outline-none transition-all focus:border-[#4BA6B9] focus:bg-white focus:ring-4 focus:ring-[#4BA6B9]/5"
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#CCCCCC] hover:text-[#1A1A1A]">
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {confirm && password !== confirm && (
                <p className="text-red-500 text-[12px] font-bold">Passwords do not match</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || (confirm && password !== confirm)}
              className="w-full h-14 bg-[#1A1A1A] hover:bg-[#4BA6B9] text-white rounded-2xl font-black text-[15px] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <><span>SET NEW PASSWORD</span><ArrowRight size={18} /></>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] font-sans selection:bg-[#4BA6B9]/10">
      <Header />

      <main className="flex-grow flex items-center justify-center py-20 px-6 relative overflow-hidden">
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
            <div className="space-y-2 text-center">
              <div className="w-16 h-16 bg-[#4BA6B9]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Lock size={28} className="text-[#4BA6B9]" />
              </div>
              <h1 className="text-2xl font-bold text-[#1A1A1A] tracking-tight">Set New Password</h1>
              <p className="text-[#555555] text-[14px] font-semibold">
                Choose a strong password for your account.
              </p>
            </div>

            <Suspense fallback={<div className="text-center text-[#999] text-sm">Loading...</div>}>
              <ResetForm />
            </Suspense>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
