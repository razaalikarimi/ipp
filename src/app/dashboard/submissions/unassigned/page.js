'use client';
import SubmissionsTable from '../_SubmissionsTable';

export default function UnassignedManuscriptsPage() {
  return (
    <SubmissionsTable 
      title="Editorial Dashboard: Unassigned Manuscripts" 
      filterFn={sub => (sub.activity || '').toLowerCase().includes('unassigned')} 
      columns="editor" 
      extraMenuItems={[]} 
    />
  );
}
