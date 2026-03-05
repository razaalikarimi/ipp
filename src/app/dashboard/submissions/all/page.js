'use client';
import Link from 'next/link';
import { Plus } from 'lucide-react';
export default function AllPage() {
  return (
    <div style={{ padding: '16px 24px', maxWidth: '900px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '18px', fontWeight: '700', color: '#333', margin: 0 }}>All Assignments (0)</h1>
        <Link href="/dashboard/submit" style={{ backgroundColor: '#007ab8', color: '#fff', textDecoration: 'none', borderRadius: '3px', padding: '7px 14px', fontSize: '12px', fontWeight: '700' }}>
          + New Submission
        </Link>
      </div>
      <div style={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '4px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 140px 80px', padding: '10px 14px', backgroundColor: '#f8f9fa', borderBottom: '1px solid #e0e0e0', fontSize: '11px', fontWeight: '700', color: '#555', textTransform: 'uppercase' }}>
          <span>ID</span><span>Submission</span><span>Assigned Action</span><span>Action</span>
        </div>
        <div style={{ padding: '32px', textAlign: 'center', fontSize: '13px', color: '#888' }}>No records found.</div>
      </div>
    </div>
  );
}
