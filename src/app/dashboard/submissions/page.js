'use client';
import SubmissionsTable from './_SubmissionsTable';

export default function ActiveSubmissionsPage() {
  return (
    <SubmissionsTable
      title="Active submissions"
      filterFn={sub => !['Declined', 'Published'].includes(sub.status)}
      columns="author"
      extraMenuItems={[{ label: '✕  Delete Incomplete Submissions', onClick: () => {} }]}
    />
  );
}
