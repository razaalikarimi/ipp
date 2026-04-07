'use client';
import SubmissionsTable from '../../submissions/_SubmissionsTable';
export default function ReviewerAllPage() {
  return (
    <SubmissionsTable
      title="All assignments"
      filterFn={() => true}
      columns="reviewer"
    />
  );
}
