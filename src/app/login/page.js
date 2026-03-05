'use client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, Search } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fff', fontFamily: 'Arial, sans-serif' }}>

      {/* ── OJS-Style Top Header ── */}
      <div style={{ backgroundColor: '#005F8E', color: '#fff', padding: '0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px' }}>
          {/* Journal Title */}
          <div>
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
              Eye-Innovations Scientific Research
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.75)', marginTop: '1px' }}>
              International Publishing Platform
            </div>
          </div>

          {/* Top Nav Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px', textDecoration: 'none', fontWeight: '500' }}
              onMouseEnter={e => e.target.style.color='#fff'} onMouseLeave={e => e.target.style.color='rgba(255,255,255,0.85)'}>
              Submissions
            </Link>
            <Link href="/contact" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px', textDecoration: 'none', fontWeight: '500' }}>
              Contact
            </Link>
            <Link href="/login" style={{ color: '#fff', fontSize: '13px', textDecoration: 'none', fontWeight: '700', borderBottom: '2px solid rgba(255,255,255,0.6)', paddingBottom: '2px' }}>
              Login
            </Link>
            <Link href="/register" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px', textDecoration: 'none', fontWeight: '500' }}>
              Register
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.85)', cursor: 'pointer', fontSize: '13px' }}>
              <Search size={14} />
              Search
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <main style={{ flex: 1, backgroundColor: '#fff', padding: '0' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>

          {/* Breadcrumb */}
          <div style={{ padding: '12px 0', borderBottom: '1px solid #e0e0e0', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#555' }}>
            <Link href="/" style={{ color: '#007ab8', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: '#999' }}>/</span>
            <span style={{ color: '#333' }}>Login</span>
          </div>

          {/* Login Form Container */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start', paddingBottom: '48px' }}>

            {/* Left: Login Form */}
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#333', marginBottom: '6px', marginTop: 0 }}>Login</h1>
              <p style={{ fontSize: '13px', color: '#555', marginBottom: '24px' }}>
                Sign in to manage your articles and account
              </p>

              {/* Error */}
              {error && (
                <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', color: '#dc2626', padding: '10px 14px', borderRadius: '4px', fontSize: '13px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#dc2626', flexShrink: 0, display: 'inline-block' }}></span>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>

                {/* Email */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#333', marginBottom: '5px' }}>
                    Email or Username <span style={{ color: '#cc0000' }}>*</span>
                  </label>
                  <input
                    id="login-email"
                    type="text"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email or username"
                    style={{ width: '100%', border: '1px solid #ccc', borderRadius: '3px', padding: '8px 10px', fontSize: '13px', color: '#333', outline: 'none', boxSizing: 'border-box', backgroundColor: '#fff' }}
                    onFocus={e => { e.target.style.borderColor = '#007ab8'; e.target.style.boxShadow = '0 0 0 2px rgba(0,122,184,0.15)'; }}
                    onBlur={e => { e.target.style.borderColor = '#ccc'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>

                {/* Password */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '700', color: '#333' }}>
                      Password <span style={{ color: '#cc0000' }}>*</span>
                    </label>
                    <button type="button" style={{ fontSize: '12px', color: '#007ab8', background: 'none', border: 'none', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}>
                      Forgot your password?
                    </button>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={e => setFormData({ ...formData, password: e.target.value })}
                      placeholder="••••••••"
                      style={{ width: '100%', border: '1px solid #ccc', borderRadius: '3px', padding: '8px 36px 8px 10px', fontSize: '13px', color: '#333', outline: 'none', boxSizing: 'border-box', backgroundColor: '#fff' }}
                      onFocus={e => { e.target.style.borderColor = '#007ab8'; e.target.style.boxShadow = '0 0 0 2px rgba(0,122,184,0.15)'; }}
                      onBlur={e => { e.target.style.borderColor = '#ccc'; e.target.style.boxShadow = 'none'; }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#888', padding: 0 }}
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input id="remember-me" type="checkbox" style={{ width: '14px', height: '14px', cursor: 'pointer', accentColor: '#007ab8' }} />
                  <label htmlFor="remember-me" style={{ fontSize: '13px', color: '#555', cursor: 'pointer' }}>
                    Remember me on this device
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  id="login-submit"
                  type="submit"
                  disabled={loading}
                  style={{
                    backgroundColor: loading ? '#5b99bb' : '#007ab8',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '3px',
                    padding: '10px 24px',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => { if (!loading) e.currentTarget.style.backgroundColor = '#005f8e'; }}
                  onMouseLeave={e => { if (!loading) e.currentTarget.style.backgroundColor = '#007ab8'; }}
                >
                  {loading && (
                    <span style={{ width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }}></span>
                  )}
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>
            </div>

            {/* Right: Info / Register Prompt */}
            <div>
              <div style={{ backgroundColor: '#f8f9fa', border: '1px solid #e0e0e0', borderRadius: '4px', padding: '24px' }}>
                <h2 style={{ fontSize: '15px', fontWeight: '700', color: '#333', marginTop: 0, marginBottom: '10px' }}>
                  Not registered yet?
                </h2>
                <p style={{ fontSize: '13px', color: '#555', lineHeight: '1.6', marginBottom: '16px' }}>
                  Create a free account to submit manuscripts, track your reviews, 
                  and join the global EISR research community.
                </p>
                <Link
                  href="/register"
                  style={{
                    display: 'inline-block',
                    backgroundColor: '#005f8e',
                    color: '#fff',
                    textDecoration: 'none',
                    borderRadius: '3px',
                    padding: '9px 20px',
                    fontSize: '13px',
                    fontWeight: '700',
                  }}
                >
                  Register Now
                </Link>

                <hr style={{ borderColor: '#e0e0e0', borderStyle: 'solid', borderWidth: '1px 0 0 0', margin: '20px 0' }} />

                <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#333', marginTop: 0, marginBottom: '10px' }}>
                  What you can do after logging in:
                </h3>
                <ul style={{ fontSize: '13px', color: '#555', lineHeight: '2.0', paddingLeft: '18px', margin: 0 }}>
                  <li>View &amp; manage submissions</li>
                  <li>Make a new submission</li>
                  <li>Edit your profile</li>
                  <li>Respond to peer review requests</li>
                </ul>
              </div>

              {/* Support */}
              <div style={{ marginTop: '16px', padding: '14px', background: '#f0f7fb', border: '1px solid #c8dde9', borderRadius: '4px' }}>
                <p style={{ fontSize: '12px', color: '#555', margin: 0, lineHeight: '1.6' }}>
                  <strong>Need help?</strong> For account assistance or recovery, contact the{' '}
                  <button style={{ color: '#007ab8', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontSize: '12px', padding: 0 }}>
                    Global Editorial Office
                  </button>
                  .
                </p>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* ── Bottom Strip ── */}
      <div style={{ backgroundColor: '#3e4444', padding: '8px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px' }}>
            © 2025 Eye-Innovations Scientific Research. All rights reserved.
          </span>
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px' }}>
            Secure Researcher Portal
          </span>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        a:hover { opacity: 0.85; }
      `}</style>
    </div>
  );
}
