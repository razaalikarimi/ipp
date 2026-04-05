'use client';
import SubmissionsTable from '../../submissions/_SubmissionsTable';
export default function ReviewerActionRequiredPage() {
  return (
    <SubmissionsTable
      title="Action Required by me"
      filterFn={sub => ['Pending', 'Accepted'].includes(sub.status)}
      columns="reviewer"
    />
  );
}
