'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, ChevronUp, ChevronDown, X, SlidersHorizontal, MoreHorizontal, FileText } from 'lucide-react';

const STATUS_COLORS = {
  'Submitted':   { dot: '#9333ea', bg: '#faf5ff', text: '#7e22ce' },
  'Review':      { dot: '#2563eb', bg: '#eff6ff', text: '#1d4ed8' },
  'Copyediting': { dot: '#0891b2', bg: '#ecfeff', text: '#0e7490' },
  'Production':  { dot: '#0d9488', bg: '#f0fdfa', text: '#0f766e' },
  'Published':   { dot: '#16a34a', bg: '#f0fdf4', text: '#15803d' },
  'Declined':    { dot: '#dc2626', bg: '#fef2f2', text: '#b91c1c' },
  'Scheduled':   { dot: '#ca8a04', bg: '#fefce8', text: '#a16207' },
  'Incomplete':  { dot: '#f97316', bg: '#fff7ed', text: '#c2410c' },
  'Unassigned':  { dot: '#64748b', bg: '#f8fafc', text: '#475569' },
};

function getStatusStyle(status) {
  if (!status) return STATUS_COLORS['Unassigned'];
  for (const key of Object.keys(STATUS_COLORS)) {
    if (status.toLowerCase().includes(key.toLowerCase())) return STATUS_COLORS[key];
  }
  return STATUS_COLORS['Unassigned'];
}

function FiltersPanel({ onClose, onApply }) {
  const [days, setDays] = useState(0);
  const [issue, setIssue] = useState('');
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', fontFamily: '"Noto Sans", sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '20px 24px', borderBottom: '1px solid #e2e8f0' }}>
        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#475569', padding: '4px', display: 'flex' }}>
          <X size={18} />
        </button>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#1e293b' }}>Filters</h3>
      </div>

      <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '8px' }}>Issues</label>
          <input
            type="text"
            value={issue}
            onChange={e => setIssue(e.target.value)}
            placeholder="Search by issue..."
            style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '4px', padding: '9px 12px', fontSize: '13px', outline: 'none', boxSizing: 'border-box', fontFamily: '"Noto Sans", sans-serif' }}
          />
        </div>

        <div style={{ marginBottom: '32px' }}>
          <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#475569', marginBottom: '8px' }}>Days since last activity</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input
              type="range" min="0" max="180" value={days}
              onChange={e => setDays(Number(e.target.value))}
              style={{ flex: 1, accentColor: '#005f96', height: '4px' }}
            />
            <input
              type="number" value={days}
              onChange={e => setDays(Math.max(0, Math.min(180, Number(e.target.value))))}
              style={{ width: '64px', border: '1px solid #cbd5e1', borderRadius: '4px', padding: '6px 8px', fontSize: '13px', outline: 'none', textAlign: 'center', fontFamily: '"Noto Sans", sans-serif' }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8', marginTop: '6px' }}>
            <span>0 days</span><span>180 days</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', borderTop: '1px solid #e2e8f0', padding: '16px 24px' }}>
        <button onClick={() => { setDays(0); setIssue(''); }} style={{ background: 'none', border: '1px solid #cbd5e1', borderRadius: '4px', padding: '8px 16px', fontSize: '13px', cursor: 'pointer', color: '#475569', fontFamily: '"Noto Sans", sans-serif' }}>
          Clear Filters
        </button>
        <button onClick={() => onApply({ days, issue })} style={{ backgroundColor: '#005f96', color: '#fff', border: 'none', borderRadius: '4px', padding: '8px 20px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', fontFamily: '"Noto Sans", sans-serif' }}>
          Apply Filters
        </button>
      </div>
    </div>
  );
}

export default function SubmissionsTable({ title, filterFn, columns = 'author', extraMenuItems }) {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [sortDir, setSortDir] = useState('desc');
  const [showFilters, setShowFilters] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [activeFilters, setActiveFilters] = useState({ days: 0, issue: '' });
  const menuRef = useRef(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const token = localStorage.getItem('eisr_token');
        const res = await fetch('/api/submissions', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success) {
          setSubmissions(data.submissions);
        } else {
          setError(data.message || 'Failed to load submissions');
        }
      } catch (err) {
        setError('Could not connect to server');
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setShowMenu(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const filtered = submissions
    .filter(sub => filterFn ? filterFn(sub) : true)
    .filter(sub => {
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        String(sub.id).includes(q) ||
        (sub.title || '').toLowerCase().includes(q) ||
        (sub.status || '').toLowerCase().includes(q)
      );
    })
    .sort((a, b) => sortDir === 'asc' ? a.id - b.id : b.id - a.id);

  const isAuthor = columns === 'author';

  const gridCols = isAuthor
    ? '80px 1fr 160px 180px 160px 80px'
    : '80px 1fr 200px 160px 80px';

  return (
    <div style={{ padding: '28px 36px', width: '100%', boxSizing: 'border-box', fontFamily: '"Noto Sans", sans-serif' }}>
      {/* Filters Drawer */}
      {showFilters && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200 }}>
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.25)' }} onClick={() => setShowFilters(false)} />
          <div style={{ position: 'absolute', top: 0, left: 0, width: '420px', height: '100%', backgroundColor: '#fff', boxShadow: '4px 0 24px rgba(0,0,0,0.15)', zIndex: 201 }}>
            <FiltersPanel onClose={() => setShowFilters(false)} onApply={(f) => { setActiveFilters(f); setShowFilters(false); }} />
          </div>
        </div>
      )}

      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: '400', color: '#1a1a1a', margin: '0 0 4px 0' }}>
            {title}{' '}
            <span style={{ fontSize: '18px', color: '#64748b' }}>
              ({loading ? '—' : filtered.length})
            </span>
          </h1>
          {(activeFilters.days > 0 || activeFilters.issue) && (
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
              {activeFilters.issue && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2px 10px', backgroundColor: '#eff6ff', color: '#1d4ed8', borderRadius: '12px', fontSize: '12px', fontWeight: '500' }}>
                  Issue: {activeFilters.issue}
                  <button onClick={() => setActiveFilters(f => ({ ...f, issue: '' }))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1d4ed8', padding: 0, lineHeight: 1 }}>×</button>
                </span>
              )}
              {activeFilters.days > 0 && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2px 10px', backgroundColor: '#eff6ff', color: '#1d4ed8', borderRadius: '12px', fontSize: '12px', fontWeight: '500' }}>
                  Last activity: {activeFilters.days} days
                  <button onClick={() => setActiveFilters(f => ({ ...f, days: 0 }))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1d4ed8', padding: 0, lineHeight: 1 }}>×</button>
                </span>
              )}
            </div>
          )}
        </div>
        <Link href="/dashboard/submit" style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          backgroundColor: '#005f96', color: '#fff', padding: '8px 18px',
          borderRadius: '4px', fontSize: '13px', fontWeight: '700', textDecoration: 'none',
        }}>
          + New Submission
        </Link>
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', position: 'relative' }} ref={menuRef}>
          <button
            onClick={() => setShowFilters(true)}
            style={{ background: '#fff', border: '1px solid #cbd5e1', color: '#475569', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '13px', padding: '7px 14px', borderRadius: '4px', fontFamily: '"Noto Sans", sans-serif' }}
          >
            <SlidersHorizontal size={13} /> Filters
          </button>
          {(extraMenuItems || []).length > 0 && (
            <>
              <button
                onClick={() => setShowMenu(v => !v)}
                style={{ background: '#fff', border: '1px solid #cbd5e1', color: '#475569', cursor: 'pointer', padding: '7px 10px', borderRadius: '4px', display: 'flex', alignItems: 'center' }}
              >
                <MoreHorizontal size={16} />
              </button>
              {showMenu && (
                <div style={{ position: 'absolute', top: '40px', left: '0', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', zIndex: 50, minWidth: '240px', overflow: 'hidden' }}>
                  {extraMenuItems.map((item, i) => (
                    <button key={i} onClick={() => { item.onClick?.(); setShowMenu(false); }}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%', padding: '10px 16px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', color: item.danger ? '#dc2626' : '#334155', textAlign: 'left', fontFamily: '"Noto Sans", sans-serif' }}>
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        <div style={{ position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none' }} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by ID, title, status..."
            style={{ border: '1px solid #cbd5e1', borderRadius: '4px', padding: '8px 34px 8px 12px', fontSize: '13px', outline: 'none', width: '280px', fontFamily: '"Noto Sans", sans-serif', backgroundColor: '#fff' }}
          />
        </div>
      </div>

      {/* Table */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
        {/* Header Row */}
        <div style={{ display: 'grid', gridTemplateColumns: gridCols, backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
          <div onClick={() => setSortDir(d => d === 'asc' ? 'desc' : 'asc')} style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', userSelect: 'none', letterSpacing: '0.06em' }}>
            ID
            <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 0, marginLeft: '2px' }}>
              <ChevronUp size={9} style={{ color: sortDir === 'asc' ? '#005f96' : '#cbd5e1', marginBottom: '-1px' }} />
              <ChevronDown size={9} style={{ color: sortDir === 'desc' ? '#005f96' : '#cbd5e1' }} />
            </span>
          </div>
          <div style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em' }}>SUBMISSIONS</div>
          {isAuthor && <div style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em' }}>STAGE</div>}
          <div style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em' }}>EDITORIAL ACTIVITY</div>
          <div style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em' }}>DATE SUBMITTED</div>
          <div style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em', textAlign: 'right' }}>ACTIONS</div>
        </div>

        {/* Content */}
        {loading ? (
          <div style={{ padding: '48px', textAlign: 'center' }}>
            <div style={{ display: 'inline-block', width: '24px', height: '24px', border: '3px solid #e2e8f0', borderTopColor: '#005f96', borderRadius: '50%', animation: 'spin 0.7s linear infinite', marginBottom: '12px' }} />
            <div style={{ fontSize: '13px', color: '#64748b' }}>Loading submissions...</div>
          </div>
        ) : error ? (
          <div style={{ padding: '40px', textAlign: 'center', fontSize: '13px', color: '#dc2626' }}>
            Error: {error}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center' }}>
            <FileText size={32} style={{ color: '#cbd5e1', display: 'block', margin: '0 auto 12px' }} />
            <div style={{ fontSize: '14px', color: '#64748b', fontWeight: '500' }}>No submissions found</div>
            <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px' }}>
              {search ? 'Try adjusting your search' : 'Start a new submission to see it here'}
            </div>
          </div>
        ) : filtered.map((sub, idx) => {
          const style = getStatusStyle(sub.status);
          return (
            <div key={sub.id} style={{
              display: 'grid', gridTemplateColumns: gridCols,
              borderBottom: idx < filtered.length - 1 ? '1px solid #f1f5f9' : 'none',
              alignItems: 'center',
              backgroundColor: idx % 2 === 0 ? '#fff' : '#fafcff',
              transition: 'background 0.15s',
            }}>
              <div style={{ padding: '14px 16px', fontSize: '13px', color: '#64748b', fontWeight: '600' }}>
                #{sub.id}
              </div>
              <div style={{ padding: '14px 16px' }}>
                <Link href={`/dashboard/submissions/${sub.id}`} style={{ color: '#005f96', textDecoration: 'none', fontSize: '14px', fontWeight: '500', lineHeight: '1.5', display: 'block' }}>
                  {sub.title}
                </Link>
              </div>
              {isAuthor && (
                <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '7px' }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                    padding: '3px 10px', borderRadius: '12px', fontSize: '12px', fontWeight: '500',
                    backgroundColor: style.bg, color: style.text,
                  }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: style.dot, display: 'inline-block', flexShrink: 0 }} />
                    {sub.status || 'Submitted'}
                  </span>
                </div>
              )}
              <div style={{ padding: '14px 16px', fontSize: '13px', color: '#64748b' }}>
                {sub.activity || '—'}
              </div>
              <div style={{ padding: '14px 16px', fontSize: '12px', color: '#94a3b8' }}>
                {sub.date || (sub.created_at ? new Date(sub.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '—')}
              </div>
              <div style={{ padding: '14px 16px', textAlign: 'right' }}>
                <Link href={`/dashboard/submissions/${sub.id}`} style={{
                  color: '#005f96', textDecoration: 'none', fontSize: '12px', fontWeight: '600',
                  padding: '5px 12px', border: '1px solid #bfdbfe', borderRadius: '4px',
                  backgroundColor: '#eff6ff', display: 'inline-block',
                  transition: 'all 0.15s',
                }}>
                  View
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      {!loading && (
        <div style={{ marginTop: '12px', fontSize: '13px', color: '#94a3b8', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>
            Showing <strong style={{ color: '#475569' }}>{filtered.length > 0 ? 1 : 0}</strong> – <strong style={{ color: '#475569' }}>{filtered.length}</strong> of <strong style={{ color: '#475569' }}>{filtered.length}</strong> submissions
          </span>
          {search && (
            <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#005f96', fontSize: '13px', fontFamily: '"Noto Sans", sans-serif', textDecoration: 'underline' }}>
              Clear search
            </button>
          )}
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        a:hover { opacity: 0.85; }
      `}</style>
    </div>
  );
}
