'use client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Eye, EyeOff, Search } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

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

  const inputStyle = {
    width: '100%',
    border: '1px solid #ccc',
    borderRadius: '3px',
    padding: '8px 10px',
    fontSize: '13px',
    color: '#333',
    outline: 'none',
    boxSizing: 'border-box',
    backgroundColor: '#fff',
    fontFamily: 'Arial, sans-serif',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '13px',
    fontWeight: '700',
    color: '#333',
    marginBottom: '5px',
  };

  const sectionHeadStyle = {
    fontSize: '14px',
    fontWeight: '700',
    color: '#005F8E',
    borderBottom: '1px solid #e0e0e0',
    paddingBottom: '8px',
    marginTop: '0',
    marginBottom: '16px',
  };

  const fieldWrap = { marginBottom: '16px' };

  const handleFocus = e => {
    e.target.style.borderColor = '#007ab8';
    e.target.style.boxShadow = '0 0 0 2px rgba(0,122,184,0.15)';
  };
  const handleBlur = e => {
    e.target.style.borderColor = '#ccc';
    e.target.style.boxShadow = 'none';
  };

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
    '', 'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Australia', 'Austria',
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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fff', fontFamily: 'Arial, sans-serif' }}>

      {/* ── OJS-Style Top Header ── */}
      <div style={{ backgroundColor: '#005F8E', color: '#fff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px' }}>
          <div>
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#fff', letterSpacing: '-0.01em', lineHeight: 1.2 }}>
              Eye-Innovations Scientific Research
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.75)', marginTop: '1px' }}>
              International Publishing Platform
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px', textDecoration: 'none', fontWeight: '500' }}>Submissions</Link>
            <Link href="/contact" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px', textDecoration: 'none', fontWeight: '500' }}>Contact</Link>
            <Link href="/login" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px', textDecoration: 'none', fontWeight: '500' }}>Login</Link>
            <Link href="/register" style={{ color: '#fff', fontSize: '13px', textDecoration: 'none', fontWeight: '700', borderBottom: '2px solid rgba(255,255,255,0.6)', paddingBottom: '2px' }}>Register</Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.85)', cursor: 'pointer', fontSize: '13px' }}>
              <Search size={14} />
              Search
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <main style={{ flex: 1, backgroundColor: '#fff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>

          {/* Breadcrumb */}
          <div style={{ padding: '12px 0', borderBottom: '1px solid #e0e0e0', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#555' }}>
            <Link href="/" style={{ color: '#007ab8', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: '#999' }}>/</span>
            <span style={{ color: '#333' }}>Register</span>
          </div>

          {/* Page Title */}
          <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#333', marginTop: 0, marginBottom: '6px' }}>Register</h1>
          <p style={{ fontSize: '13px', color: '#555', marginBottom: '24px' }}>
            Complete the form below to create your researcher account.
            Required fields are marked with an asterisk <span style={{ color: '#cc0000' }}>*</span>
          </p>

          {/* Error */}
          {error && (
            <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', color: '#dc2626', padding: '10px 14px', borderRadius: '4px', fontSize: '13px', marginBottom: '20px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '40px', alignItems: 'start' }}>

              {/* ── Left: Form Fields ── */}
              <div>

                {/* ── Section: Name ── */}
                <div style={{ marginBottom: '28px' }}>
                  <h2 style={sectionHeadStyle}>Your Name</h2>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={fieldWrap}>
                      <label style={labelStyle}>
                        Given Name <span style={{ color: '#cc0000' }}>*</span>
                      </label>
                      <input
                        id="reg-given-name"
                        type="text"
                        required
                        placeholder="First name"
                        value={formData.givenName}
                        onChange={e => setFormData({ ...formData, givenName: e.target.value })}
                        style={inputStyle}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div style={fieldWrap}>
                      <label style={labelStyle}>
                        Family Name <span style={{ color: '#cc0000' }}>*</span>
                      </label>
                      <input
                        id="reg-family-name"
                        type="text"
                        required
                        placeholder="Last name"
                        value={formData.familyName}
                        onChange={e => setFormData({ ...formData, familyName: e.target.value })}
                        style={inputStyle}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>

                  <p style={{ fontSize: '12px', color: '#888', marginTop: '4px', marginBottom: 0 }}>
                    Please provide the full name as the author should be identified on the published work.
                    Example: Dr. John F. Mannings
                  </p>
                </div>

                {/* ── Section: Contact ── */}
                <div style={{ marginBottom: '28px' }}>
                  <h2 style={sectionHeadStyle}>Contact Details</h2>

                  <div style={fieldWrap}>
                    <label style={labelStyle}>Affiliation</label>
                    <input
                      id="reg-affiliation"
                      type="text"
                      placeholder="University or institution name"
                      value={formData.affiliation}
                      onChange={e => setFormData({ ...formData, affiliation: e.target.value })}
                      style={inputStyle}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>

                  <div style={fieldWrap}>
                    <label style={labelStyle}>Country <span style={{ color: '#cc0000' }}>*</span></label>
                    <select
                      id="reg-country"
                      required
                      value={formData.country}
                      onChange={e => setFormData({ ...formData, country: e.target.value })}
                      style={{ ...inputStyle, cursor: 'pointer' }}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    >
                      <option value="">Select Country</option>
                      {countries.slice(1).map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div style={fieldWrap}>
                    <label style={labelStyle}>Mailing Address</label>
                    <textarea
                      id="reg-mailing"
                      placeholder="Enter your mailing address"
                      value={formData.mailingAddress}
                      onChange={e => setFormData({ ...formData, mailingAddress: e.target.value })}
                      rows={3}
                      style={{ ...inputStyle, resize: 'vertical' }}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>

                {/* ── Section: Login Details ── */}
                <div style={{ marginBottom: '28px' }}>
                  <h2 style={sectionHeadStyle}>Login Details</h2>

                  <div style={fieldWrap}>
                    <label style={labelStyle}>
                      Email <span style={{ color: '#cc0000' }}>*</span>
                    </label>
                    <input
                      id="reg-email"
                      type="email"
                      required
                      placeholder="researcher@institute.edu"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      style={inputStyle}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>

                  <div style={fieldWrap}>
                    <label style={labelStyle}>
                      Username <span style={{ color: '#cc0000' }}>*</span>
                    </label>
                    <input
                      id="reg-username"
                      type="text"
                      required
                      placeholder="Choose a unique username"
                      value={formData.username}
                      onChange={e => setFormData({ ...formData, username: e.target.value })}
                      style={inputStyle}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                    <p style={{ fontSize: '12px', color: '#888', marginTop: '4px', marginBottom: 0 }}>
                      Please provide your preferred username, which must be unique to this site.
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={fieldWrap}>
                      <label style={labelStyle}>
                        Password <span style={{ color: '#cc0000' }}>*</span>
                      </label>
                      <div style={{ position: 'relative' }}>
                        <input
                          id="reg-password"
                          type={showPassword ? 'text' : 'password'}
                          required
                          placeholder="Min. 8 characters"
                          value={formData.password}
                          onChange={e => setFormData({ ...formData, password: e.target.value })}
                          style={{ ...inputStyle, paddingRight: '36px' }}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#888', padding: 0 }}
                        >
                          {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </div>

                    <div style={fieldWrap}>
                      <label style={labelStyle}>
                        Repeat Password <span style={{ color: '#cc0000' }}>*</span>
                      </label>
                      <div style={{ position: 'relative' }}>
                        <input
                          id="reg-confirm-password"
                          type={showConfirm ? 'text' : 'password'}
                          required
                          placeholder="Re-enter password"
                          value={formData.confirmPassword}
                          onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })}
                          style={{ ...inputStyle, paddingRight: '36px' }}
                          onFocus={handleFocus}
                          onBlur={handleBlur}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirm(!showConfirm)}
                          style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#888', padding: 0 }}
                        >
                          {showConfirm ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Section: Optional ── */}
                <div style={{ marginBottom: '28px' }}>
                  <h2 style={sectionHeadStyle}>Profile (Optional)</h2>

                  <div style={fieldWrap}>
                    <label style={labelStyle}>ORCiD iD</label>
                    <input
                      id="reg-orcid"
                      type="text"
                      placeholder="0000-0000-0000-0000"
                      value={formData.orcid}
                      onChange={e => setFormData({ ...formData, orcid: e.target.value })}
                      style={inputStyle}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                    <p style={{ fontSize: '12px', color: '#888', marginTop: '4px', marginBottom: 0 }}>
                      Your ORCiD profile authentication will be used to link your account.
                    </p>
                  </div>

                  <div style={fieldWrap}>
                    <label style={labelStyle}>Bio Statement</label>
                    <textarea
                      id="reg-bio"
                      placeholder="Brief biography or research interests..."
                      value={formData.bio}
                      onChange={e => setFormData({ ...formData, bio: e.target.value })}
                      rows={4}
                      style={{ ...inputStyle, resize: 'vertical' }}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>

                {/* ── Section: Consent ── */}
                <div style={{ marginBottom: '28px' }}>
                  <h2 style={sectionHeadStyle}>Terms &amp; Consent</h2>

                  <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <input
                      id="reg-privacy"
                      type="checkbox"
                      required
                      checked={agreedPrivacy}
                      onChange={e => setAgreedPrivacy(e.target.checked)}
                      style={{ marginTop: '2px', width: '14px', height: '14px', cursor: 'pointer', accentColor: '#007ab8', flexShrink: 0 }}
                    />
                    <label htmlFor="reg-privacy" style={{ fontSize: '13px', color: '#333', cursor: 'pointer', lineHeight: '1.5' }}>
                      I agree to have my data collected and stored according to the{' '}
                      <Link href="/policies/privacy" style={{ color: '#007ab8', textDecoration: 'underline' }}>privacy statement</Link>.
                      <span style={{ color: '#cc0000' }}> *</span>
                    </label>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <input
                      id="reg-reviewer"
                      type="checkbox"
                      checked={wantReviewer}
                      onChange={e => setWantReviewer(e.target.checked)}
                      style={{ marginTop: '2px', width: '14px', height: '14px', cursor: 'pointer', accentColor: '#007ab8', flexShrink: 0 }}
                    />
                    <label htmlFor="reg-reviewer" style={{ fontSize: '13px', color: '#333', cursor: 'pointer', lineHeight: '1.5' }}>
                      I would like to be contacted with requests to review submissions to this journal.
                    </label>
                  </div>
                </div>

                {/* Required note */}
                <p style={{ fontSize: '12px', color: '#888', marginBottom: '20px' }}>
                  <span style={{ color: '#cc0000' }}>*</span> Required fields are marked with an asterisk
                </p>

                {/* Submit */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', paddingBottom: '40px' }}>
                  <button
                    id="register-submit"
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
                    }}
                    onMouseEnter={e => { if (!loading) e.currentTarget.style.backgroundColor = '#005f8e'; }}
                    onMouseLeave={e => { if (!loading) e.currentTarget.style.backgroundColor = '#007ab8'; }}
                  >
                    {loading && (
                      <span style={{ width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }}></span>
                    )}
                    {loading ? 'Registering...' : 'Register'}
                  </button>

                  <Link href="/login" style={{ color: '#007ab8', fontSize: '13px', textDecoration: 'underline' }}>
                    Already have an account? Login
                  </Link>
                </div>
              </div>

              {/* ── Right: Sidebar Info ── */}
              <div style={{ position: 'sticky', top: '24px' }}>
                <div style={{ backgroundColor: '#f8f9fa', border: '1px solid #e0e0e0', borderRadius: '4px', padding: '20px', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#333', marginTop: 0, marginBottom: '10px' }}>
                    After registering you can:
                  </h3>
                  <ul style={{ fontSize: '13px', color: '#555', lineHeight: '2.0', paddingLeft: '18px', margin: 0 }}>
                    <li>View Submissions</li>
                    <li>Make a New Submission</li>
                    <li>Edit My Profile</li>
                    <li>Continue Browsing</li>
                  </ul>
                </div>

                <div style={{ backgroundColor: '#f0f7fb', border: '1px solid #c8dde9', borderRadius: '4px', padding: '16px' }}>
                  <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#005F8E', marginTop: 0, marginBottom: '8px' }}>
                    Already registered?
                  </h3>
                  <p style={{ fontSize: '12px', color: '#555', lineHeight: '1.6', marginBottom: '12px' }}>
                    If you have previously registered, you can log in with your username and password.
                  </p>
                  <Link
                    href="/login"
                    style={{ display: 'inline-block', backgroundColor: '#005f8e', color: '#fff', textDecoration: 'none', borderRadius: '3px', padding: '8px 16px', fontSize: '13px', fontWeight: '700' }}
                  >
                    Go to Login
                  </Link>
                </div>
              </div>

            </div>
          </form>
        </div>
      </main>

      {/* ── Bottom Strip ── */}
      <div style={{ backgroundColor: '#3e4444', padding: '8px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px' }}>
            © 2025 Eye-Innovations Scientific Research. All rights reserved.
          </span>
          <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '11px' }}>
            Secure Researcher Enrollment Portal
          </span>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
