'use client';
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, ChevronUp, ChevronDown, X, SlidersHorizontal, MoreHorizontal, FileText, ChevronsUpDown } from 'lucide-react';

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

export default function SubmissionsTable({ title, filterFn, columns = 'reviewer', extraMenuItems }) {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [sortDir, setSortDir] = useState('asc');
  const [showFilters, setShowFilters] = useState(false);
  const [filterDays, setFilterDays] = useState(0);
  const [filterIssue, setFilterIssue] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const searchParams = useSearchParams();
  const journalId = searchParams.get('journal');

  useEffect(() => {
    const fetchSubmissions = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('eisr_token');
        let url = `/api/submissions?role=${columns}&t=${Date.now()}`;
        if (journalId) url += `&journal=${journalId}`;
        
        const res = await fetch(url, {
          headers: { 'Authorization': `Bearer ${token}` },
          cache: 'no-store'
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
  }, [columns, journalId]);

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

  const isReviewer = columns === 'reviewer';
  const isAuthor = columns === 'author';
  const gridCols = isReviewer ? '60px 1fr 120px 120px' : '60px 1fr 160px 180px 120px';

  return (
    <div style={{ padding: '24px 20px', width: '100%', boxSizing: 'border-box', fontFamily: '"Noto Sans", sans-serif' }}>
      
      {/* Title Area */}
      <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#333', margin: '0 0 24px 0', display: 'flex', alignItems: 'center', gap: '12px' }}>
        {title} ({loading ? '0' : filtered.length})
        {loading && (
          <div style={{ 
            width: '20px', height: '20px', border: '2px solid #e2e8f0', 
            borderTopColor: '#005f96', borderRadius: '50%', 
            animation: 'spin 1s linear infinite'
          }} />
        )}
      </h1>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{ 
              background: '#fff', border: '1px solid #cbd5e1', color: '#005f96', 
              fontSize: '13px', padding: '6px 14px', borderRadius: '4px', cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Filters
          </button>
          
          {isAuthor && (title === 'Active submissions' || title === 'Incomplete submissions') && (
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setShowMenu(!showMenu)}
                style={{ background: 'none', border: 'none', color: '#005f96', cursor: 'pointer', padding: '4px' }}
              >
                <MoreHorizontal size={20} />
              </button>
              {showMenu && (
                <div style={{
                  position: 'absolute', top: '30px', left: 0, backgroundColor: '#fff', 
                  border: '1px solid #ddd', borderRadius: '4px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  zIndex: 10, width: '220px', overflow: 'hidden'
                }}>
                  <button style={{ 
                    width: '100%', padding: '10px 15px', textAlign: 'left', background: 'none', 
                    border: 'none', fontSize: '13px', cursor: 'pointer', color: '#444',
                    display: 'flex', alignItems: 'center', gap: '8px'
                  }}>
                    <X size={14} /> Delete Incomplete Submissions
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
             <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
             <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search submissions, ID, authors, k..."
                style={{ 
                  border: '1px solid #cbd5e1', borderRadius: '4px', 
                  padding: '7px 12px 7px 32px', fontSize: '13px', outline: 'none', 
                  width: '280px', backgroundColor: '#fff' 
                }}
              />
          </div>
        </div>
      </div>

      {/* Inline Filters Panel */}
      {showFilters && (
        <div style={{ 
          backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '4px', 
          marginBottom: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflow: 'hidden'
        }}>
          <div style={{ 
            backgroundColor: '#f8fafc', padding: '12px 20px', borderBottom: '1px solid #e2e8f0',
            display: 'flex', alignItems: 'center'
          }}>
            <button 
              onClick={() => setShowFilters(false)}
              style={{ background: 'none', border: 'none', color: '#005f96', fontSize: '18px', fontWeight: '400', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
            >
              <div style={{ border: '1px solid #005f96', borderRadius: '2px', display: 'flex', padding: '1px' }}><ChevronUp size={14} style={{ transform: 'rotate(-90deg)' }} /></div>
              Filters
            </button>
          </div>
          
          <div style={{ padding: '24px' }}>
            <div style={{ maxWidth: '800px' }}>
              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#333', marginBottom: '8px' }}>Issues</label>
                <input 
                  type="text" 
                  value={filterIssue}
                  onChange={e => setFilterIssue(e.target.value)}
                  style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '4px', padding: '8px 12px', fontSize: '13px' }}
                />
              </div>
              <div style={{ marginBottom: '32px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#333', marginBottom: '8px' }}>Days since last activity</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{ flex: 1, position: 'relative', height: '20px', display: 'flex', alignItems: 'center' }}>
                    <span style={{ position: 'absolute', left: 0, bottom: '-15px', fontSize: '10px', color: '#999' }}>0</span>
                    <input 
                      type="range" min="0" max="180" 
                      value={filterDays}
                      onChange={e => setFilterDays(Number(e.target.value))}
                      style={{ width: '100%', accentColor: '#005f96' }} 
                    />
                    <span style={{ position: 'absolute', right: 0, bottom: '-15px', fontSize: '10px', color: '#999' }}>180</span>
                  </div>
                  <input 
                    type="number" value={filterDays}
                    onChange={e => setFilterDays(Number(e.target.value))}
                    style={{ width: '120px', border: '1px solid #cbd5e1', borderRadius: '4px', padding: '6px 10px', textAlign: 'left', fontSize: '13px' }}
                  />
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '40px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
              <button 
                onClick={() => { setFilterDays(0); setFilterIssue(''); }} 
                style={{ background: '#fff', border: '1px solid #cbd5e1', color: '#333', padding: '7px 15px', borderRadius: '4px', fontSize: '13px', cursor: 'pointer' }}
              >
                Clear Filters
              </button>
              <button 
                onClick={() => setShowFilters(false)}
                style={{ backgroundColor: '#005f96', color: '#fff', border: 'none', borderRadius: '4px', padding: '7px 20px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '2px', overflow: 'hidden' }}>
        {/* Header Row */}
        <div style={{ display: 'grid', gridTemplateColumns: gridCols, backgroundColor: '#e9f1f7', borderBottom: '1px solid #cbd5e1' }}>
          <div onClick={() => setSortDir(d => d === 'asc' ? 'desc' : 'asc')} style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '700', color: '#005f96', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
            ID <ChevronsUpDown size={14} />
          </div>
          <div style={{ padding: '10px 16px', fontSize: '11px', fontWeight: '600', color: '#444', textTransform: 'uppercase' }}>SUBMISSIONS</div>
          {!isReviewer && <div style={{ padding: '10px 16px', fontSize: '11px', fontWeight: '600', color: '#444', textTransform: 'uppercase' }}>STAGE / STATUS</div>}
          {!isReviewer && <div style={{ padding: '10px 16px', fontSize: '11px', fontWeight: '600', color: '#444', textTransform: 'uppercase' }}>EDITORIAL ACTIVITY</div>}
          {isReviewer && <div style={{ padding: '10px 16px', fontSize: '11px', fontWeight: '600', color: '#444', textTransform: 'uppercase' }}>STATUS</div>}
          <div style={{ padding: '10px 16px', fontSize: '11px', fontWeight: '600', color: '#444', textTransform: 'uppercase', textAlign: 'right' }}>ACTIONS</div>
        </div>

        {/* Content */}
        {loading ? (
          <div style={{ borderBottom: '1px solid #eee', padding: '12px 16px', fontSize: '13px', color: '#666' }}>Loading</div>
        ) : filtered.length === 0 ? (
          <div style={{ 
            display: 'grid', gridTemplateColumns: gridCols, 
            borderBottom: '1px solid #eee', alignItems: 'center'
          }}>
            <div style={{ padding: '12px 16px' }}></div>
            <div style={{ padding: '12px 16px', fontSize: '13px', color: '#666' }}>No Items</div>
            {!isReviewer && <div style={{ padding: '12px 16px' }}></div>}
            {!isReviewer && <div style={{ padding: '12px 16px' }}></div>}
            {isReviewer && <div style={{ padding: '12px 16px' }}></div>}
            <div style={{ padding: '12px 16px' }}></div>
          </div>
        ) : filtered.map((sub, idx) => {
          const statusStyle = getStatusStyle(sub.status);
          return (
            <div key={sub.id} style={{ 
              display: 'grid', gridTemplateColumns: gridCols, 
              borderBottom: '1px solid #eee', alignItems: 'center'
            }}>
              <div style={{ padding: '12px 16px', fontSize: '13px', color: '#666' }}>{sub.id}</div>
              <div style={{ padding: '12px 16px' }}>
                <Link href={isReviewer ? `/dashboard/reviewer/assignments/${sub.id}` : `/dashboard/submissions/${sub.id}`} style={{ color: '#005f96', textDecoration: 'none', fontSize: '13px' }}>
                  {sub.title}
                </Link>
              </div>
              {!isReviewer && (
                <div style={{ padding: '12px 16px', fontSize: '13px', color: '#333', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: statusStyle.dot }} />
                  {sub.status || 'Submission'}
                </div>
              )}
              {!isReviewer && (
                <div style={{ padding: '12px 16px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ 
                    backgroundColor: (sub.activity || '').includes('Declined') ? '#fee2e2' : (sub.activity || '').includes('Accepted') ? '#dcfce3' : '#f1f5f9',
                    color: (sub.activity || '').includes('Declined') ? '#991b1b' : (sub.activity || '').includes('Accepted') ? '#166534' : '#64748b',
                    fontSize: '11px', fontWeight: '600', padding: '2px 8px', borderRadius: '12px'
                  }}>
                    {sub.activity || '—'}
                  </span>
                </div>
              )}
              {isReviewer && (
                <div style={{ padding: '12px 16px', fontSize: '13px', color: '#333' }}>
                  {sub.status}
                </div>
              )}
              <div style={{ padding: '12px 16px', textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '15px' }}>
                {isReviewer && (['Pending', 'Accepted'].includes(sub.status)) && (
                  <Link href={`/dashboard/reviewer/assignments/${sub.id}`} style={{ color: '#16a34a', textDecoration: 'none', fontSize: '13px', fontWeight: '700' }}>Review</Link>
                )}
                {!isReviewer && (
                  <Link href={`/dashboard/submissions/${sub.id}`} style={{ color: '#005f96', textDecoration: 'none', fontSize: '13px', fontWeight: '600' }}>View Details</Link>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer info */}
      {!loading && (
        <div style={{ marginTop: '12px', fontSize: '13px', color: '#666' }}>
          Showing <strong style={{ fontWeight: '600' }}>{filtered.length > 0 ? '1' : '0'}</strong> to <strong style={{ fontWeight: '600' }}>{filtered.length}</strong> of <strong style={{ fontWeight: '600' }}>{filtered.length}</strong>
        </div>
      )}
    </div>
  );
}
