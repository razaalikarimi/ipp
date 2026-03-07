'use client';
import SubmissionsTable from '../../submissions/_SubmissionsTable';
export default function ReviewerArchivedPage() {
  return <SubmissionsTable title="Archived" filterFn={() => false} columns="reviewer" />;
}
