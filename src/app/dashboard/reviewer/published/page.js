'use client';
import SubmissionsTable from '../../submissions/_SubmissionsTable';
export default function ReviewerPublishedPage() {
  return <SubmissionsTable title="Published" filterFn={() => false} columns="reviewer" />;
}
