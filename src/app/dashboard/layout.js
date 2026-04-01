'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronUp, ChevronDown, Edit3, FileText, Plus, Bell, User, X, Info } from 'lucide-react';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [reviewerOpen, setReviewerOpen] = useState(true);
  const [authorOpen, setAuthorOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotif, setShowNotif] = useState(false);

  const [currentJournal, setCurrentJournal] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('eisr_token');
    if (!token) { router.push('/login'); return; }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser(payload);
    } catch { router.push('/login'); }

    // Check for journal context in URL
    const searchParams = new URLSearchParams(window.location.search);
    const jSlug = searchParams.get('journal'); 
    if (jSlug) setCurrentJournal(jSlug);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('eisr_token');
        if (!token) return;

        // Fetch submissions with optional journal filter
        let url = '/api/submissions';
        if (currentJournal) url += `?journal=${currentJournal}`;
        
        const subRes = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
        const subData = await subRes.json();
        if (subData.success) setSubmissions(subData.submissions);

        // Fetch profile
        const profRes = await fetch('/api/profile', { headers: { 'Authorization': `Bearer ${token}` } });
        const profData = await profRes.json();
        if (profData.success) setProfile(profData.profile);
      } catch {}
    };
    fetchData();
  }, [currentJournal]);

  const handleLogout = () => { localStorage.removeItem('eisr_token'); router.push('/login'); };

  const isActive = (href) => {
    if (href === '/dashboard' && pathname === '/dashboard') return true;
    if (href !== '/dashboard' && pathname.startsWith(href)) return true;
    return false;
  };

  // Compute counts from real data, filtered by current journal
  const filteredSubs = currentJournal 
    ? submissions.filter(s => s.journal_id === (currentJournal === 'jeiml' ? 'jeiml' : 'jcsra'))
    : submissions;

  const counts = {
    active: filteredSubs.filter(s => !['Declined', 'Published'].includes(s.status)).length,
    revisionsRequested: filteredSubs.filter(s => (s.status || '').toLowerCase().includes('revision')).length,
    revisionsSubmitted: filteredSubs.filter(s => (s.status || '').toLowerCase().includes('revisions submitted')).length,
    incomplete: filteredSubs.filter(s => (s.status || '').toLowerCase().includes('incomplete')).length,
    scheduled: filteredSubs.filter(s => (s.status || '').toLowerCase().includes('scheduled')).length,
    published: filteredSubs.filter(s => (s.status || '').toLowerCase() === 'published').length,
    declined: filteredSubs.filter(s => (s.status || '').toLowerCase() === 'declined').length,
  };

  const displayName = profile?.givenName
    ? `${profile.givenName}${profile.familyName ? ' ' + profile.familyName : ''}`
    : (profile?.fullName || user?.name || user?.username || 'User');

  const initials = displayName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();

  const NavItem = ({ href, label, count, color = '#cbd5e1' }) => {
    const journalParam = currentJournal ? `?journal=${currentJournal}` : '';
    const fullHref = `${href}${journalParam}`;
    const active = isActive(href);
    const isActionRequired = label === 'Action Required by me';
    
    return (
      <Link href={fullHref} style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        padding: '10px 20px', fontSize: '12.5px', textDecoration: 'none',
        color: active ? '#fff' : '#005f96',
        backgroundColor: active ? '#002137' : 'transparent',
        borderLeft: active ? '4px solid #005f96' : '4px solid transparent',
        fontFamily: '"Noto Sans", sans-serif',
        transition: 'all 0.15s',
        fontWeight: active ? '500' : '400',
        borderBottom: '1px solid #f1f5f9',
      }}>
        <span style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          minWidth: '20px', height: '20px', borderRadius: '50%', fontSize: '10px',
          fontWeight: '700', 
          backgroundColor: active ? 'transparent' : (isActionRequired ? '#dc2626' : 'white'),
          color: active ? 'white' : (isActionRequired ? 'white' : '#005f96'),
          border: active ? '1.5px solid white' : (isActionRequired ? '1.5px solid #dc2626' : '1.5px solid #cbd5e1'),
        }}>{count}</span>
        <span style={{ flex: 1 }}>{label}</span>
      </Link>
    );
  };

  const SectionHeader = ({ icon: Icon, label, open, onToggle }) => (
    <button onClick={onToggle} style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '10px 16px', fontSize: '11px', fontWeight: '600', color: '#005f96',
      backgroundColor: '#f8fafc', border: 'none', borderTop: '1px solid #e2e8f0',
      borderBottom: '1px solid #e2e8f0', cursor: 'pointer', width: '100%', textAlign: 'left',
      fontFamily: '"Noto Sans", sans-serif', textTransform: 'none',
    }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Icon size={14} /> {label}
      </span>
      {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
    </button>
  );

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: '"Noto Sans", -apple-system, sans-serif', backgroundColor: '#fff' }}>

      {/* ── Top Blue Header ── */}
      <div style={{
        backgroundColor: '#002137', color: '#fff',
        display: 'flex', alignItems: 'center', padding: '0 20px',
        justifyContent: 'space-between', height: '40px',
      }}>
        <div style={{ fontWeight: '600', fontSize: '14px', letterSpacing: '0.02em' }}>
          {currentJournal === 'jeiml' ? 'Journal of Eye-Innovation in Machine Learning' : 'Journal of Eye Innovation in Security Analysis'}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 0 }}><Info size={18} /></button>
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowNotif(v => !v)}
              style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', position: 'relative' }}
            >
              <Bell size={18} />
              <span style={{ position: 'absolute', top: '-4px', right: '-4px', backgroundColor: '#dc2626', color: '#fff', width: '15px', height: '15px', borderRadius: '50%', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}>
                1
              </span>
            </button>
          </div>
          <div style={{
            width: '26px', height: '26px', borderRadius: '50%',
            backgroundColor: '#4e6d8a', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '12px', fontWeight: '600', cursor: 'pointer'
          }} onClick={handleLogout} title="Logout">
            SS
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1 }}>
        {/* ── Sidebar ── */}
        <aside style={{
          width: '240px', backgroundColor: '#fff', borderRight: '1px solid #e2e8f0',
          minHeight: 'calc(100vh - 40px)', flexShrink: 0, display: 'flex',
          flexDirection: 'column', overflowY: 'auto',
        }}>
          {/* My Assignments as Reviewer */}
          <SectionHeader icon={Edit3} label="My Assignments as Reviewer" open={reviewerOpen} onToggle={() => setReviewerOpen(!reviewerOpen)} />
          {reviewerOpen && (
            <div>
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
            <div>
              <NavItem href="/dashboard/submissions" label="Active submissions" count={counts.active} />
              <NavItem href="/dashboard/submissions/revisions-requested" label="Revisions requested" count={counts.revisionsRequested} />
              <NavItem href="/dashboard/submissions/revisions-submitted" label="Revisions submitted" count={counts.revisionsSubmitted} />
              <NavItem href="/dashboard/submissions/incomplete" label="Incomplete submissions" count={counts.incomplete} />
              <NavItem href="/dashboard/submissions/scheduled" label="Scheduled for publication" count={counts.scheduled} />
              <NavItem href="/dashboard/submissions/published" label="Published" count={counts.published} />
              <NavItem href="/dashboard/submissions/declined" label="Declined" count={counts.declined} />
              <div style={{ padding: '12px 20px' }}>
                <Link href={`/dashboard/submit${currentJournal ? '?journal='+currentJournal : ''}`} style={{ fontSize: '13px', color: '#005f96', textDecoration: 'none', fontWeight: '600' }}>Start A New Submission</Link>
              </div>
            </div>
          )}
        </aside>

        {/* ── Main Content ── */}
        <main style={{ flex: 1, backgroundColor: '#fff', position: 'relative' }}>
          {children}
        </main>
      </div>

      <style jsx global>{`
        body { margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
    </div>
  );
}
