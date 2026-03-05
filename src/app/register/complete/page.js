'use client';
import Link from 'next/link';
import { Search, ChevronRight } from 'lucide-react';

export default function RegistrationCompletePage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#fff', fontFamily: 'Arial, sans-serif' }}>

      {/* Header */}
      <div style={{ backgroundColor: '#005F8E' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px' }}>
          <div>
            <div style={{ fontSize: '16px', fontWeight: '700', color: '#fff' }}>Eye-Innovations Scientific Research (EISR)</div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.7)' }}>International Publishing Platform</div>
          </div>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <Link href="/submission" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px', textDecoration: 'none' }}>Submissions</Link>
            <Link href="/contact" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px', textDecoration: 'none' }}>Contact</Link>
            <Link href="/login" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px', textDecoration: 'none' }}>Login</Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'rgba(255,255,255,0.85)', cursor: 'pointer', fontSize: '13px' }}>
              <Search size={13} /> Search
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <main style={{ flex: 1 }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>

          {/* Breadcrumb */}
          <div style={{ padding: '10px 0', borderBottom: '1px solid #e0e0e0', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
            <Link href="/" style={{ color: '#007ab8', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: '#999' }}>/</span>
            <span style={{ color: '#333' }}>Registration complete</span>
          </div>

          {/* Content */}
          <div style={{ maxWidth: '600px' }}>
            <h1 style={{ fontSize: '22px', fontWeight: '700', color: '#333', marginTop: 0, marginBottom: '12px' }}>Registration complete</h1>
            <p style={{ fontSize: '13px', color: '#555', marginBottom: '20px', lineHeight: '1.6' }}>
              Thanks for registering! What would you like to do next?
            </p>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13px' }}>
              {[
                { href: '/dashboard/submissions', label: 'View Submissions' },
                { href: '/dashboard/submit', label: 'Make a New Submission' },
                { href: '/dashboard/profile', label: 'Edit My Profile' },
                { href: '/', label: 'Continue Browsing' },
              ].map(item => (
                <li key={item.href} style={{ marginBottom: '8px' }}>
                  <Link href={item.href} style={{ color: '#007ab8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <ChevronRight size={12} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>

      {/* Footer */}
      <div style={{ backgroundColor: '#3e4444', padding: '8px 24px', marginTop: '60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px' }}>© 2025 Eye-Innovations Scientific Research. All rights reserved.</span>
        </div>
      </div>
    </div>
  );
}
