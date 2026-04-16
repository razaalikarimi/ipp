'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronUp, ChevronDown, Edit3, FileText, Plus, Bell, User, X, Info } from 'lucide-react';
import { journals } from '@/lib/data';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [reviewerSubmissions, setReviewerSubmissions] = useState([]);
  const [reviewerOpen, setReviewerOpen] = useState(true);
  const [authorOpen, setAuthorOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(true);
  const [editorSubmissions, setEditorSubmissions] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotif, setShowNotif] = useState(false);
  const [readNotifs, setReadNotifs] = useState([]);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

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

    const savedRead = localStorage.getItem('eisr_read_notifs');
    if (savedRead) setReadNotifs(JSON.parse(savedRead));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('eisr_token');
        if (!token) return;

        // Fetch submissions with optional journal filter
        let url = '/api/submissions';
        if (currentJournal) url += `?journal=${currentJournal}`;
        
        const subRes = await fetch(`${url}${url.includes('?') ? '&' : '?'}t=${Date.now()}`, { 
          headers: { 'Authorization': `Bearer ${token}` },
          cache: 'no-store'
        });
        const subData = await subRes.json();
        if (subData.success) {
          setSubmissions(subData.submissions);
        }

        // Fetch Reviewer Submissions
        let revUrl = '/api/submissions?role=reviewer';
        if (currentJournal) revUrl += `&journal=${currentJournal}`;
        const revRes = await fetch(`${revUrl}&t=${Date.now()}`, { 
          headers: { 'Authorization': `Bearer ${token}` },
          cache: 'no-store'
        });
        const revData = await revRes.json();
        if (revData.success) {
          setReviewerSubmissions(revData.submissions);
        }

        // Determine User Role
        let payloadRole = 'author';
        try { payloadRole = JSON.parse(atob(token.split('.')[1])).role || 'author'; } catch(e){}

        if (payloadRole === 'editor' || payloadRole === 'admin') {
          let edUrl = '/api/submissions?role=editor';
          if (currentJournal) edUrl += `&journal=${currentJournal}`;
          const edRes = await fetch(`${edUrl}&t=${Date.now()}`, { 
            headers: { 'Authorization': `Bearer ${token}` },
            cache: 'no-store'
          });
          const edData = await edRes.json();
          if (edData.success) {
            setEditorSubmissions(edData.submissions);
          }
        }
        
        // Notification generation logic...
        let generated = [];
        if (payloadRole === 'reviewer') {
          const pending = revData.submissions?.filter(s => ['pending', 'accepted'].includes((s.status || '').toLowerCase())) || [];
          pending.forEach(s => generated.push({ id: `rev-${s.id}`, title: 'Pending Review', msg: `Review required for "${s.title.substring(0, 30)}..."`, link: `/dashboard/reviewer/assignments/${s.id}` }));
        } else if (payloadRole === 'editor' || payloadRole === 'admin') {
          const newSubs = subData.submissions.filter(s => (s.status || '').toLowerCase() === 'submitted' && (s.activity || '').toLowerCase() === 'unassigned');
          newSubs.forEach(s => generated.push({ id: `new-${s.id}`, title: 'New Submission', msg: `"${s.title.substring(0, 30)}..." needs Editor attention.`, link: `/dashboard/submissions/${s.id}` }));
        }
        setNotifications(generated.slice(0, 5));

        // Fetch profile
        const profRes = await fetch('/api/profile', { headers: { 'Authorization': `Bearer ${token}` } });
        const profData = await profRes.json();
        if (profData.success) setProfile(profData.profile);
      } catch {}
    };

    fetchData();

    // Live Sync: Refresh data every 60 seconds or on custom event
    const interval = setInterval(fetchData, 60000);
    window.addEventListener('eisr_refresh_data', fetchData);

    return () => {
      clearInterval(interval);
      window.removeEventListener('eisr_refresh_data', fetchData);
    };
  }, [currentJournal]);

  const handleLogout = () => { localStorage.removeItem('eisr_token'); router.push('/login'); };

  const handleNotifClick = (n) => {
    if (!readNotifs.includes(n.id)) {
      const updated = [...readNotifs, n.id];
      setReadNotifs(updated);
      localStorage.setItem('eisr_read_notifs', JSON.stringify(updated));
    }
    setShowNotif(false);
    router.push(n.link);
  };

  const unreadCount = notifications.filter(n => !readNotifs.includes(n.id)).length;

  const isActive = (href) => {
    if (href === '/dashboard' && pathname === '/dashboard') return true;
    if (href !== '/dashboard' && pathname.startsWith(href)) return true;
    return false;
  };

  // Compute counts from real data, MUST respect current journal filter to match pages
  const jId = currentJournal === 'jeiml' ? 'jeiml' : (currentJournal ? 'jcsra' : null);
  
  const filteredAuthor = jId ? submissions.filter(s => s.journal_id === jId) : submissions;
  const filteredEditor = jId ? editorSubmissions.filter(s => s.journal_id === jId) : editorSubmissions;
  const filteredReviewer = jId ? reviewerSubmissions.filter(s => s.journal_id === jId) : reviewerSubmissions;

  const counts = {
    active: filteredAuthor.filter(s => !['Declined', 'Published'].includes(s.status)).length,
    revisionsRequested: filteredAuthor.filter(s => (s.status || '').toLowerCase().includes('revision')).length,
    revisionsSubmitted: filteredAuthor.filter(s => (s.status || '').toLowerCase().includes('revisions submitted')).length,
    incomplete: filteredAuthor.filter(s => (s.status || '').toLowerCase().includes('incomplete')).length,
    scheduled: filteredAuthor.filter(s => (s.status || '').toLowerCase().includes('scheduled')).length,
    published: filteredAuthor.filter(s => (s.status || '').toLowerCase() === 'published').length,
    declined: filteredAuthor.filter(s => (s.status || '').toLowerCase() === 'declined').length,
    
    // Reviewer counts
    revAction: filteredReviewer.filter(s => ['pending', 'accepted'].includes((s.status || '').toLowerCase())).length,
    revAll: filteredReviewer.length,
    revCompleted: filteredReviewer.filter(s => (s.status || '').toLowerCase() === 'completed').length,
    revDeclined: filteredReviewer.filter(s => (s.status || '').toLowerCase() === 'declined').length,
    revPublished: filteredReviewer.filter(s => (s.submission_status || '').toLowerCase() === 'published').length,
    revArchived: filteredReviewer.filter(s => (s.status || '').toLowerCase() === 'archived').length,

    // Editorial counts
    edUnassigned: filteredEditor.filter(s => {
      const act = (s.activity || '').toLowerCase();
      return act === 'unassigned' || act.includes('declined');
    }).length,
    edReview: filteredEditor.filter(s => {
      const act = (s.activity || '').toLowerCase();
      return act.includes('review') && !act.includes('declined');
    }).length,
    edPublished: filteredEditor.filter(s => (s.status || '').toLowerCase() === 'published').length,
    edDeclined: filteredEditor.filter(s => (s.status || '').toLowerCase() === 'declined').length,
    edTotal: filteredEditor.length,
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

  // Compute the header title based on current journal context
  const targetJournalData = journals.find(j => j.id === currentJournal);
  const headerTitle = targetJournalData ? targetJournalData.title : 'EISR - Academic Publishing Portal';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: '"Noto Sans", -apple-system, sans-serif', backgroundColor: '#fff' }}>

      {/* ── Top Blue Header ── */}
      <div style={{
        backgroundColor: '#002137', color: '#fff',
        display: 'flex', alignItems: 'center', padding: '0 20px',
        justifyContent: 'space-between', height: '40px',
      }}>
        <div style={{ fontWeight: '600', fontStyle: targetJournalData ? 'normal' : 'italic', fontSize: '14px', letterSpacing: '0.02em', color: targetJournalData ? '#fff' : '#4BA6B9' }}>
          {headerTitle}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 0 }}><Info size={18} /></button>
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => { setShowNotif(v => !v); setShowProfileMenu(false); }}
              style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', position: 'relative' }}
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span style={{ position: 'absolute', top: '-4px', right: '-4px', backgroundColor: '#dc2626', color: '#fff', width: '15px', height: '15px', borderRadius: '50%', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}>
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotif && (
              <div style={{
                position: 'absolute', top: '35px', right: '-10px',
                backgroundColor: '#fff', color: '#333',
                border: '1px solid #e2e8f0', borderRadius: '4px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                width: '280px', zIndex: 50,
                display: 'flex', flexDirection: 'column',
                maxHeight: '350px'
              }}>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontWeight: '700', color: '#1e293b', fontSize: '14px' }}>Notifications</div>
                  {unreadCount > 0 && <span style={{ fontSize: '11px', color: '#005f96', cursor: 'pointer', fontWeight: '600' }} onClick={() => {
                    const allIds = notifications.map(n => n.id);
                    setReadNotifs(allIds);
                    localStorage.setItem('eisr_read_notifs', JSON.stringify(allIds));
                  }}>Mark all as read</span>}
                </div>
                
                <div style={{ overflowY: 'auto', flex: 1 }}>
                  {notifications.length === 0 ? (
                    <div style={{ padding: '20px', textAlign: 'center', color: '#64748b', fontSize: '13px' }}>No new notifications</div>
                  ) : (
                    notifications.map(n => {
                      const isUnread = !readNotifs.includes(n.id);
                      return (
                        <div key={n.id} onClick={() => handleNotifClick(n)} style={{ 
                          padding: '12px 16px', borderBottom: '1px solid #f1f5f9', cursor: 'pointer',
                          backgroundColor: isUnread ? '#f0f9ff' : '#fff',
                          transition: 'background-color 0.2s'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = isUnread ? '#e0f2fe' : '#f8fafc'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = isUnread ? '#f0f9ff' : '#fff'}>
                          <div style={{ fontWeight: '600', fontSize: '13px', color: isUnread ? '#0284c7' : '#334155', display: 'flex', justifyContent: 'space-between' }}>
                            {n.title}
                            {isUnread && <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#0284c7', marginTop: '4px' }}></span>}
                          </div>
                          <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px', lineHeight: '1.4' }}>{n.msg}</div>
                        </div>
                      )
                    })
                  )}
                </div>
              </div>
            )}
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{
              width: '26px', height: '26px', borderRadius: '50%',
              backgroundColor: '#4e6d8a', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '12px', fontWeight: '600', cursor: 'pointer'
            }} onClick={() => { setShowProfileMenu(!showProfileMenu); setShowNotif(false); }}>
              {initials}
            </div>

            {showProfileMenu && (
              <div style={{
                position: 'absolute', top: '35px', right: '0',
                backgroundColor: '#fff', color: '#333',
                border: '1px solid #e2e8f0', borderRadius: '4px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                width: '180px', zIndex: 50,
                fontSize: '13px', display: 'flex', flexDirection: 'column'
              }}>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>
                  <div style={{ fontWeight: '600', color: '#1e293b', wordBreak: 'break-all' }}>{displayName}</div>
                  {user?.username && <div style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>@{user.username}</div>}
                  {user?.email && <div style={{ fontSize: '11px', color: '#64748b', wordBreak: 'break-all' }}>{user.email}</div>}
                </div>
                <button 
                  onClick={handleLogout}
                  style={{
                    padding: '10px 16px', border: 'none', background: 'none',
                    textAlign: 'left', cursor: 'pointer', color: '#dc2626',
                    fontFamily: '"Noto Sans", sans-serif', fontSize: '13px',
                    fontWeight: '600', display: 'block', width: '100%'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#fef2f2'}
                  onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  Logout
                </button>
              </div>
            )}
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
          {/* Editorial Dashboard (Visible to Editors/Admins) */}
          {(user?.role === 'editor' || user?.role === 'admin') && (
            <>
              <SectionHeader icon={Plus} label="Editorial Dashboard" open={editorOpen} onToggle={() => setEditorOpen(!editorOpen)} />
              {editorOpen && (
                <div style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <NavItem href="/dashboard/submissions" label="All Submissions" count={counts.edTotal} />
                  <NavItem href="/dashboard/submissions/unassigned" label="Unassigned" count={counts.edUnassigned} />
                  <NavItem href="/dashboard/submissions/in-review" label="In Review" count={counts.edReview} />
                  <NavItem href="/dashboard/submissions/published" label="Published" count={counts.edPublished} />
                  <NavItem href="/dashboard/submissions/declined" label="Declined Submissions" count={counts.edDeclined} />
                </div>
              )}
            </>
          )}

          {/* My Assignments as Reviewer */}
          <SectionHeader icon={Edit3} label="My Assignments as Reviewer" open={reviewerOpen} onToggle={() => setReviewerOpen(!reviewerOpen)} />
          {reviewerOpen && (
            <div>
              <NavItem href="/dashboard/reviewer/action-required" label="Action Required by me" count={counts.revAction} />
              <NavItem href="/dashboard/reviewer/all" label="All assignments" count={counts.revAll} />
              <NavItem href="/dashboard/reviewer/completed" label="Completed" count={counts.revCompleted} />
              <NavItem href="/dashboard/reviewer/declined" label="Declined Invitations" count={counts.revDeclined} />
              <NavItem href="/dashboard/reviewer/published" label="Published" count={counts.revPublished} />
              <NavItem href="/dashboard/reviewer/archived" label="Archived" count={counts.revArchived} />
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
              <NavItem href="/dashboard/submissions/declined" label="Declined Submissions" count={counts.declined} />
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
