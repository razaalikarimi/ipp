'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ChevronUp, ChevronDown, Edit3, FileText, Plus, Bell, User, X } from 'lucide-react';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [reviewerOpen, setReviewerOpen] = useState(true);
  const [authorOpen, setAuthorOpen] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [showNotif, setShowNotif] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('eisr_token');
    if (!token) { router.push('/login'); return; }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser(payload);
    } catch { router.push('/login'); }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('eisr_token');
        if (!token) return;

        // Fetch submissions
        const subRes = await fetch('/api/submissions', { headers: { 'Authorization': `Bearer ${token}` } });
        const subData = await subRes.json();
        if (subData.success) setSubmissions(subData.submissions);

        // Fetch profile
        const profRes = await fetch('/api/profile', { headers: { 'Authorization': `Bearer ${token}` } });
        const profData = await profRes.json();
        if (profData.success) setProfile(profData.profile);
      } catch {}
    };
    fetchData();
  }, []);

  const handleLogout = () => { localStorage.removeItem('eisr_token'); router.push('/login'); };

  const isActive = (href) => {
    if (href === '/dashboard' && pathname === '/dashboard') return true;
    if (href !== '/dashboard' && pathname === href) return true;
    return false;
  };

  // Compute counts from real data
  const counts = {
    active: submissions.filter(s => !['Declined', 'Published'].includes(s.status)).length,
    revisionsRequested: submissions.filter(s => (s.status || '').toLowerCase().includes('revision')).length,
    revisionsSubmitted: submissions.filter(s => (s.status || '').toLowerCase().includes('revisions submitted')).length,
    incomplete: submissions.filter(s => (s.status || '').toLowerCase().includes('incomplete')).length,
    scheduled: submissions.filter(s => (s.status || '').toLowerCase().includes('scheduled')).length,
    published: submissions.filter(s => (s.status || '').toLowerCase() === 'published').length,
    declined: submissions.filter(s => (s.status || '').toLowerCase() === 'declined').length,
  };

  const displayName = profile?.givenName
    ? `${profile.givenName}${profile.familyName ? ' ' + profile.familyName : ''}`
    : (profile?.fullName || user?.name || user?.username || 'User');

  const initials = displayName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  const NavItem = ({ href, label, count }) => {
    const active = isActive(href);
    return (
      <Link href={href} style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 20px 8px 24px', fontSize: '13px', textDecoration: 'none',
        color: active ? '#005f96' : '#334155',
        backgroundColor: active ? '#eff6ff' : 'transparent',
        borderLeft: active ? '3px solid #005f96' : '3px solid transparent',
        fontFamily: '"Noto Sans", sans-serif',
        transition: 'all 0.15s',
        fontWeight: active ? '600' : '400',
      }}>
        <span>{label}</span>
        {count !== undefined && (
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            minWidth: '22px', height: '20px', borderRadius: '10px', fontSize: '11px',
            fontWeight: '600', padding: '0 6px',
            backgroundColor: active ? '#005f96' : (count > 0 ? '#e0f2fe' : 'transparent'),
            color: active ? '#fff' : (count > 0 ? '#005f96' : '#94a3b8'),
            border: count === 0 && !active ? '1px solid #e2e8f0' : 'none',
          }}>{count}</span>
        )}
      </Link>
    );
  };

  const SectionHeader = ({ icon: Icon, label, open, onToggle }) => (
    <button onClick={onToggle} style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '12px 20px', fontSize: '12px', fontWeight: '700', color: '#64748b',
      backgroundColor: '#f8fafc', border: 'none', borderTop: '1px solid #e2e8f0',
      borderBottom: '1px solid #e2e8f0', cursor: 'pointer', width: '100%', textAlign: 'left',
      fontFamily: '"Noto Sans", sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em',
    }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Icon size={13} /> {label}
      </span>
      {open ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
    </button>
  );

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: '"Noto Sans", -apple-system, sans-serif', backgroundColor: '#f1f5f9' }}>

      {/* ── Site Header ── */}
      <Header />

      {/* ── Dashboard Sub-header bar ── */}
      <div style={{
        backgroundColor: '#002f4c', color: '#fff',
        display: 'flex', alignItems: 'center', padding: '0 24px',
        justifyContent: 'space-between', height: '44px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: '12px' }}>EISR</Link>
          <span style={{ fontSize: '11px' }}>›</span>
          <span style={{ color: '#fff', fontWeight: '600', fontSize: '12px' }}>My Dashboard</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Notifications */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowNotif(v => !v)}
              style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.75)', cursor: 'pointer', padding: '0', display: 'flex', alignItems: 'center', position: 'relative' }}
            >
              <Bell size={16} />
              {notifications.length > 0 && (
                <span style={{ position: 'absolute', top: '-5px', right: '-5px', backgroundColor: '#dc2626', color: '#fff', width: '16px', height: '16px', borderRadius: '50%', fontSize: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}>
                  {notifications.length}
                </span>
              )}
            </button>
            {showNotif && (
              <div style={{ position: 'absolute', top: '32px', right: 0, width: '300px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', zIndex: 200 }}>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>Notifications</span>
                  <button onClick={() => setShowNotif(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}><X size={14} /></button>
                </div>
                <div style={{ padding: '20px 16px', textAlign: 'center', fontSize: '13px', color: '#94a3b8' }}>No new notifications</div>
              </div>
            )}
          </div>

          {/* User */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={handleLogout} title="Click to logout">
            <div style={{
              width: '28px', height: '28px', borderRadius: '50%',
              backgroundColor: '#4BA6B9', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '11px', fontWeight: '700',
            }}>
              {initials || <User size={14} />}
            </div>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.85)', fontWeight: '500', maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {displayName}
            </span>
          </div>
        </div>
      </div>

      {/* ── Body: Sidebar + Main ── */}
      <div style={{ display: 'flex', flex: 1 }}>

        {/* ── Sidebar ── */}
        <aside style={{
          width: '260px', backgroundColor: '#fff', borderRight: '1px solid #e2e8f0',
          minHeight: 'calc(100vh - 44px - 80px)', flexShrink: 0, display: 'flex',
          flexDirection: 'column', overflowY: 'auto',
        }}>

          {/* Dashboard Home Link */}
          <Link href="/dashboard" style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '14px 20px', fontSize: '13px', fontWeight: '700',
            color: pathname === '/dashboard' ? '#005f96' : '#1e293b',
            textDecoration: 'none', borderBottom: '1px solid #e2e8f0',
            backgroundColor: pathname === '/dashboard' ? '#eff6ff' : '#fff',
            fontFamily: '"Noto Sans", sans-serif',
          }}>
            Dashboard
          </Link>

          {/* My Assignments as Reviewer */}
          <SectionHeader icon={Edit3} label="My Assignments as Reviewer" open={reviewerOpen} onToggle={() => setReviewerOpen(!reviewerOpen)} />
          {reviewerOpen && (
            <div style={{ backgroundColor: '#fff' }}>
              <NavItem href="/dashboard/reviewer/action-required" label="Action Required by me" count={0} />
              <NavItem href="/dashboard/reviewer/all" label="All assignments" count={0} />
              <NavItem href="/dashboard/reviewer/completed" label="Completed" count={0} />
              <NavItem href="/dashboard/reviewer/declined" label="Declined" count={0} />
              <NavItem href="/dashboard/reviewer/published" label="Published" count={0} />
              <NavItem href="/dashboard/reviewer/archived" label="Archived" count={0} />
            </div>
          )}

          {/* My Submissions as Author */}
          <SectionHeader icon={FileText} label="My Submissions as Author" open={authorOpen} onToggle={() => setAuthorOpen(!authorOpen)} />
          {authorOpen && (
            <div style={{ backgroundColor: '#fff' }}>
              <NavItem href="/dashboard/submissions" label="Active submissions" count={counts.active} />
              <NavItem href="/dashboard/submissions/revisions-requested" label="Revisions requested" count={counts.revisionsRequested} />
              <NavItem href="/dashboard/submissions/revisions-submitted" label="Revisions submitted" count={counts.revisionsSubmitted} />
              <NavItem href="/dashboard/submissions/incomplete" label="Incomplete" count={counts.incomplete} />
              <NavItem href="/dashboard/submissions/scheduled" label="Scheduled for publication" count={counts.scheduled} />
              <NavItem href="/dashboard/submissions/published" label="Published" count={counts.published} />
              <NavItem href="/dashboard/submissions/declined" label="Declined" count={counts.declined} />
              <div style={{ padding: '12px 20px', borderTop: '1px solid #f1f5f9' }}>
                <Link href="/dashboard/submit" style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  fontSize: '13px', color: '#005f96', textDecoration: 'none',
                  fontFamily: '"Noto Sans", sans-serif', fontWeight: '600',
                }}>
                  <Plus size={13} /> Start A New Submission
                </Link>
              </div>
            </div>
          )}

          {/* Profile Link */}
          <div style={{ marginTop: 'auto', borderTop: '1px solid #e2e8f0' }}>
            <Link href="/dashboard/profile" style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '14px 20px', fontSize: '13px', textDecoration: 'none',
              color: pathname === '/dashboard/profile' ? '#005f96' : '#334155',
              backgroundColor: pathname === '/dashboard/profile' ? '#eff6ff' : '#fff',
              fontFamily: '"Noto Sans", sans-serif',
              borderLeft: pathname === '/dashboard/profile' ? '3px solid #005f96' : '3px solid transparent',
            }}>
              <User size={14} />
              <div>
                <div style={{ fontWeight: '600', fontSize: '13px' }}>{displayName}</div>
                <div style={{ fontSize: '11px', color: '#94a3b8' }}>{profile?.email || user?.email || 'Edit Profile'}</div>
              </div>
            </Link>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main style={{ flex: 1, overflowX: 'auto', backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 44px - 80px)' }}>
          {children}
        </main>
      </div>

      {/* ── Site Footer ── */}
      <Footer />
    </div>
  );
}
