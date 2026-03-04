'use client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { User, Lock, Mail, ChevronRight } from 'lucide-react';
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
      
      <main className="flex-grow pt-40 pb-24 px-6">
        <div className="max-w-[1240px] mx-auto">
          {/* Breadcrumb - Clean & Subtle */}
          <nav className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-[#999999] mb-12">
            <Link href="/" className="hover:text-[#4BA6B9]">Main Page</Link>
            <ChevronRight size={10} />
            <span className="text-[#1A1A1A]">Login Gateway</span>
          </nav>

          <div className="max-w-md mx-auto">
            {/* Minimal Header */}
            <div className="border-l-4 border-[#4BA6B9] pl-6 mb-12">
              <h1 className="text-4xl font-serif font-black text-[#1A1A1A]  leading-tight">
                Researcher <br />Authentication
              </h1>
              <p className="text-sm font-medium text-[#555555] mt-3">Access your EISR dashboard and submissions</p>
            </div>

            {/* Production Grade Form */}
            {error && <div className="bg-red-50 text-red-500 p-4 rounded-xl mb-6 text-sm font-bold border border-red-100">{error}</div>}
            <div className="bg-white border border-[#E2E8F0] shadow-sm rounded-xl overflow-hidden">
              <div className="p-10 lg:p-12 space-y-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Field 1 */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#555555] flex items-center">
                      <Mail size={12} className="mr-2 text-[#4BA6B9]" />
                      Username or Email
                    </label>
                    <input 
                      type="text" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full border-b-2 border-[#F1F5F9] focus:border-[#4BA6B9] py-3 text-sm font-semibold text-[#1A1A1A] outline-none transition-all placeholder:text-[#BBBBBB] bg-transparent"
                      placeholder="e.g. m.amin@eisr.org"
                    />
                  </div>

                  {/* Field 2 */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#555555] flex items-center">
                        <Lock size={12} className="mr-2 text-[#4BA6B9]" />
                        Secure Password
                      </label>
                    </div>
                    <input 
                      type="password" 
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="w-full border-b-2 border-[#F1F5F9] focus:border-[#4BA6B9] py-3 text-sm font-semibold text-[#1A1A1A] outline-none transition-all placeholder:text-[#BBBBBB] bg-transparent"
                      placeholder="••••••••"
                    />
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-between pt-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input type="checkbox" className="w-3.5 h-3.5 border-2 border-[#E2E8F0] rounded-sm text-[#4BA6B9] focus:ring-0" />
                      <span className="text-xs font-bold text-[#555555]">Remember Me</span>
                    </label>
                    <Link href="#" className="text-[10px] font-black text-[#4BA6B9] uppercase tracking-widest hover:underline">
                      Recovery Password?
                    </Link>
                  </div>

                  {/* Action */}
                  <button type="submit" disabled={loading} className="w-full bg-[#1A1A1A] hover:bg-[#4BA6B9] text-white py-4 font-black text-[11px] uppercase tracking-[0.3em] transition-all shadow-lg hover:shadow-[#4BA6B9]/20 group disabled:opacity-50">
                    {loading ? 'Authenticating...' : 'Sign In'}
                  </button>
                </form>

                <div className="pt-8 border-t border-[#F1F5F9] flex flex-col items-center space-y-4">
                  <p className="text-xs font-bold text-[#555555]">
                    No EISR account yet?
                  </p>
                  <Link 
                    href="/register" 
                    className="w-full text-center border-2 border-[#F1F5F9] text-[#1A1A1A] py-3 font-black text-[11px] uppercase tracking-[0.2em] hover:border-[#4BA6B9] hover:text-[#4BA6B9] transition-all"
                  >
                    Create Researcher ID
                  </Link>
                </div>
              </div>

              {/* Secure indicator footer */}
              <div className="bg-[#FAFBFC] px-8 py-4 border-t border-[#F1F5F9] flex items-center justify-center space-x-2 text-[9px] font-black text-[#BBBBBB] uppercase tracking-[0.2em]">
                 <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                 <span>Secure Institutional SSL Encryption</span>
              </div>
            </div>

            {/* Support Info */}
            <p className="mt-12 text-center text-[10px] font-bold text-[#BBBBBB] px-10 ">
               If you are experiencing issues logging in, please contact our global editorial office at <span className="text-[#4BA6B9]">support@thestap.com</span>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
