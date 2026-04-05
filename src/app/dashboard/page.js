'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, FileText, Edit3, User, Clock, SlidersHorizontal } from 'lucide-react';

const BANNERS = ['/baner0001.jpg', '/baner0002.jpg', '/baner0003.jpg', '/baner0004.jpg'];

function SlidingBanner({ displayName }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p + 1) % BANNERS.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ position: 'relative', height: '260px', overflow: 'hidden', backgroundColor: '#050B14' }}>
      {/* Sliding images */}
      {BANNERS.map((src, i) => (
        <div
          key={src}
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url('${src}')`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            transition: 'opacity 1s ease',
            opacity: i === current ? 1 : 0,
          }}
        />
      ))}

      {/* Dark overlay */}
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(5,11,20,0.52)' }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 48px' }}>
        <p style={{ fontSize: '12px', fontWeight: '700', color: '#4BA6B9', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px', fontFamily: '"Noto Sans", sans-serif' }}>
          Author Dashboard
        </p>
        <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#ffffff', lineHeight: 1.2, margin: '0 0 10px 0', fontFamily: '"Merriweather", serif', maxWidth: '580px' }}>
          Welcome back,{' '}
          <span style={{ color: '#4BA6B9' }}>{displayName || 'Researcher'}</span>!
        </h1>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', margin: 0, fontFamily: '"Noto Sans", sans-serif', fontWeight: '400' }}>
          Journal of Eye Innovation in Security Analysis — Eye-Innovations Scientific Research
        </p>

        {/* Quick action button */}
        <div style={{ marginTop: '20px' }}>
          <Link href="/dashboard/submit" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            backgroundColor: '#4BA6B9', color: '#fff',
            padding: '10px 22px', borderRadius: '50px',
            fontSize: '13px', fontWeight: '700', textDecoration: 'none',
            boxShadow: '0 4px 14px rgba(75,166,185,0.4)',
            transition: 'all 0.2s',
          }}>
            <Plus size={14} /> Make a New Submission
          </Link>
        </div>
      </div>

      {/* Dot indicators */}
      <div style={{ position: 'absolute', bottom: '16px', left: '48px', display: 'flex', gap: '6px', zIndex: 10 }}>
        {BANNERS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: i === current ? '28px' : '8px', height: '8px', borderRadius: '4px',
              backgroundColor: i === current ? '#4BA6B9' : 'rgba(255,255,255,0.4)',
              border: 'none', cursor: 'pointer', padding: 0,
              transition: 'all 0.4s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [profile, setProfile] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('eisr_token');
        if (!token) return;

        const [subRes, assRes, profRes] = await Promise.all([
          fetch('/api/submissions?role=author', { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch('/api/submissions?role=reviewer', { headers: { 'Authorization': `Bearer ${token}` } }),
          fetch('/api/profile', { headers: { 'Authorization': `Bearer ${token}` } }),
        ]);

        const subData = await subRes.json();
        const assData = await assRes.json();
        const profData = await profRes.json();

        if (subData.success) setSubmissions(subData.submissions);
        if (assData.success) setAssignments(assData.submissions);
        if (profData.success) setProfile(profData.profile);
      } catch {}
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  const stats = {
    active: submissions.filter(s => !['Declined', 'Published'].includes(s.status)).length,
    declined: submissions.filter(s => s.status === 'Declined').length,
    published: submissions.filter(s => s.status === 'Published').length,
    total: submissions.length,
  };

  const displayName = profile?.givenName
    ? `${profile.givenName}${profile.familyName ? ' ' + profile.familyName : ''}`
    : (profile?.fullName || 'Researcher');

  const recentSubmissions = submissions.slice(0, 5);

  const statCardStyle = (color) => ({
    backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px',
    padding: '20px 24px', textDecoration: 'none', display: 'block',
    borderTop: `3px solid ${color}`,
  });

  return (
    <div style={{ fontFamily: '"Noto Sans", sans-serif' }}>
      {/* ── Sliding Banner ── */}
      <SlidingBanner displayName={displayName} />

      {/* ── Content below banner ── */}
      <div style={{ padding: '28px 36px', maxWidth: '1100px' }}>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '28px' }}>
        {[
          { label: 'Total Submissions', value: loading ? '—' : stats.total, color: '#005f96', href: '/dashboard/submissions/all' },
          { label: 'Active', value: loading ? '—' : stats.active, color: '#7c3aed', href: '/dashboard/submissions' },
          { label: 'Declined', value: loading ? '—' : stats.declined, color: '#dc2626', href: '/dashboard/submissions/declined' },
          { label: 'Published', value: loading ? '—' : stats.published, color: '#16a34a', href: '/dashboard/submissions/published' },
        ].map(stat => (
          <Link key={stat.label} href={stat.href} style={statCardStyle(stat.color)}>
            <div style={{ fontSize: '28px', fontWeight: '700', color: stat.color, lineHeight: 1 }}>{stat.value}</div>
            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px', fontWeight: '500' }}>{stat.label}</div>
          </Link>
        ))}
      </div>

      {/* Main Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>

        {/* My Submissions */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px 24px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={15} color="#005f96" /> My Submissions as Author
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0', fontSize: '13px' }}>
            {[
              { href: '/dashboard/submissions', label: 'Active submissions', count: stats.active },
              { href: '/dashboard/submissions/revisions-requested', label: 'Revisions requested', count: null },
              { href: '/dashboard/submissions/incomplete', label: 'Incomplete submissions', count: null },
              { href: '/dashboard/submissions/published', label: 'Published', count: stats.published },
              { href: '/dashboard/submissions/declined', label: 'Declined', count: stats.declined },
            ].map(item => (
              <li key={item.href} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link href={item.href} style={{ color: '#005f96', textDecoration: 'none' }}>
                  → {item.label}
                </Link>
                {item.count !== null && !loading && (
                  <span style={{ fontSize: '11px', fontWeight: '600', color: '#64748b', backgroundColor: '#f1f5f9', borderRadius: '10px', padding: '2px 8px' }}>
                    {item.count}
                  </span>
                )}
              </li>
            ))}
          </ul>
          <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '14px' }}>
            <Link href="/dashboard/submit" style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              backgroundColor: '#005f96', color: '#fff', padding: '8px 18px',
              borderRadius: '4px', fontSize: '13px', fontWeight: '700', textDecoration: 'none',
            }}>
              <Plus size={14} /> Make a New Submission
            </Link>
          </div>
        </div>

        {/* My Reviewer Tasks */}
        <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px 24px' }}>
          <h2 style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Edit3 size={15} color="#005f96" /> My Assignments as Reviewer
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px 0', fontSize: '13px' }}>
            {[
              { href: '/dashboard/reviewer/action-required', label: 'Action Required by me', count: assignments.filter(a => ['Pending', 'Accepted'].includes(a.status)).length },
              { href: '/dashboard/reviewer/all', label: 'All assignments', count: assignments.length },
              { href: '/dashboard/reviewer/completed', label: 'Completed', count: assignments.filter(a => a.status === 'Completed').length },
              { href: '/dashboard/reviewer/declined', label: 'Declined', count: assignments.filter(a => a.status === 'Declined').length },
              { href: '/dashboard/reviewer/published', label: 'Published', count: assignments.filter(a => a.submission_status === 'Published').length },
            ].map(item => (
              <li key={item.href} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Link href={item.href} style={{ color: '#005f96', textDecoration: 'none' }}>
                  → {item.label}
                </Link>
                {item.count !== null && !loading && (
                  <span style={{ fontSize: '11px', fontWeight: '600', color: '#64748b', backgroundColor: '#f1f5f9', borderRadius: '10px', padding: '2px 8px' }}>
                    {item.count}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Editorial Console (Visible to Editor/Admin) */}
        {(profile?.role === 'editor' || profile?.role === 'admin') && (
          <div style={{ backgroundColor: '#fff', border: '1px solid #005f96', borderRadius: '8px', padding: '20px 24px', gridColumn: 'span 2' }}>
            <h2 style={{ fontSize: '14px', fontWeight: '700', color: '#005f96', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <SlidersHorizontal size={15} /> Editorial Management Console
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              <Link href="/dashboard/submissions/editor" style={{ display: 'block', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '4px', textDecoration: 'none', color: '#333', fontSize: '13px', textAlign: 'center', fontWeight: '600' }}>
                Manage All Submissions
              </Link>
              <Link href="/dashboard/submissions/unassigned" style={{ display: 'block', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '4px', textDecoration: 'none', color: '#333', fontSize: '13px', textAlign: 'center', fontWeight: '600' }}>
                Unassigned Manuscripts
              </Link>
              <Link href="/dashboard/reviewer/all" style={{ display: 'block', padding: '12px', border: '1px solid #e2e8f0', borderRadius: '4px', textDecoration: 'none', color: '#333', fontSize: '13px', textAlign: 'center', fontWeight: '600' }}>
                Reviewer Pool
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Recent Submissions Table */}
      {recentSubmissions.length > 0 && (
        <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
          <div style={{ padding: '16px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={15} color="#005f96" /> Recent Submissions
            </h2>
            <Link href="/dashboard/submissions" style={{ fontSize: '13px', color: '#005f96', textDecoration: 'none', fontWeight: '500' }}>
              View all →
            </Link>
          </div>
          <div>
            {recentSubmissions.map((sub, idx) => {
              const statusColors = {
                'Published': '#16a34a', 'Declined': '#dc2626', 'Review': '#2563eb',
                'Submitted': '#7c3aed', 'Unassigned': '#64748b',
              };
              const sc = statusColors[sub.status] || '#64748b';
              return (
                <div key={sub.id} style={{
                  display: 'grid', gridTemplateColumns: '60px 1fr 120px 140px 80px',
                  borderBottom: idx < recentSubmissions.length - 1 ? '1px solid #f1f5f9' : 'none',
                  alignItems: 'center', padding: '12px 24px',
                  backgroundColor: idx % 2 === 0 ? '#fff' : '#fafcff',
                }}>
                  <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '600' }}>#{sub.id}</span>
                  <Link href={`/dashboard/submissions/${sub.id}`} style={{ fontSize: '13px', color: '#005f96', textDecoration: 'none', fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: '12px' }}>
                    {sub.title}
                  </Link>
                  <span style={{ fontSize: '12px', color: sc, fontWeight: '600', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: sc, display: 'inline-block' }} />
                    {sub.status || 'Submitted'}
                  </span>
                  <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                    {sub.date || '—'}
                  </span>
                  <Link href={`/dashboard/submissions/${sub.id}`} style={{ fontSize: '12px', color: '#005f96', textDecoration: 'none', fontWeight: '600', textAlign: 'right' }}>
                    View →
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Account */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px 24px', marginTop: '20px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <User size={15} color="#005f96" /> My Account
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '13px' }}>
          {profile && (
            <>
              <div><span style={{ color: '#64748b' }}>Name:</span> <strong>{displayName}</strong></div>
              <div><span style={{ color: '#64748b' }}>Email:</span> <strong>{profile.email}</strong></div>
              {profile.affiliation && <div><span style={{ color: '#64748b' }}>Affiliation:</span> <strong>{profile.affiliation}</strong></div>}
              {profile.country && <div><span style={{ color: '#64748b' }}>Country:</span> <strong>{profile.country}</strong></div>}
              {profile.orcid && <div><span style={{ color: '#64748b' }}>ORCID:</span> <strong>{profile.orcid}</strong></div>}
            </>
          )}
        </div>
        <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #f1f5f9' }}>
          <Link href="/dashboard/profile" style={{ color: '#005f96', textDecoration: 'none', fontSize: '13px', fontWeight: '600' }}>
            → Edit My Profile
          </Link>
        </div>
      </div>
      </div>{/* inner content padding div */}
    </div>
  );
}
