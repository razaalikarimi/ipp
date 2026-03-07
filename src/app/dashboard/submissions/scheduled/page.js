'use client';
import SubmissionsTable from '../_SubmissionsTable';
export default function ScheduledPage() {
  return <SubmissionsTable title="Scheduled for publication" filterFn={sub => (sub.status || '').toLowerCase().includes('scheduled')} columns="author" extraMenuItems={[{ label: '✕  Delete Incomplete Submissions', onClick: () => {} }]} />;
}
