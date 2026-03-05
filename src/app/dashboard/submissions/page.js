'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ChevronDown, ChevronUp, Filter, MoreHorizontal } from 'lucide-react';

function SubmissionsContent({ title, submissions, loading }) {
  return (
    <div style={{ padding: '30px 40px', maxWidth: '1200px', width: '100%', boxSizing: 'border-box' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: '400', color: '#1a1a1a', margin: 0, fontFamily: '"Noto Sans", sans-serif' }}>
          {title} ({submissions.length})
        </h1>
      </div>
      
      {/* Filters and Search Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button style={{ background: 'none', border: 'none', color: '#005f96', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '13px', padding: '0' }}>
            <Filter size={14} /> Filters
          </button>
          <span style={{ color: '#ccc' }}>|</span>
          <button style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '0' }}>
            <MoreHorizontal size={16} />
          </button>
        </div>
        
        <div style={{ position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#666', pointerEvents: 'none' }} />
          <input
            type="text"
            placeholder="Search submissions, ID, authors, title..."
            style={{ 
              border: '1px solid #cbd5e1', 
              borderRadius: '2px', 
              padding: '8px 30px 8px 12px', 
              fontSize: '13px', 
              outline: 'none', 
              width: '320px',
              fontFamily: '"Noto Sans", sans-serif',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)'
            }}
          />
        </div>
      </div>

      {/* Table Area */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '2px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
        {/* Table Header */}
        <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr 180px 200px 100px', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '4px' }}>
            ID <div style={{ display: 'flex', flexDirection: 'column' }}><ChevronUp size={10} style={{ marginBottom: '-3px' }}/><ChevronDown size={10} /></div>
          </div>
          <div style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>SUBMISSIONS</div>
          <div style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>STAGE</div>
          <div style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '700', color: '#475569', textTransform: 'uppercase' }}>EDITORIAL ACTIVITY</div>
          <div style={{ padding: '12px 16px', fontSize: '11px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', textAlign: 'right' }}>ACTIONS</div>
        </div>

        {/* Rows */}
        <div style={{ minHeight: '100px' }}>
          {loading ? (
             <div style={{ padding: '32px', textAlign: 'center', fontSize: '14px', color: '#64748b' }}>
               Loading submissions...
             </div>
          ) : submissions.length === 0 ? (
            <div style={{ padding: '32px', textAlign: 'center', fontSize: '14px', color: '#64748b' }}>
              No submissions found.
            </div>
          ) : (
            submissions.map(sub => {
              const dateStr = sub.created_at ? new Date(sub.created_at).toLocaleDateString() : '';
              return (
                <div key={sub.id} style={{ display: 'grid', gridTemplateColumns: '70px 1fr 180px 200px 100px', borderBottom: '1px solid #f1f5f9', alignItems: 'flex-start' }}>
                  <div style={{ padding: '16px', fontSize: '13px', color: '#334155' }}>
                    {sub.id}
                  </div>
                  <div style={{ padding: '16px' }}>
                    <div style={{ color: '#334155', fontSize: '14px', fontWeight: '400', lineHeight: '1.4' }}>
                      {sub.title}
                    </div>
                  </div>
                  <div style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#9333ea' }}></div>
                    <span style={{ fontSize: '13px', color: '#334155' }}>{sub.status || 'Submission'}</span>
                  </div>
                  <div style={{ padding: '16px', fontSize: '13px', color: '#64748b' }}>
                    {/* Empty Editorial Activity by default as shown in mockup */}
                  </div>
                  <div style={{ padding: '16px', textAlign: 'right' }}>
                    <Link href={`/dashboard/submissions/${sub.id}`} style={{ color: '#005f96', textDecoration: 'none', fontSize: '13px', fontWeight: '500' }}>
                      View
                    </Link>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
      
      {/* Footer info */}
      <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', color: '#64748b' }}>
        <div>Showing 1 to {submissions.length} of {submissions.length}</div>
      </div>
    </div>
  );
}

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const token = localStorage.getItem('eisr_token');
        const res = await fetch('/api/submissions', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (data.success) {
          setSubmissions(data.submissions);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  return <SubmissionsContent title="Active submissions" submissions={submissions} loading={loading} />;
}
