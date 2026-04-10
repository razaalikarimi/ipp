'use client';
import SubmissionsTable from '../_SubmissionsTable';

export default function InReviewManuscriptsPage() {
  return (
    <SubmissionsTable 
      title="Editorial Dashboard: Manuscripts In Review" 
      filterFn={sub => (sub.activity || '').toLowerCase().includes('review')} 
      columns="editor" 
      extraMenuItems={[]} 
    />
  );
}
