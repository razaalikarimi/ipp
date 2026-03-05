'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Bell, Info, ChevronUp, ChevronDown, Edit3, FileText } from 'lucide-react';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [reviewerOpen, setReviewerOpen] = useState(true);
  const [authorOpen, setAuthorOpen] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('eisr_token');
    if (!token) {
      router.push('/login');
      return;
    }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser(payload);
    } catch {
      router.push('/login');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('eisr_token');
    router.push('/login');
  };

  const isActive = (href) => {
    if (href === '/dashboard' && pathname === '/dashboard') return true;
    if (href !== '/dashboard' && pathname.startsWith(href)) return true;
    return false;
  };

  const navLinkStyle = (href) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px 16px',
    fontSize: '13px',
    color: isActive(href) ? '#fff' : '#005f96',
    textDecoration: 'none',
    backgroundColor: isActive(href) ? '#003a5c' : 'transparent',
    cursor: 'pointer',
    transition: 'all 0.1s',
  });

  const sectionHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 16px',
    fontSize: '13px',
    fontWeight: '700',
    color: '#005f96',
    backgroundColor: '#fff',
    border: 'none',
    borderBottom: '1px solid #e0e0e0',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left'
  };

  const badgeStyle = (type, count) => {
    const isRed = type === 'action' && count > 0;
    const isBlueSolid = type === 'active' && count > 0;
    const isSolid = isRed || isBlueSolid;
    
    return {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '20px',
      height: '20px',
      borderRadius: '10px',
      fontSize: '11px',
      fontWeight: '600',
      color: isSolid ? '#fff' : '#005f96',
      backgroundColor: isRed ? '#d32f2f' : (isBlueSolid ? '#005f96' : '#fff'),
      border: isSolid ? 'none' : '1px solid #005f96',
      padding: '0 6px',
    };
  };

  const NavItem = ({ href, label, count, type }) => (
    <Link href={href} style={navLinkStyle(href)}>
      {count !== undefined && <span style={badgeStyle(type, count)}>{count}</span>}
      <span>{label}</span>
    </Link>
  );

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: '"Noto Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', backgroundColor: '#f1f5f9' }}>

      {/* ── Top Header Bar ── */}
      <div style={{ backgroundColor: '#002f4c', color: '#fff', height: '48px', display: 'flex', alignItems: 'center', padding: '0 20px', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ fontSize: '15px', fontWeight: '700', color: '#fff', letterSpacing: '0.5px' }}>
          Journal of Cyber Security and Risk Auditing
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '0', display: 'flex', alignItems: 'center' }}>
            <span style={{ fontStyle: 'italic', fontFamily: 'serif', fontSize: '18px', fontWeight: 'bold' }}>i</span>
          </button>
          <button style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '0', display: 'flex', alignItems: 'center' }}>
            <Bell size={18} />
          </button>
          <div onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <div style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: '#fff', color: '#002f4c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>
              {user?.name?.slice(0, 2)?.toUpperCase() || 'SS'}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, maxWidth: '1400px', margin: '0 auto', width: '100%' }}>

        {/* ── Sidebar ── */}
        <aside style={{ width: '250px', backgroundColor: '#fff', borderRight: '1px solid #e2e8f0', minHeight: 'calc(100vh - 48px)', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>

          {/* My Assignments as Reviewer */}
          <div style={{ borderBottom: '1px solid #e2e8f0' }}>
            <button onClick={() => setReviewerOpen(!reviewerOpen)} style={sectionHeaderStyle}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Edit3 size={15} /> My Assignments as Reviewer</span>
              {reviewerOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            {reviewerOpen && (
              <div style={{ padding: '0' }}>
                <NavItem href="/dashboard/reviewer/action-required" label="Action Required by me" count={0} type="action" />
                <NavItem href="/dashboard/reviewer/all" label="All assignments" count={0} type="outline" />
                <NavItem href="/dashboard/reviewer/completed" label="Completed" count={0} type="outline" />
                <NavItem href="/dashboard/reviewer/declined" label="Declined" count={0} type="outline" />
                <NavItem href="/dashboard/reviewer/published" label="Published" count={0} type="outline" />
                <NavItem href="/dashboard/reviewer/archived" label="Archived" count={0} type="outline" />
              </div>
            )}
          </div>

          {/* My Submissions as Author */}
          <div style={{ borderBottom: '1px solid #e2e8f0' }}>
            <button onClick={() => setAuthorOpen(!authorOpen)} style={sectionHeaderStyle}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><FileText size={15} /> My Submissions as Author</span>
              {authorOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            {authorOpen && (
              <div style={{ padding: '0' }}>
                <NavItem href="/dashboard/submissions" label="Active submissions" count={1} type="active" />
                <NavItem href="/dashboard/submissions/revisions-requested" label="Revisions requested" count={0} type="outline" />
                <NavItem href="/dashboard/submissions/revisions-submitted" label="Revisions submitted" count={0} type="outline" />
                <NavItem href="/dashboard/submissions/incomplete" label="Incomplete submissions" count={0} type="outline" />
                <NavItem href="/dashboard/submissions/scheduled" label="Scheduled for publication" count={0} type="outline" />
                <NavItem href="/dashboard/submissions/published" label="Published" count={0} type="outline" />
                <NavItem href="/dashboard/submissions/declined" label="Declined" count={0} type="outline" />
                <div style={{ padding: '8px 16px', marginTop: '4px' }}>
                  <Link href="/dashboard/submit" style={{ fontSize: '13px', color: '#005f96', textDecoration: 'none' }}>
                    Start A New Submission
                  </Link>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main style={{ flex: 1, padding: '0', overflowX: 'auto', backgroundColor: '#f1f5f9' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
