'use client';
import SubmissionsTable from '../_SubmissionsTable';
export default function PublishedSubmissionsPage() {
  return <SubmissionsTable title="Published" filterFn={sub => (sub.status || '').toLowerCase() === 'published'} columns="author" extraMenuItems={[{ label: '✕  Delete Incomplete Submissions', onClick: () => {} }]} />;
}
