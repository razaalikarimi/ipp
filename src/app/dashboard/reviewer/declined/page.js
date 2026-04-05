'use client';
import SubmissionsTable from '../../submissions/_SubmissionsTable';
export default function ReviewerDeclinedPage() {
  return <SubmissionsTable title="Declined" filterFn={sub => sub.status === 'Declined'} columns="reviewer" />;
}
