'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ChevronLeft, 
  FileText, 
  Search,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default function ReviewerEvaluationPage() {
  const { id } = useParams();
  const router = useRouter();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  // Evaluation State
  const [evaluation, setEvaluation] = useState({
    commentsForAuthors: '',
    commentsForEditors: '',
    recommendation: '',
  });

  useEffect(() => {
    const fetchEverything = async () => {
      try {
        const token = localStorage.getItem('eisr_token');
        const subRes = await fetch(`/api/submissions/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const subData = await subRes.json();
        
        if (subData.success) {
          setSubmission(subData.submission);
          if (subData.submission.assignment?.status === 'accepted') {
            setCurrentStep(3);
          } else if (subData.submission.assignment?.status === 'completed') {
            setCurrentStep(4);
          }
        }

        const revRes = await fetch(`/api/reviewer/reviews?submissionId=${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const revData = await revRes.json();
        if (revData.success && revData.review) {
          const r = revData.review;
          setEvaluation({
            commentsForAuthors: r.comments_authors || '',
            commentsForEditors: r.comments_editors || '',
            recommendation: r.recommendation || '',
          });
        }
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEverything();
  }, [id]);

  const handleAcceptDecline = async (action) => {
    setSaving(true);
    try {
      const token = localStorage.getItem('eisr_token');
      const res = await fetch(`/api/reviewer/assignments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status: action === 'accept' ? 'accepted' : 'declined' })
      });
      const data = await res.json();
      if (data.success) {
        if (action === 'accept') setCurrentStep(2);
        else router.push('/dashboard/reviewer/declined');
      }
    } catch (err) { alert('Network error'); } finally { setSaving(false); }
  };

  const handleAction = async (isDraft = true) => {
    setSaving(true);
    try {
      const token = localStorage.getItem('eisr_token');
      const res = await fetch('/api/reviewer/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          submissionId: id,
          commentsAuthors: evaluation.commentsForAuthors,
          commentsEditors: evaluation.commentsForEditors,
          recommendation: evaluation.recommendation,
          isDraft
        })
      });
      const data = await res.json();
      if (data.success) {
        if (!isDraft) setCurrentStep(4);
        else alert('Draft saved!');
      }
    } catch (err) { alert('Network error'); } finally { setSaving(false); }
  };

  if (loading || !submission) return null;

  const steps = [
    { id: 1, label: '1. Request' },
    { id: 2, label: '2. Guidelines' },
    { id: 3, label: '3. Download & Review' },
    { id: 4, label: '4. Completion' }
  ];

  const primaryBlue = '#005f96';
  const lightGray = '#f5f7f9';
  const borderColor = '#cbd5e1';

  return (
    <div style={{ backgroundColor: lightGray, minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      
      {/* ── Page Header & Tabs ── */}
      <div style={{ backgroundColor: '#fff', borderBottom: '1px solid ' + borderColor, padding: '20px 0 0 0' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 'bold', color: '#333', marginBottom: '20px' }}>
            Review: {submission.title}
          </h1>
          
          <div style={{ border: '1px solid ' + borderColor, borderRadius: '4px', marginBottom: '20px' }}>
            <div style={{ padding: '8px 12px', fontSize: '13px', fontWeight: 'bold', color: '#333', borderBottom: '1px solid ' + borderColor }}>
              Previous Reviews
            </div>
            <div style={{ padding: '15px', color: '#666', fontSize: '13px', fontStyle: 'italic' }}>No Items</div>
          </div>

          <div style={{ display: 'flex', borderBottom: '1px solid ' + borderColor }}>
            {steps.map(step => (
              <div 
                key={step.id}
                onClick={() => { if (step.id < currentStep) setCurrentStep(step.id); }}
                style={{ 
                  padding: '10px 20px', fontSize: '13px', fontWeight: 'bold',
                  color: currentStep === step.id ? primaryBlue : '#333',
                  borderBottom: currentStep === step.id ? '2px solid ' + primaryBlue : 'none',
                  cursor: step.id < currentStep ? 'pointer' : 'default',
                  backgroundColor: currentStep === step.id ? '#fff' : 'transparent',
                }}
              >
                {step.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1000px', margin: '30px auto', padding: '0 20px' }}>
        
        {/* ─────── STEP 1 ─────── */}
        {currentStep === 1 && (
          <div style={{ backgroundColor: '#fff', border: '1px solid ' + borderColor, borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ padding: '25px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>Request for Review</h3>
              <p style={{ fontSize: '13px', color: '#333', marginBottom: '20px', lineHeight: '1.4' }}>
                You have been selected as a potential reviewer of the following submission. Below is an overview of the submission, as well as the timeline for this review. We hope that you are able to participate.
              </p>

              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 'bold', color: '#333', marginBottom: '4px' }}>Article Title</h4>
                <p style={{ fontSize: '13px', color: '#333' }}>{submission.title}</p>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 'bold', color: '#333', marginBottom: '4px' }}>Abstract</h4>
                <p style={{ fontSize: '13px', color: '#333', lineHeight: '1.4' }}>{submission.abstract || 'Scientific abstract text here...'}</p>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 'bold', color: '#333', marginBottom: '4px' }}>Review Type</h4>
                <p style={{ fontSize: '13px', color: '#333' }}>Anonymous Reviewer/Anonymous Author</p>
              </div>

              <div style={{ border: '1px solid ' + borderColor, borderRadius: '4px', marginBottom: '30px', overflow: 'hidden' }}>
                <div style={{ backgroundColor: '#fcfcfc', padding: '10px 15px', borderBottom: '1px solid ' + borderColor, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: 'bold' }}>Review Files</span>
                  <button style={{ background: 'none', border: 'none', color: primaryBlue, fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', gap: '4px' }}><Search size={14}/> Search</button>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid ' + borderColor, textAlign: 'left' }}>
                      <th style={{ padding: '10px', fontWeight: 'bold' }}>ID</th>
                      <th style={{ padding: '10px', fontWeight: 'bold' }}>File Name</th>
                      <th style={{ padding: '10px', fontWeight: 'bold' }}>Date Uploaded</th>
                      <th style={{ padding: '10px', fontWeight: 'bold' }}>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submission.files && submission.files.length > 0 ? (
                      submission.files.map((file, idx) => (
                        <tr key={file.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '10px', color: '#666' }}>{idx + 1}</td>
                          <td style={{ padding: '10px', color: primaryBlue, textDecoration: 'underline', cursor: 'pointer' }}>{file.name}</td>
                          <td style={{ padding: '10px', color: '#666' }}>{new Date(file.date).toLocaleDateString()}</td>
                          <td style={{ padding: '10px', color: '#666' }}>{file.type}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" style={{ padding: '20px', textAlign: 'center', color: '#666', fontStyle: 'italic' }}>No files found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div style={{ marginBottom: '25px' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>Review Schedule</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px' }}>
                  <div><div style={{ border: '1px solid #ccc', padding: '6px', fontSize: '13px' }}>2026-02-20</div><span style={{ fontSize: '11px', color: '#666', fontStyle: 'italic' }}>Editor's Request</span></div>
                  <div><div style={{ border: '1px solid #ccc', padding: '6px', fontSize: '13px' }}>2026-02-28</div><span style={{ fontSize: '11px', color: '#666', fontStyle: 'italic' }}>Response Due Date</span></div>
                  <div><div style={{ border: '1px solid #ccc', padding: '6px', fontSize: '13px' }}>2026-03-04</div><span style={{ fontSize: '11px', color: '#666', fontStyle: 'italic' }}>Review Due Date</span></div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => handleAcceptDecline('accept')} style={{ backgroundColor: primaryBlue, color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '4px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>Accept Review, Continue to Step #2</button>
                <button onClick={() => handleAcceptDecline('decline')} style={{ backgroundColor: '#f4f4f4', color: primaryBlue, border: '1px solid #ccc', padding: '10px 15px', borderRadius: '4px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>Decline Review Request</button>
              </div>
            </div>
          </div>
        )}

        {/* ─────── STEP 2 ─────── */}
        {currentStep === 2 && (
          <div style={{ backgroundColor: '#fff', border: '1px solid ' + borderColor, padding: '25px', borderRadius: '4px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 'bold', color: '#333', marginBottom: '15px' }}>Reviewer Guidelines</h3>
            <p style={{ fontSize: '13px', color: '#333' }}>This publisher has not set any reviewer guidelines.</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '30px' }}>
              <button onClick={() => setCurrentStep(1)} style={{ color: '#c05b7a', background: 'none', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>Back</button>
              <button onClick={() => setCurrentStep(3)} style={{ backgroundColor: primaryBlue, color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>Save and Continue</button>
            </div>
          </div>
        )}

        {/* ─────── STEP 3 ─────── */}
        {currentStep === 3 && (
          <div style={{ backgroundColor: '#fff', border: '1px solid ' + borderColor, padding: '25px', borderRadius: '4px' }}>
             <div style={{ border: '1px solid ' + borderColor, borderRadius: '4px', marginBottom: '30px', overflow: 'hidden' }}>
                <div style={{ backgroundColor: '#fcfcfc', padding: '10px 15px', borderBottom: '1px solid ' + borderColor, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: 'bold' }}>Review Files</span>
                  <button style={{ background: 'none', border: 'none', color: primaryBlue, fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', gap: '4px' }}><Search size={14}/> Search</button>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid ' + borderColor, textAlign: 'left' }}>
                      <th style={{ padding: '10px', fontWeight: 'bold' }}>ID</th>
                      <th style={{ padding: '10px', fontWeight: 'bold' }}>File Name</th>
                      <th style={{ padding: '10px', fontWeight: 'bold' }}>Date Uploaded</th>
                      <th style={{ padding: '10px', fontWeight: 'bold' }}>Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {submission.files && submission.files.length > 0 ? (
                      submission.files.map((file, idx) => (
                        <tr key={file.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '10px', color: '#666' }}>{idx + 1}</td>
                          <td style={{ padding: '10px', color: primaryBlue, textDecoration: 'underline', cursor: 'pointer' }}>{file.name}</td>
                          <td style={{ padding: '10px', color: '#666' }}>{new Date(file.date).toLocaleDateString()}</td>
                          <td style={{ padding: '10px', color: '#666' }}>{file.type}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" style={{ padding: '20px', textAlign: 'center', color: '#666', fontStyle: 'italic' }}>No files found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '8px' }}>Review</h4>
              <p style={{ fontSize: '12px', color: '#666', marginBottom: '15px' }}>Enter (or paste) your review of this submission into the form below.</p>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px' }}>For author and editor</label>
                <textarea value={evaluation.commentsForAuthors} onChange={e => setEvaluation({...evaluation, commentsForAuthors: e.target.value})} style={{ width: '100%', minHeight: '150px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px' }}>For editor</label>
                <textarea value={evaluation.commentsForEditors} onChange={e => setEvaluation({...evaluation, commentsForEditors: e.target.value})} style={{ width: '100%', minHeight: '80px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }} />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>Recommendation</h4>
                <p style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>Select a recommendation and submit the review to complete the process. You must enter a review or upload a file before selecting a recommendation.</p>
                <select value={evaluation.recommendation} onChange={e => setEvaluation({...evaluation, recommendation: e.target.value})} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '13px' }}>
                  <option value="">Choose One</option>
                  <option value="accept">Accept</option>
                  <option value="major">Major Revision</option>
                  <option value="minor">Minor Revision</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '1px solid #eee', paddingTop: '20px' }}>
                <button onClick={() => setCurrentStep(2)} style={{ color: '#c05b7a', background: 'none', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>Go Back</button>
                <button onClick={() => handleAction(true)} style={{ color: '#666', background: 'none', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>Save for Later</button>
                <button onClick={() => handleAction(false)} style={{ backgroundColor: primaryBlue, color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>Submit Review</button>
              </div>
          </div>
        )}

        {/* ─────── STEP 4 ─────── */}
        {currentStep === 4 && (
          <div style={{ backgroundColor: '#fff', border: '1px solid ' + borderColor, padding: '25px', borderRadius: '4px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>Review Submitted</h3>
            <p style={{ fontSize: '13px', color: '#333', marginBottom: '20px', lineHeight: '1.4' }}>Thank you for completing the review of this submission. Your review has been submitted successfully. We appreciate your contribution to the quality of the work that we publish.</p>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Link href="/dashboard/reviewer/all" style={{ backgroundColor: primaryBlue, color: '#fff', textDecoration: 'none', padding: '10px 20px', borderRadius: '4px', fontWeight: 'bold', fontSize: '13px' }}>Return to Dashboard</Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
