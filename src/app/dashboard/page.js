'use client';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div style={{ padding: '24px', maxWidth: '900px' }}>
      <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#333', marginTop: 0, marginBottom: '20px' }}>
        Dashboard
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

        {/* Active Submissions */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '4px', padding: '20px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: '700', color: '#005F8E', marginTop: 0, marginBottom: '12px' }}>
            My Submissions as Author
          </h2>
          <Link
            href="/dashboard/submissions"
            style={{ display: 'inline-block', fontSize: '13px', color: '#007ab8', textDecoration: 'none', marginBottom: '12px' }}
          >
            View Active Submissions →
          </Link>
          <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #eee' }}>
            <Link
              href="/dashboard/submit"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#007ab8',
                color: '#fff',
                padding: '8px 16px',
                borderRadius: '3px',
                fontSize: '13px',
                fontWeight: '700',
                textDecoration: 'none',
              }}
            >
              <Plus size={14} />
              Make a New Submission
            </Link>
          </div>
        </div>

        {/* Profile */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '4px', padding: '20px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: '700', color: '#005F8E', marginTop: 0, marginBottom: '12px' }}>
            My Account
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13px' }}>
            {[
              { href: '/dashboard/profile', label: 'Edit My Profile' },
              { href: '/dashboard/submissions', label: 'View Submissions' },
              { href: '/dashboard/submit', label: 'Make a New Submission' },
            ].map(item => (
              <li key={item.href} style={{ marginBottom: '8px' }}>
                <Link href={item.href} style={{ color: '#007ab8', textDecoration: 'none' }}>
                  → {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
