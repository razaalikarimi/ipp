'use client';
import SubmissionsTable from '../../submissions/_SubmissionsTable';
export default function ReviewerPublishedPage() {
  return <SubmissionsTable title="Published" filterFn={sub => sub.submission_status === 'Published'} columns="reviewer" />;
}
