'use client';
import SubmissionsTable from '../../submissions/_SubmissionsTable';
export default function ReviewerCompletedPage() {
  return <SubmissionsTable title="Completed" filterFn={() => false} columns="reviewer" />;
}
