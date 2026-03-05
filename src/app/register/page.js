'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, User, Globe, MapPin, BadgeCheck, FileText, ArrowRight, Fingerprint } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    givenName: '',
    familyName: '',
    affiliation: '',
    country: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    mailingAddress: '',
    orcid: '',
    bio: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreedPrivacy, setAgreedPrivacy] = useState(false);
  const [wantReviewer, setWantReviewer] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
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
      router.push('/register/complete');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const countries = [
    'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Australia', 'Austria',
    'Bangladesh', 'Belgium', 'Brazil', 'Canada', 'China', 'Colombia', 'Croatia',
    'Czech Republic', 'Denmark', 'Egypt', 'Ethiopia', 'Finland', 'France',
    'Germany', 'Ghana', 'Greece', 'Hungary', 'India', 'Indonesia', 'Iran',
    'Iraq', 'Ireland', 'Israel', 'Italy', 'Japan', 'Jordan', 'Kenya',
    'Malaysia', 'Mexico', 'Morocco', 'Netherlands', 'New Zealand', 'Nigeria',
    'Norway', 'Pakistan', 'Peru', 'Philippines', 'Poland', 'Portugal',
    'Romania', 'Russia', 'Saudi Arabia', 'South Africa', 'South Korea',
    'Spain', 'Sri Lanka', 'Sweden', 'Switzerland', 'Thailand', 'Turkey',
    'UAE', 'Ukraine', 'United Kingdom', 'United States', 'Vietnam',
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA] font-sans selection:bg-[#4BA6B9]/10">
      <Header />

      <main className="flex-grow py-20 px-6 relative overflow-hidden flex items-center justify-center">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
            <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-[#4BA6B9]/5 rounded-full blur-[120px]" />
            <div className="absolute -bottom-[10%] -right-[5%] w-[30%] h-[30%] bg-[#6366f1]/5 rounded-full blur-[100px]" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full max-w-[900px] bg-white rounded-[40px] shadow-2xl overflow-hidden border border-[#F1F1F1] relative z-10"
        >
          <div className="p-8 lg:p-16">
            <div className="max-w-[700px] mx-auto space-y-12">
              
              {/* Header */}
              <div className="text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#4BA6B9]/10 rounded-full mb-2">
                   <BadgeCheck className="text-[#4BA6B9]" size={14} />
                   <span className="text-[11px] font-black uppercase tracking-widest text-[#4BA6B9]">Researcher Enrollment</span>
                </div>
                <h1 className="text-4xl font-bold text-[#1A1A1A] tracking-tight">Create Account</h1>
                <p className="text-[#555555] text-[15px] font-semibold">
                  Join the global community of scholarly excellence
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

              <form onSubmit={handleSubmit} className="space-y-12">
                
                {/* Section 1: Identity */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#4BA6B9]/10 flex items-center justify-center text-[#4BA6B9]">
                      <User size={16} />
                    </div>
                    <h3 className="text-[15px] font-black text-[#1A1A1A] uppercase tracking-wider">Personal Identity</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 group">
                      <label className="text-[12px] font-black text-[#1A1A1A]/60 uppercase tracking-widest pl-1">Given Name *</label>
                      <input 
                        type="text" required value={formData.givenName}
                        onChange={e => setFormData({ ...formData, givenName: e.target.value })}
                        placeholder="e.g. Abdullah"
                        className="w-full h-14 bg-[#F8F9FA] border border-[#F1F1F1] rounded-2xl px-5 text-[14px] font-bold text-[#1A1A1A] outline-none transition-all focus:border-[#4BA6B9] focus:bg-white focus:ring-4 focus:ring-[#4BA6B9]/5"
                      />
                    </div>
                    <div className="space-y-2 group">
                      <label className="text-[12px] font-black text-[#1A1A1A]/60 uppercase tracking-widest pl-1">Family Name *</label>
                      <input 
                        type="text" required value={formData.familyName}
                        onChange={e => setFormData({ ...formData, familyName: e.target.value })}
                        placeholder="e.g. Alessa"
                        className="w-full h-14 bg-[#F8F9FA] border border-[#F1F1F1] rounded-2xl px-5 text-[14px] font-bold text-[#1A1A1A] outline-none transition-all focus:border-[#4BA6B9] focus:bg-white focus:ring-4 focus:ring-[#4BA6B9]/5"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Affiliation */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#6366f1]/10 flex items-center justify-center text-[#6366f1]">
                      <Globe size={16} />
                    </div>
                    <h3 className="text-[15px] font-black text-[#1A1A1A] uppercase tracking-wider">Global Affiliation</h3>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2 group">
                      <label className="text-[12px] font-black text-[#1A1A1A]/60 uppercase tracking-widest pl-1">Institution/University</label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#CCCCCC]" size={18} />
                        <input 
                          type="text" value={formData.affiliation}
                          onChange={e => setFormData({ ...formData, affiliation: e.target.value })}
                          placeholder="Search for your institution"
                          className="w-full h-14 bg-[#F8F9FA] border border-[#F1F1F1] rounded-2xl pl-12 pr-4 text-[14px] font-bold text-[#1A1A1A] outline-none transition-all focus:border-[#4BA6B9] focus:bg-white focus:ring-4 focus:ring-[#4BA6B9]/5"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 group">
                      <label className="text-[12px] font-black text-[#1A1A1A]/60 uppercase tracking-widest pl-1">Country *</label>
                      <select 
                        required value={formData.country}
                        onChange={e => setFormData({ ...formData, country: e.target.value })}
                        className="w-full h-14 bg-[#F8F9FA] border border-[#F1F1F1] rounded-2xl px-5 text-[14px] font-bold text-[#1A1A1A] outline-none transition-all focus:border-[#4BA6B9] focus:bg-white focus:ring-4 focus:ring-[#4BA6B9]/5 appearance-none cursor-pointer"
                      >
                        <option value="">Select your country</option>
                        {countries.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section 3: Credentials */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-500">
                      <Fingerprint size={16} />
                    </div>
                    <h3 className="text-[15px] font-black text-[#1A1A1A] uppercase tracking-wider">Login Credentials</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 group md:col-span-2">
                       <label className="text-[12px] font-black text-[#1A1A1A]/60 uppercase tracking-widest pl-1">Work Email *</label>
                       <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#CCCCCC]" size={18} />
                        <input 
                          type="email" required value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          placeholder="researcher@university.edu"
                          className="w-full h-14 bg-[#F8F9FA] border border-[#F1F1F1] rounded-2xl pl-12 pr-4 text-[14px] font-bold text-[#1A1A1A] outline-none transition-all focus:border-[#4BA6B9] focus:bg-white focus:ring-4 focus:ring-[#4BA6B9]/5"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 group">
                      <label className="text-[12px] font-black text-[#1A1A1A]/60 uppercase tracking-widest pl-1">Username *</label>
                      <input 
                        type="text" required value={formData.username}
                        onChange={e => setFormData({ ...formData, username: e.target.value })}
                        placeholder="Choose unique username"
                        className="w-full h-14 bg-[#F8F9FA] border border-[#F1F1F1] rounded-2xl px-5 text-[14px] font-bold text-[#1A1A1A] outline-none transition-all focus:border-[#4BA6B9] focus:bg-white focus:ring-4 focus:ring-[#4BA6B9]/5"
                      />
                    </div>

                    <div className="space-y-2 group">
                      <label className="text-[12px] font-black text-[#1A1A1A]/60 uppercase tracking-widest pl-1">ORCiD iD (Optional)</label>
                      <input 
                        type="text" value={formData.orcid}
                        onChange={e => setFormData({ ...formData, orcid: e.target.value })}
                        placeholder="0000-0000-0000-0000"
                        className="w-full h-14 bg-[#F8F9FA] border border-[#F1F1F1] rounded-2xl px-5 text-[14px] font-bold text-[#1A1A1A] outline-none transition-all focus:border-[#4BA6B9] focus:bg-white focus:ring-4 focus:ring-[#4BA6B9]/5"
                      />
                    </div>

                    <div className="space-y-2 group">
                      <label className="text-[12px] font-black text-[#1A1A1A]/60 uppercase tracking-widest pl-1">Password *</label>
                      <div className="relative">
                        <input 
                          type={showPassword ? 'text' : 'password'} required value={formData.password}
                          onChange={e => setFormData({ ...formData, password: e.target.value })}
                          placeholder="••••••••"
                          className="w-full h-14 bg-[#F8F9FA] border border-[#F1F1F1] rounded-2xl px-5 pr-12 text-[14px] font-bold text-[#1A1A1A] outline-none transition-all focus:border-[#4BA6B9] focus:bg-white focus:ring-4 focus:ring-[#4BA6B9]/5"
                        />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#CCCCCC] hover:text-[#1A1A1A]">
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2 group">
                      <label className="text-[12px] font-black text-[#1A1A1A]/60 uppercase tracking-widest pl-1">Confirm Password *</label>
                      <div className="relative">
                        <input 
                          type={showConfirm ? 'text' : 'password'} required value={formData.confirmPassword}
                          onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                          placeholder="••••••••"
                          className="w-full h-14 bg-[#F8F9FA] border border-[#F1F1F1] rounded-2xl px-5 pr-12 text-[14px] font-bold text-[#1A1A1A] outline-none transition-all focus:border-[#4BA6B9] focus:bg-white focus:ring-4 focus:ring-[#4BA6B9]/5"
                        />
                        <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#CCCCCC] hover:text-[#1A1A1A]">
                          {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 4: Bio & Consent */}
                <div className="space-y-8 pt-6 border-t border-[#F1F1F1]">
                  <div className="space-y-2 group">
                    <label className="text-[12px] font-black text-[#1A1A1A]/60 uppercase tracking-widest pl-1">Brief Biography Statement</label>
                    <textarea 
                      rows={4} value={formData.bio}
                      onChange={e => setFormData({ ...formData, bio: e.target.value })}
                      placeholder="Share your research focus or scholarly background..."
                      className="w-full bg-[#F8F9FA] border border-[#F1F1F1] rounded-2xl p-5 text-[14px] font-bold text-[#1A1A1A] outline-none transition-all focus:border-[#4BA6B9] focus:bg-white focus:ring-4 focus:ring-[#4BA6B9]/5 resize-none"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#F8F9FA] hover:bg-white border border-transparent hover:border-[#F1F1F1] transition-all cursor-pointer group">
                      <input id="agreed" type="checkbox" required checked={agreedPrivacy} onChange={e => setAgreedPrivacy(e.target.checked)} className="mt-1 w-5 h-5 rounded-lg border-[#F1F1F1] text-[#4BA6B9] focus:ring-[#4BA6B9] cursor-pointer" />
                      <label htmlFor="agreed" className="text-[13px] font-semibold text-[#555555] cursor-pointer group-hover:text-[#1A1A1A] transition-colors leading-relaxed">
                        I confirm that my data will be handled in accordance with the 
                        <Link href="/policies/privacy" className="text-[#4BA6B9] font-black px-1 hover:underline underline-offset-4">Privacy Statement</Link> 
                        of EISR. *
                      </label>
                    </div>

                    <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#F8F9FA] hover:bg-white border border-transparent hover:border-[#F1F1F1] transition-all cursor-pointer group">
                      <input id="reviewer" type="checkbox" checked={wantReviewer} onChange={e => setWantReviewer(e.target.checked)} className="mt-1 w-5 h-5 rounded-lg border-[#F1F1F1] text-[#4BA6B9] focus:ring-[#4BA6B9] cursor-pointer" />
                      <label htmlFor="reviewer" className="text-[13px] font-semibold text-[#555555] cursor-pointer group-hover:text-[#1A1A1A] transition-colors leading-relaxed">
                        Register as a Peer Reviewer. I would like to be contacted to evaluate submissions in my expertise areas.
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-6 space-y-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-16 bg-[#1A1A1A] hover:bg-[#4BA6B9] text-white rounded-3xl font-black text-[16px] transition-all duration-300 shadow-xl shadow-[#1A1A1A]/5 hover:shadow-[#4BA6B9]/20 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>CREATE RESEARCHER ACCOUNT</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  <div className="text-center">
                    <p className="text-[14px] font-bold text-[#555555]">
                       Already established?{' '}
                       <Link href="/login" className="text-[#4BA6B9] hover:text-[#1A1A1A] underline transition-colors underline-offset-4">
                         Go to Login
                       </Link>
                    </p>
                  </div>
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
