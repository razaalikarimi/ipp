'use client';
import SubmissionsTable from '../_SubmissionsTable';
export default function DeclinedSubmissionsPage() {
  return <SubmissionsTable title="Declined" filterFn={sub => (sub.status || '').toLowerCase() === 'declined'} columns="author" extraMenuItems={[{ label: '✕  Delete Incomplete Submissions', onClick: () => {} }]} />;
}
