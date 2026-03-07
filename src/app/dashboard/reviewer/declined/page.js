'use client';
import SubmissionsTable from '../../submissions/_SubmissionsTable';
export default function ReviewerDeclinedPage() {
  return <SubmissionsTable title="Declined" filterFn={() => false} columns="reviewer" />;
}
