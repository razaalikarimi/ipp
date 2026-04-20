'use client';
import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronUp, ChevronDown, MoreHorizontal, Bold, Italic, Underline, Link2, DivideSquare, Image as ImageIcon, UploadCloud } from 'lucide-react';

const WORKFLOW_STEPS = ['Submission', 'Review', 'Copyediting', 'Production'];
const PUB_STEPS = ['Title & Abstract', 'Contributors', 'Metadata', 'References', 'Galleys'];

const WysiwygToolbar = () => (
  <div style={{ display: 'flex', gap: '10px', padding: '8px 12px', borderBottom: '1px solid #cbd5e1', backgroundColor: '#f8fafc', color: '#64748b' }}>
    <Bold size={14} style={{ cursor: 'pointer' }}/>
    <Italic size={14} style={{ cursor: 'pointer' }}/>
    <Underline size={14} style={{ cursor: 'pointer' }}/>
    <span style={{ color: '#cbd5e1' }}>|</span>
    <Link2 size={14} style={{ cursor: 'pointer' }}/>
    <DivideSquare size={14} style={{ cursor: 'pointer' }}/>
    <span style={{ color: '#cbd5e1' }}>|</span>
    <ImageIcon size={14} style={{ cursor: 'pointer' }}/>
    <UploadCloud size={14} style={{ cursor: 'pointer' }}/>
  </div>
);

export default function SubmissionWorkflowPage({ params }) {
  const { id } = use(params);
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Reviewer Assignment State
  const [assigningLoading, setAssigningLoading] = useState(false);
  const [reviewerEmail, setReviewerEmail] = useState('');
  const [reviewerName, setReviewerName] = useState('');
  const [assignments, setAssignments] = useState([]);
  
  const [activeMenu, setActiveMenu] = useState('Workflow');
  const [activeStep, setActiveStep] = useState('Submission');
  const [workflowOpen, setWorkflowOpen] = useState(true);
  const [pubOpen, setPubOpen] = useState(true);
  const [formTitle, setFormTitle] = useState('');
  const [formAbstract, setFormAbstract] = useState('');
  const [formPrefix, setFormPrefix] = useState('');
  const [formSubtitle, setFormSubtitle] = useState('');
  const [user, setUser] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  
  // Revision State
  const [revisionComments, setRevisionComments] = useState('');
  const [revFiles, setRevFiles] = useState([]);
  const [submittingRevision, setSubmittingRevision] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Editorial Decision State
  const [decision, setDecision] = useState('');
  const [decisionComments, setDecisionComments] = useState('');
  const [recordingDecision, setRecordingDecision] = useState(false);

  useEffect(() => {
    if (submission) {
      setFormTitle(submission.title || '');
      setFormAbstract(submission.abstract || '');
      setFormPrefix(submission.prefix || '');
      setFormSubtitle(submission.subtitle || '');
    }
  }, [submission]);

  useEffect(() => {
    const fetchEverything = async () => {
      try {
        const token = localStorage.getItem('eisr_token');
        if (!token) return;

        // Fetch User profile to check role
        const profRes = await fetch('/api/profile', { headers: { 'Authorization': `Bearer ${token}` } });
        const profData = await profRes.json();
        if (profData.success) setUser(profData.profile);

        const res = await fetch(`/api/submissions/${id}?t=${Date.now()}`, {
          headers: { 'Authorization': `Bearer ${token}` },
          cache: 'no-store'
        });
        const data = await res.json();
        if (data.success) {
          setSubmission(data.submission);
          // If the API now returns assignments directly in submission object, use it
          if (data.submission.assignments) setAssignments(data.submission.assignments);
        } else {
          setError(data.message || 'Failed to load submission');
        }

        // Fallback backward compat if assignments weren't in detail res
        if (!data.submission?.assignments) {
          const assignRes = await fetch(`/api/reviewer/assignments?submissionId=${id}&t=${Date.now()}`, {
            headers: { 'Authorization': `Bearer ${token}` },
            cache: 'no-store'
          });
          const assignData = await assignRes.json();
          if (assignData.success) setAssignments(assignData.assignments || []);
        }

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEverything();
  }, [id]);

  const handleAssignReviewer = async () => {
    if (!reviewerEmail || !reviewerName) return alert('Enter reviewer name and email');
    setAssigningLoading(true);
    try {
      const token = localStorage.getItem('eisr_token');
      const res = await fetch('/api/reviewer/assignments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          submissionId: parseInt(id),
          reviewerId: 999, // Fallback placeholder ID since we are inviting by email directly
          reviewerEmail,
          reviewerName,
        })
      });
      const data = await res.json();
      if (data.success) {
        alert('Reviewer Assigned and Email Sent successfully!');
        setReviewerEmail('');
        setReviewerName('');
        // Refresh assignments list
        const assignRes = await fetch(`/api/reviewer/assignments?submissionId=${id}&t=${Date.now()}`, {
          headers: { 'Authorization': `Bearer ${token}` },
          cache: 'no-store'
        });
        const assignData = await assignRes.json();
        if (assignData.success) {
          setAssignments(assignData.assignments || []);
          window.dispatchEvent(new Event('eisr_refresh_data'));
        }
      } else {
        alert('Failed: ' + data.message);
      }
    } catch (error) {
      alert('Network Error assigning reviewer');
    } finally {
      setAssigningLoading(false);
    }
  };

  const handleDecision = async () => {
    if (!decision) return alert('Select a decision');
    setRecordingDecision(true);
    try {
      const token = localStorage.getItem('eisr_token');
      const res = await fetch(`/api/submissions/${id}/decision`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ decision, comments: decisionComments })
      });
      const data = await res.json();
      if (data.success) {
        setSubmission(prev => ({ ...prev, status: data.newStatus, activity: data.newActivity }));
        alert('Editorial decision recorded successfully!');
        window.dispatchEvent(new Event('eisr_refresh_data'));
      } else {
        alert(data.message);
      }
    } catch (err) { alert('Error recording decision'); } finally { setRecordingDecision(false); }
  };

  const handleRevisionFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.success) {
        setRevFiles(prev => [...prev, { name: file.name, path: data.path }]);
      } else {
        alert('Upload failed: ' + data.message);
      }
    } catch (err) {
      alert('Upload error');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmitRevisions = async () => {
    if (revFiles.length === 0) return alert('Please upload at least one revised file.');
    setSubmittingRevision(true);
    try {
      const token = localStorage.getItem('eisr_token');
      const res = await fetch(`/api/submissions/${id}/revisions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ files: revFiles, comments: revisionComments })
      });
      const data = await res.json();
      if (data.success) {
        setSubmission(prev => ({ ...prev, status: data.newStatus, activity: data.newActivity }));
        window.dispatchEvent(new Event('eisr_refresh_data'));
        alert('Revisions submitted successfully!');
        setRevFiles([]);
        setRevisionComments('');
      } else {
        alert(data.message);
      }
    } catch (err) { alert('Error submitting revisions'); } finally { setSubmittingRevision(false); }
  };

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#64748b', fontFamily: '"Noto Sans", sans-serif' }}>Loading submission details...</div>;
  }

  if (error || !submission) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', fontFamily: '"Noto Sans", sans-serif' }}>
        <p style={{ color: '#dc2626', marginBottom: '20px' }}>{error || 'Submission not found.'}</p>
        <Link href="/dashboard/submissions" style={{ color: '#005f96', textDecoration: 'underline' }}>
          Back to My Submissions
        </Link>
      </div>
    );
  }

  const handleStepClick = (menu, step) => {
    setActiveMenu(menu);
    setActiveStep(step);
  };

  const navItemStyle = (menu, step) => ({
    padding: '8px 16px',
    fontSize: '13px',
    color: activeMenu === menu && activeStep === step ? '#fff' : '#005f96',
    backgroundColor: activeMenu === menu && activeStep === step ? '#003a5c' : 'transparent',
    cursor: 'pointer',
    fontFamily: '"Noto Sans", sans-serif',
    display: 'block'
  });

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const token = localStorage.getItem('eisr_token');
      const res = await fetch(`/api/submissions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: formTitle,
          prefix: formPrefix,
          subtitle: formSubtitle,
          abstract: formAbstract
        })
      });
      const data = await res.json();
      if (data.success) {
        // Update local submission state to reflect in UI immediately
        setSubmission(prev => ({
          ...prev,
          title: formTitle,
          prefix: formPrefix,
          subtitle: formSubtitle,
          abstract: formAbstract
        }));
        alert('Changes saved successfully!');
      } else {
        alert('Failed to save: ' + data.message);
      }
    } catch (error) {
      alert('Error updating submission');
    } finally {
      setIsSaving(false);
    }
  };

  const handleFeature = (feature) => {
    alert(feature + ' feature will be available in the next release.');
  };

  const handleDownloadFile = (filePath, fileName) => {
    if (!filePath) {
      alert('File path is not available.');
      return;
    }
    
    // Extract filename from the path (handles both forward and backward slashes)
    const filename = filePath.split(/[\\/]/).pop();
    const downloadUrl = `/api/download?file=${encodeURIComponent(filename)}`;

    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = fileName || filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleDownloadAll = () => {
    if (!submission?.files || submission.files.length === 0) {
      alert('No files to download.');
      return;
    }
    submission.files.forEach((file, index) => {
      setTimeout(() => {
        handleDownloadFile(file.path, file.name);
      }, index * 300);
    });
  };

  const sectionHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 16px',
    fontSize: '13px',
    fontWeight: '700',
    color: '#005f96',
    backgroundColor: '#fff',
    border: 'none',
    borderBottom: '1px solid #e2e8f0',
    cursor: 'pointer',
    width: '100%',
    textAlign: 'left',
    fontFamily: '"Noto Sans", sans-serif',
  };

  const inputStyle = {
    width: '100%', 
    border: '1px solid #cbd5e1', 
    borderRadius: '2px',
    padding: '8px 12px', 
    fontSize: '13px', 
    outline: 'none', 
    fontFamily: '"Noto Sans", sans-serif',
    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)',
    color: '#334155'
  };

  const labelStyle = {
    display: 'block', 
    fontSize: '11px', 
    fontWeight: '700', 
    color: '#475569', 
    marginBottom: '6px',
    marginTop: '16px'
  };

  return (
    <div style={{ minHeight: '100%', backgroundColor: '#f1f5f9', fontFamily: '"Noto Sans", sans-serif' }}>
      
      {/* Top Header bar below main nav */}
      <div style={{ backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
          <Link href="/dashboard/submissions" style={{ color: '#005f96', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', fontSize: '15px' }}>
            <ChevronLeft size={16} /> <span>{submission.id}</span>
          </Link>
          <div>
            <h1 style={{ fontSize: '16px', fontWeight: '400', color: '#1e293b', margin: '0 0 8px 0', lineHeight: '1.3' }}>
              {submission.title}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#9333ea' }}></div>
              <span style={{ fontSize: '13px', color: '#334155' }}>
                {submission.status || 'Submission'}
              </span>
            </div>
          </div>
        </div>
        <button 
          onClick={() => handleFeature('Library')}
          style={{ backgroundColor: '#fff', border: '1px solid #005f96', color: '#005f96', padding: '6px 12px', fontSize: '13px', borderRadius: '2px', cursor: 'pointer', fontFamily: '"Noto Sans", sans-serif' }}
        >
          Library
        </button>
      </div>

      <div style={{ display: 'flex', maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Left Sidebar Menu */}
        <div style={{ width: '220px', flexShrink: 0, borderRight: '1px solid #e2e8f0', backgroundColor: '#fff', minHeight: 'calc(100vh - 120px)' }}>
          <div>
            <button onClick={() => setWorkflowOpen(!workflowOpen)} style={sectionHeaderStyle}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>Workflow</span>
              {workflowOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            {workflowOpen && (
              <div style={{ padding: '0', borderBottom: '1px solid #e2e8f0' }}>
                {WORKFLOW_STEPS.map(step => (
                  <div key={step} style={navItemStyle('Workflow', step)} onClick={() => handleStepClick('Workflow', step)}>
                    {step}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div>
            <button onClick={() => setPubOpen(!pubOpen)} style={sectionHeaderStyle}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>Publication</span>
              {pubOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            {pubOpen && (
              <div style={{ padding: '0', borderBottom: '1px solid #e2e8f0' }}>
                {PUB_STEPS.map(step => (
                  <div key={step} style={navItemStyle('Publication', step)} onClick={() => handleStepClick('Publication', step)}>
                    {step}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Content Area */}
        <div style={{ flex: 1, padding: '24px' }}>
          
          <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '2px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
            
            {/* dynamic Header */}
            <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0' }}>
              <h2 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#005f96', textTransform: 'uppercase' }}>
                {activeMenu.toUpperCase()}: {activeStep.toUpperCase()}
              </h2>
            </div>
            
            <div style={{ padding: '20px' }}>
              
              {activeMenu === 'Workflow' && activeStep === 'Submission' && (
                <>
                  <div style={{ fontSize: '13px', color: '#475569', marginBottom: '24px' }}>
                    Current Submission Language: <strong>{submission.language || 'English'}</strong>
                  </div>

                  {/* Submission Files */}
                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '2px', marginBottom: '24px' }}>
                    <div style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>
                      <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', margin: '0 0 4px 0' }}>Submission Files</h3>
                      <div style={{ fontSize: '11px', color: '#64748b' }}>Files uploaded at the time of submission</div>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr 140px 120px 40px', padding: '10px 16px', backgroundColor: '#f8fafc', fontSize: '10px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', borderBottom: '1px solid #e2e8f0' }}>
                      <div>NO</div><div>FILE NAME</div><div>DATE UPLOADED</div><div>TYPE</div><div></div>
                    </div>
                    
                    {submission.files && submission.files.length > 0 ? (
                      submission.files.map((file, i) => (
                        <div key={i} style={{ display: 'grid', gridTemplateColumns: '60px 1fr 140px 120px 40px', padding: '12px 16px', alignItems: 'center', fontSize: '13px', borderBottom: '1px solid #f1f5f9' }}>
                          <span style={{ color: '#475569' }}>{file.id || 194 + i}</span>
                          <span 
                            style={{ color: '#005f96', cursor: 'pointer', textDecoration: 'underline' }}
                            onClick={() => handleDownloadFile(file.path, file.name)}
                          >
                            {file.name}
                          </span>
                          <span style={{ color: '#475569' }}>{new Date(file.date).toLocaleDateString()}</span>
                          <div>
                            <span style={{ backgroundColor: '#005f96', color: '#fff', fontSize: '10px', padding: '2px 8px', borderRadius: '12px', fontWeight: '500' }}>{file.type || 'Article Text'}</span>
                          </div>
                          <span style={{ color: '#64748b', cursor: 'pointer', textAlign: 'center' }}><MoreHorizontal size={14} /></span>
                        </div>
                      ))
                    ) : (
                      <div style={{ padding: '16px', fontSize: '13px', color: '#64748b', fontStyle: 'italic' }}>No files uploaded.</div>
                    )}
                    
                    {submission.files?.length > 0 && (
                      <div style={{ padding: '12px 16px' }}>
                        <button 
                          onClick={handleDownloadAll}
                          style={{ color: '#005f96', fontSize: '13px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                        >
                          Download All Files
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Pre-Review Discussions */}
                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '2px' }}>
                    <div style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', margin: 0 }}>Pre-Review Discussions</h3>
                      <button 
                        onClick={() => handleFeature('Add Discussion')}
                        style={{ fontSize: '13px', color: '#005f96', background: 'none', border: 'none', cursor: 'pointer' }}
                      >
                        Add discussion
                      </button>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 180px 120px 60px 40px', padding: '10px 16px', backgroundColor: '#f8fafc', fontSize: '10px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', borderBottom: '1px solid #e2e8f0' }}>
                      <div>Name</div><div>From</div><div>Last Reply</div><div style={{ textAlign: 'center' }}>Replies</div><div style={{ textAlign: 'center' }}>Closed</div>
                    </div>
                    
                    {submission.discussions && submission.discussions.length > 0 ? (
                      submission.discussions.map((d, i) => (
                        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 180px 120px 60px 40px', padding: '12px 16px', alignItems: 'center', fontSize: '12px', borderBottom: '1px solid #f1f5f9' }}>
                          <span style={{ color: '#005f96', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <div style={{ width: '4px', height: '4px', backgroundColor: '#005f96', borderRadius: '50%' }}></div>
                            {d.subject}
                          </span>
                          <div>
                            <div style={{ color: '#475569' }}>{d.author}</div>
                            <div style={{ color: '#64748b', fontSize: '11px' }}>{new Date(d.date).toLocaleString()}</div>
                          </div>
                          <span style={{ color: '#475569' }}>-</span>
                          <span style={{ color: '#475569', textAlign: 'center' }}>{d.replies}</span>
                          <div style={{ textAlign: 'center' }}>
                            <input type="checkbox" style={{ cursor: 'pointer' }} />
                          </div>
                        </div>
                      ))
                    ) : (
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 180px 120px 60px 40px', padding: '12px 16px', alignItems: 'center', fontSize: '12px', borderBottom: '1px solid #f1f5f9' }}>
                        <span style={{ color: '#005f96', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <div style={{ width: '4px', height: '4px', backgroundColor: '#005f96', borderRadius: '50%' }}></div>
                          Comments for the Editor
                        </span>
                        <div>
                          <div style={{ color: '#475569' }}>system</div>
                          <div style={{ color: '#64748b', fontSize: '11px' }}>-</div>
                        </div>
                        <span style={{ color: '#475569' }}>-</span>
                        <span style={{ color: '#475569', textAlign: 'center' }}>0</span>
                        <div style={{ textAlign: 'center' }}>
                          <input type="checkbox" style={{ cursor: 'pointer' }} />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Submit Revisions Section (Visible only to Authors when requested) */}
                  {submission.status === 'Revisions Requested' && user?.role === 'author' && (
                    <div style={{ border: '2px solid #ca8a04', borderRadius: '4px', padding: '24px', backgroundColor: '#fffcf5', marginBottom: '24px' }}>
                      <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#854d0e', marginTop: 0, marginBottom: '12px' }}>Submit Revised Manuscript</h3>
                      <p style={{ fontSize: '13px', color: '#854d0e', marginBottom: '20px' }}>The editors have requested revisions. Please upload your revised files and provide a point-by-point response to the editorial comments below.</p>
                      
                      <div style={{ marginBottom: '20px' }}>
                        <label style={{ ...labelStyle, marginTop: 0 }}>Response to Reviewers/Editors</label>
                        <textarea 
                          value={revisionComments} 
                          onChange={e => setRevisionComments(e.target.value)}
                          placeholder="Provide details about the changes made based on the feedback..."
                          style={{ ...inputStyle, minHeight: '120px' }}
                        />
                      </div>

                      <div style={{ marginBottom: '20px' }}>
                        <label style={{ ...labelStyle, marginTop: 0 }}>Upload Revised Files</label>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
                          <input 
                            type="file" 
                            id="rev-upload" 
                            onChange={handleRevisionFileUpload} 
                            style={{ display: 'none' }} 
                          />
                          <label 
                            htmlFor="rev-upload" 
                            style={{ backgroundColor: '#fff', border: '1px dashed #ca8a04', color: '#854d0e', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}
                          >
                            {uploading ? 'Uploading...' : 'Choose Revised File'}
                          </label>
                        </div>
                        {revFiles.length > 0 && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            {revFiles.map((f, i) => (
                              <div key={i} style={{ fontSize: '12px', color: '#334155', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <UploadCloud size={14} /> {f.name}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <button 
                        onClick={handleSubmitRevisions}
                        disabled={submittingRevision || revFiles.length === 0}
                        style={{ backgroundColor: '#ca8a04', color: '#fff', border: 'none', borderRadius: '4px', padding: '12px 24px', fontSize: '14px', fontWeight: '700', cursor: (submittingRevision || revFiles.length === 0) ? 'not-allowed' : 'pointer', opacity: (submittingRevision || revFiles.length === 0) ? 0.7 : 1 }}
                      >
                        {submittingRevision ? 'Submitting...' : 'Complete Revision Submission'}
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* ── PUBLICATION: Title & Abstract ── */}
              {activeMenu === 'Publication' && activeStep === 'Title & Abstract' && (
                <div style={{ maxWidth: '800px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
                    <div style={{ fontSize: '13px', color: '#475569' }}>Status: <span style={{ color: '#dc2626', fontWeight: '700' }}>● Unscheduled</span></div>
                    <div style={{ fontSize: '13px', color: '#475569' }}>Version: <strong>1</strong></div>
                    <select style={{ ...inputStyle, width: 'auto', padding: '4px 8px' }}><option>All Versions</option></select>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>Prefix</label>
                    <input 
                      type="text" 
                      style={{ ...inputStyle, width: '120px' }} 
                      placeholder="Examples: A, The" 
                      value={formPrefix}
                      onChange={(e) => setFormPrefix(e.target.value)}
                    />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>Title <span style={{ color: '#dc2626' }}>*</span></label>
                    <input 
                      type="text" 
                      style={inputStyle} 
                      value={formTitle}
                      onChange={(e) => setFormTitle(e.target.value)}
                    />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>Subtitle</label>
                    <input 
                      type="text" 
                      style={inputStyle} 
                      value={formSubtitle}
                      onChange={(e) => setFormSubtitle(e.target.value)}
                    />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>Abstract <span style={{ color: '#dc2626' }}>*</span></label>
                    <div style={{ border: '1px solid #cbd5e1', borderRadius: '2px', overflow: 'hidden' }}>
                      <WysiwygToolbar />
                      <textarea 
                        rows={12} 
                        style={{ width: '100%', border: 'none', padding: '12px', outline: 'none', resize: 'vertical', fontSize: '13px', fontFamily: '"Noto Sans", sans-serif' }} 
                        value={formAbstract}
                        onChange={(e) => setFormAbstract(e.target.value)}
                        placeholder="Paste or write your manuscript abstract here..."
                      ></textarea>
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                    <button 
                      onClick={handleSave}
                      disabled={isSaving}
                      style={{ backgroundColor: '#005f96', color: '#fff', border: 'none', borderRadius: '2px', padding: '8px 24px', fontSize: '13px', fontWeight: '700', cursor: isSaving ? 'not-allowed' : 'pointer', opacity: isSaving ? 0.7 : 1 }}
                    >
                      {isSaving ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                </div>
              )}

              {/* ── PUBLICATION: Contributors ── */}
              {activeMenu === 'Publication' && activeStep === 'Contributors' && (
                <div>
                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '2px' }}>
                    <div style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', margin: 0 }}>Contributors</h3>
                      <button 
                        onClick={() => handleFeature('Add Contributor')}
                        style={{ fontSize: '13px', color: '#005f96', background: 'none', border: 'none', cursor: 'pointer' }}
                      >
                        Add Contributor
                      </button>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 140px 100px 80px', padding: '10px 16px', backgroundColor: '#f8fafc', fontSize: '10px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', borderBottom: '1px solid #e2e8f0' }}>
                      <div>Name</div><div>Email</div><div>Role</div><div>Primary Contact</div><div></div>
                    </div>
                    
                    {submission.contributors && submission.contributors.length > 0 ? (
                      submission.contributors.map((c, i) => (
                        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 140px 100px 80px', padding: '12px 16px', alignItems: 'center', fontSize: '13px', borderBottom: '1px solid #f1f5f9' }}>
                          <span style={{ color: '#005f96', cursor: 'pointer' }}>{c.name}</span>
                          <span style={{ color: '#475569' }}>{c.email}</span>
                          <span style={{ color: '#475569' }}>Author</span>
                          <div style={{ textAlign: 'center' }}><input type="radio" checked={i === 0} readOnly /></div>
                          <span style={{ color: '#64748b', cursor: 'pointer', textAlign: 'center' }}><MoreHorizontal size={14} /></span>
                        </div>
                      ))
                    ) : (
                      <div style={{ padding: '24px', textAlign: 'center', fontSize: '13px', color: '#64748b' }}>No contributors found.</div>
                    )}
                  </div>
                </div>
              )}

              {/* ── PUBLICATION: Metadata ── */}
              {activeMenu === 'Publication' && activeStep === 'Metadata' && (
                <div style={{ maxWidth: '800px' }}>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={labelStyle}>Keywords</label>
                    <input type="text" style={inputStyle} placeholder="Add keywords and press enter..." />
                    <p style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>Provide terms that represent your research topics.</p>
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={labelStyle}>Supporting Agencies</label>
                    <input type="text" style={inputStyle} />
                  </div>
                  <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                    <button 
                      onClick={handleSave}
                      disabled={isSaving}
                      style={{ backgroundColor: '#005f96', color: '#fff', border: 'none', borderRadius: '2px', padding: '8px 24px', fontSize: '13px', fontWeight: '700', cursor: isSaving ? 'not-allowed' : 'pointer', opacity: isSaving ? 0.7 : 1 }}
                    >
                      {isSaving ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                </div>
              )}

              {/* ── PUBLICATION: References ── */}
              {activeMenu === 'Publication' && activeStep === 'References' && (
                <div style={{ maxWidth: '800px' }}>
                  <label style={labelStyle}>References</label>
                  <textarea rows={15} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Provide a list of references cited in this submission. Please separate individual references with a blank line."></textarea>
                  <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px', display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                    <button 
                      onClick={handleSave}
                      disabled={isSaving}
                      style={{ backgroundColor: '#005f96', color: '#fff', border: 'none', borderRadius: '2px', padding: '8px 24px', fontSize: '13px', fontWeight: '700', cursor: isSaving ? 'not-allowed' : 'pointer', opacity: isSaving ? 0.7 : 1 }}
                    >
                      {isSaving ? 'Saving...' : 'Save'}
                    </button>
                  </div>
                </div>
              )}

              {/* ── Workflow Stage Placeholders ── */}
              {activeMenu === 'Workflow' && activeStep !== 'Submission' && activeStep !== 'Review' && (
                <div style={{ padding: '40px', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
                  <div style={{ border: '1px solid #e2e8f0', padding: '20px', borderRadius: '2px', backgroundColor: '#f8fafc', marginBottom: '20px', textAlign: 'left' }}>
                    <div style={{ fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '8px' }}>Status</div>
                    <div>The {activeStep} stage has not yet been initiated.</div>
                  </div>
                </div>
              )}

              {/* ── WORKFLOW: Review Stage ── */}
              {activeMenu === 'Workflow' && activeStep === 'Review' && (
                <div>
                  <div style={{ border: '1px solid #e2e8f0', padding: '20px', borderRadius: '4px', backgroundColor: '#fff', marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#1e293b', marginTop: 0 }}>Reviewers</h3>
                    <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>Assign reviewers to evaluate this submission. An automatic invitation email will be sent upon assignment containing personalized secure Accept/Decline links.</p>
                    
                    {/* Existing Assignments Table */}
                    {assignments.length > 0 && (
                      <table style={{ width: '100%', marginBottom: '20px', borderCollapse: 'collapse', fontSize: '13px' }}>
                        <thead>
                          <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', textAlign: 'left' }}>
                            <th style={{ padding: '10px', fontWeight: 'bold', color: '#475569' }}>{user?.role === 'editor' || user?.role === 'admin' ? 'Reviewer Name' : 'Reviewer ID'}</th>
                            <th style={{ padding: '10px', fontWeight: 'bold', color: '#475569' }}>Status</th>
                            <th style={{ padding: '10px', fontWeight: 'bold', color: '#475569' }}>Date Assigned</th>
                          </tr>
                        </thead>
                        <tbody>
                          {assignments.map((a, idx) => (
                            <tr key={a.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                              <td style={{ padding: '10px', color: '#005f96', fontWeight: '600' }}>
                                {user?.role === 'editor' || user?.role === 'admin' 
                                  ? (a.reviewerName || a.reviewerEmail) 
                                  : `Reviewer ${idx + 1}`}
                              </td>
                              <td style={{ padding: '10px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                  <span style={{ 
                                    width: 'fit-content', padding: '2px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: '600',
                                    backgroundColor: a.status === 'Accepted' ? '#dcfce3' : a.status === 'Declined' ? '#fee2e2' : a.status === 'Completed' ? '#e0f2fe' : '#f1f5f9',
                                    color: a.status === 'Accepted' ? '#166534' : a.status === 'Declined' ? '#991b1b' : a.status === 'Completed' ? '#0369a1' : '#475569'
                                  }}>
                                    {a.status === 'Declined' ? 'Invitation Declined' : a.status}
                                  </span>
                                  {a.review && (
                                    <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px', border: '1px solid #e2e8f0', padding: '8px', borderRadius: '4px', backgroundColor: '#f8fafc' }}>
                                      <div style={{ fontWeight: '700', color: '#334155', textTransform: 'uppercase', marginBottom: '4px' }}>Recommendation: {a.review.recommendation} {(user?.role === 'editor' || user?.role === 'admin') && `(Rating: ${a.review.rating}/10)`}</div>
                                      <div style={{ marginBottom: '4px' }}><strong>Author Comments:</strong> {a.review.commentsAuthors}</div>
                                      {(user?.role === 'editor' || user?.role === 'admin') && (
                                        <div><strong>Editor Comments (Private):</strong> {a.review.commentsEditors}</div>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </td>
                              <td style={{ padding: '10px', color: '#64748b' }}>{new Date(a.assigned_at).toLocaleDateString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}

                    {/* Assign New Reviewer Form (Only for Editors/Admins) */}
                    {(user?.role === 'editor' || user?.role === 'admin') && (
                      <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
                        <h4 style={{ fontSize: '13px', fontWeight: '700', marginBottom: '12px', color: '#1e293b' }}>Assign New Reviewer</h4>
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                          <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>Reviewer Name</label>
                            <input type="text" placeholder="Dr. John Doe" value={reviewerName} onChange={e => setReviewerName(e.target.value)} style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '4px', padding: '8px 12px', fontSize: '13px', outline: 'none' }} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '4px' }}>Reviewer Email</label>
                            <input type="email" placeholder="john.doe@university.edu" value={reviewerEmail} onChange={e => setReviewerEmail(e.target.value)} style={{ width: '100%', border: '1px solid #cbd5e1', borderRadius: '4px', padding: '8px 12px', fontSize: '13px', outline: 'none' }} />
                          </div>
                        </div>
                        <button onClick={handleAssignReviewer} disabled={assigningLoading} style={{ backgroundColor: '#005f96', color: '#fff', border: 'none', borderRadius: '4px', padding: '8px 16px', fontSize: '13px', fontWeight: '700', cursor: assigningLoading ? 'not-allowed' : 'pointer', opacity: assigningLoading ? 0.7 : 1 }}>
                          {assigningLoading ? 'Sending Invitation...' : 'Assign & Send Email'}
                        </button>
                      </div>
                    )}

                    {/* Editorial Decision API call */}
                    {(user?.role === 'editor' || user?.role === 'admin') && (
                      <div style={{ borderTop: '3px solid #005f96', marginTop: '30px', paddingTop: '20px', backgroundColor: '#fafcff', padding: '20px', borderRadius: '4px' }}>
                        <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#005f96', marginTop: 0, marginBottom: '10px' }}>Record Editorial Decision</h3>
                        <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '20px' }}>Finalize the verdict for this manuscript based on reviewer evaluations. This will notify the author and move the submission to the next workflow stage.</p>
                        
                        <div style={{ marginBottom: '20px' }}>
                          <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>Decision</label>
                          <select value={decision} onChange={e => setDecision(e.target.value)} style={{ width: '300px', border: '1px solid #cbd5e1', borderRadius: '4px', padding: '8px 12px', fontSize: '13px', outline: 'none' }}>
                            <option value="">Select Verdict</option>
                            <option value="accept">Accept Submission (Publish)</option>
                            <option value="revisions">Request Revisions</option>
                            <option value="decline">Decline Submission (Reject)</option>
                          </select>
                        </div>
                        
                        <div style={{ marginBottom: '20px' }}>
                          <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>Editor Comments (For Author)</label>
                          <textarea value={decisionComments} onChange={e => setDecisionComments(e.target.value)} placeholder="Provide feedback to the author about the decision..." style={{ width: '100%', minHeight: '100px', border: '1px solid #cbd5e1', borderRadius: '4px', padding: '8px 12px', fontSize: '13px', outline: 'none' }} />
                        </div>
                        
                        <button onClick={handleDecision} disabled={recordingDecision} style={{ backgroundColor: '#005f96', color: '#fff', border: 'none', borderRadius: '4px', padding: '10px 24px', fontSize: '13px', fontWeight: '700', cursor: recordingDecision ? 'not-allowed' : 'pointer', opacity: recordingDecision ? 0.7 : 1 }}>
                          {recordingDecision ? 'Recording Decision...' : 'Record Editorial Decision'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Galleys Placeholder */}
              {activeMenu === 'Publication' && activeStep === 'Galleys' && (
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '2px' }}>
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', margin: 0 }}>Galleys</h3>
                    <button 
                      onClick={() => handleFeature('Add Galley')}
                      style={{ fontSize: '13px', color: '#005f96', background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                      Add Galley
                    </button>
                  </div>
                  <div style={{ padding: '24px', textAlign: 'center', fontSize: '13px', color: '#64748b' }}>No galleys have been created.</div>
                </div>
              )}

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
