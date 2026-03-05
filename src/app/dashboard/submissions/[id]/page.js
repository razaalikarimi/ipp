'use client';
import { useState, useEffect } from 'react';
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
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [activeMenu, setActiveMenu] = useState('Workflow');
  const [activeStep, setActiveStep] = useState('Submission');
  const [workflowOpen, setWorkflowOpen] = useState(true);
  const [pubOpen, setPubOpen] = useState(true);

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const token = localStorage.getItem('eisr_token');
        const res = await fetch(`/api/submissions/${params.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (data.success) {
          setSubmission(data.submission);
        } else {
          setError(data.message || 'Failed to load submission');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchSubmission();
  }, [params.id]);

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
        <button style={{ backgroundColor: '#fff', border: '1px solid #005f96', color: '#005f96', padding: '6px 12px', fontSize: '13px', borderRadius: '2px', cursor: 'pointer', fontFamily: '"Noto Sans", sans-serif' }}>
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
                          <span style={{ color: '#005f96', cursor: 'pointer' }}>{file.name}</span>
                          <span style={{ color: '#475569' }}>{new Date(file.date).toLocaleDateString()}</span>
                          <div>
                            <span style={{ backgroundColor: '#005f96', color: '#fff', fontSize: '10px', padding: '2px 8px', borderRadius: '12px', fontWeight: '500' }}>Article Text</span>
                          </div>
                          <span style={{ color: '#64748b', cursor: 'pointer', textAlign: 'center' }}><MoreHorizontal size={14} /></span>
                        </div>
                      ))
                    ) : (
                      <div style={{ padding: '16px', fontSize: '13px', color: '#64748b', fontStyle: 'italic' }}>No files uploaded.</div>
                    )}
                    
                    {submission.files?.length > 0 && (
                      <div style={{ padding: '12px 16px' }}>
                        <button style={{ color: '#005f96', fontSize: '13px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                          Download All Files
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Pre-Review Discussions */}
                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '2px' }}>
                    <div style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', margin: 0 }}>Pre-Review Discussions</h3>
                      <button style={{ fontSize: '13px', color: '#005f96', background: 'none', border: 'none', cursor: 'pointer' }}>Add discussion</button>
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
                    <input type="text" style={{ ...inputStyle, width: '120px' }} placeholder="Examples: A, The" />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>Title <span style={{ color: '#dc2626' }}>*</span></label>
                    <input type="text" defaultValue={submission.title} style={inputStyle} />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>Subtitle</label>
                    <input type="text" style={inputStyle} />
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <label style={labelStyle}>Abstract <span style={{ color: '#dc2626' }}>*</span></label>
                    <div style={{ border: '1px solid #cbd5e1', borderRadius: '2px', overflow: 'hidden' }}>
                      <WysiwygToolbar />
                      <textarea rows={12} style={{ width: '100%', border: 'none', padding: '12px', outline: 'none', resize: 'vertical', fontSize: '13px', fontFamily: '"Noto Sans", sans-serif' }} defaultValue="Paste or write your manuscript abstract here..."></textarea>
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                    <button style={{ backgroundColor: '#005f96', color: '#fff', border: 'none', borderRadius: '2px', padding: '8px 24px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>Save</button>
                  </div>
                </div>
              )}

              {/* ── PUBLICATION: Contributors ── */}
              {activeMenu === 'Publication' && activeStep === 'Contributors' && (
                <div>
                  <div style={{ border: '1px solid #e2e8f0', borderRadius: '2px' }}>
                    <div style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', margin: 0 }}>Contributors</h3>
                      <button style={{ fontSize: '13px', color: '#005f96', background: 'none', border: 'none', cursor: 'pointer' }}>Add Contributor</button>
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
                    <button style={{ backgroundColor: '#005f96', color: '#fff', border: 'none', borderRadius: '2px', padding: '8px 24px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>Save</button>
                  </div>
                </div>
              )}

              {/* ── PUBLICATION: References ── */}
              {activeMenu === 'Publication' && activeStep === 'References' && (
                <div style={{ maxWidth: '800px' }}>
                  <label style={labelStyle}>References</label>
                  <textarea rows={15} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Provide a list of references cited in this submission. Please separate individual references with a blank line."></textarea>
                  <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px', display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                    <button style={{ backgroundColor: '#005f96', color: '#fff', border: 'none', borderRadius: '2px', padding: '8px 24px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>Save</button>
                  </div>
                </div>
              )}

              {/* ── Workflow Stage Placeholders ── */}
              {activeMenu === 'Workflow' && activeStep !== 'Submission' && (
                <div style={{ padding: '40px', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
                  <div style={{ border: '1px solid #e2e8f0', padding: '20px', borderRadius: '2px', backgroundColor: '#f8fafc', marginBottom: '20px', textAlign: 'left' }}>
                    <div style={{ fontSize: '11px', fontWeight: '700', color: '#475569', marginBottom: '8px' }}>Status</div>
                    <div>The {activeStep} stage has not yet been initiated.</div>
                  </div>
                </div>
              )}

              {/* Galleys Placeholder */}
              {activeMenu === 'Publication' && activeStep === 'Galleys' && (
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '2px' }}>
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', margin: 0 }}>Galleys</h3>
                    <button style={{ fontSize: '13px', color: '#005f96', background: 'none', border: 'none', cursor: 'pointer' }}>Add Galley</button>
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
