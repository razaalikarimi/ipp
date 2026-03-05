'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Upload, AlertCircle } from 'lucide-react';

const STEPS = ['Details', 'Upload Files', 'Contributors', 'For the Editors', 'Review'];

const checklistItems = [
  'The submission has not been previously published, nor is it before another journal for consideration.',
  'The submission file is in Microsoft Word or RTF document file format.',
  'Where available, URLs for the references have been provided.',
  'All illustrations, figures, and tables are placed within the text at the appropriate points, rather than at the end.',
  'The text adheres to the stylistic and bibliographic requirements outlined in the Author Guidelines.',
  'The author(s) acknowledge that the Article Processing Charge (APC) is USD 1,500 and is payable after acceptance.',
];

export default function SubmitPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    title: '',
    checklist: new Array(checklistItems.length).fill(false),
    privacyConsent: false,
    files: [],
    contributors: [],
    editorComments: '',
  });
  const [dragOver, setDragOver] = useState(false);
  const [contributorName, setContributorName] = useState('');
  const [contributorEmail, setContributorEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState([]);

  const inputStyle = {
    width: '100%',
    border: '1px solid #ccc',
    borderRadius: '3px',
    padding: '7px 10px',
    fontSize: '13px',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'Arial, sans-serif',
  };

  const handleFileAdd = (e) => {
    const newFiles = Array.from(e.target.files || []);
    setForm(f => ({ ...f, files: [...f.files, ...newFiles] }));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setForm(f => ({ ...f, files: [...f.files, ...droppedFiles] }));
  };

  const addContributor = () => {
    if (!contributorName || !contributorEmail) return;
    setForm(f => ({ ...f, contributors: [...f.contributors, { name: contributorName, email: contributorEmail }] }));
    setContributorName('');
    setContributorEmail('');
  };

  const validateStep = () => {
    const newErrors = [];
    if (step === 0) {
      if (!form.title.trim()) newErrors.push('Title is required.');
      if (!form.checklist.every(Boolean)) newErrors.push('Please confirm all submission checklist items.');
      if (!form.privacyConsent) newErrors.push('Please agree to the privacy statement.');
    }
    if (step === 1) {
      if (form.files.length === 0) newErrors.push('You must upload at least one Article Text file.');
    }
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const nextStep = () => {
    if (!validateStep()) return;
    setErrors([]);
    setStep(s => Math.min(s + 1, STEPS.length - 1));
  };

  const prevStep = () => {
    setErrors([]);
    setStep(s => Math.max(s - 1, 0));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setErrors([]);
    try {
      const token = localStorage.getItem('eisr_token');
      // Format files for API
      const fileData = form.files.map(f => ({
        name: f.name,
        type: 'Article Text',
        path: '/uploads/' + f.name // Fake path for now Since actual file upload requires S3 / Multer
      }));

      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: form.title,
          editorComments: form.editorComments,
          contributors: form.contributors,
          files: fileData
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Submission failed');
      
      router.push('/dashboard/submit/complete');
    } catch (err) {
      setErrors([err.message]);
      setStep(4); // Ensure they see the error on the review step
    } finally {
      setSubmitting(false);
    }
  };

  const reviewErrors = [];
  if (!form.title) reviewErrors.push('Title is required.');
  if (form.files.length === 0) reviewErrors.push('You must upload at least one Article Text file.');
  if (form.contributors.length === 0) reviewErrors.push('No contributors have been added for this submission.');

  const stepHeaderStyle = (i) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 14px',
    fontSize: '12px',
    fontWeight: '600',
    color: i === step ? '#007ab8' : i < step ? '#555' : '#aaa',
    borderBottom: i === step ? '2px solid #007ab8' : '2px solid transparent',
    cursor: i < step ? 'pointer' : 'default',
    whiteSpace: 'nowrap',
  });

  const stepNumStyle = (i) => ({
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    backgroundColor: i === step ? '#007ab8' : i < step ? '#555' : '#ccc',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    fontWeight: '700',
    flexShrink: 0,
  });

  return (
    <div style={{ padding: '16px 24px', maxWidth: '860px' }}>

      {/* Back + Title */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/dashboard/submissions" style={{ color: '#666', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none', fontSize: '13px' }}>
            <ChevronLeft size={14} /> Submissions
          </Link>
          <span style={{ fontSize: '14px', fontWeight: '700', color: '#333' }}>Make a Submission</span>
        </div>
        <button
          type="button"
          onClick={() => router.push('/dashboard/submissions')}
          style={{ fontSize: '12px', color: '#666', background: 'none', border: '1px solid #ccc', borderRadius: '3px', padding: '5px 12px', cursor: 'pointer' }}
        >
          Save for Later
        </button>
      </div>

      {/* ── Step 1 (Before form): Basic Info ── */}
      {step === 0 && !form.title && (
        <div style={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '4px', padding: '24px', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#333', marginTop: 0, marginBottom: '10px' }}>Before you begin</h2>
          <p style={{ fontSize: '13px', color: '#555', lineHeight: '1.7', marginBottom: '12px' }}>
            Thank you for submitting to Eye-Innovations Scientific Research (EISR).<br />
            You will be asked to upload files, identify co-authors, and provide information such as the title and abstract.
          </p>
          <p style={{ fontSize: '13px', color: '#555', lineHeight: '1.7', marginBottom: '0' }}>
            Please read our{' '}
            <Link href="/submission/guidelines" style={{ color: '#007ab8' }}>Submission Guidelines</Link>
            {' '}if you have not done so already. When filling out the forms, provide as many details as possible to
            help our editors evaluate your work.
          </p>
          <p style={{ fontSize: '13px', color: '#555', lineHeight: '1.7', marginBottom: '0', marginTop: '10px' }}>
            Once you begin, you can save your submission and come back to it later. You will be able to review and
            correct any information before you submit.
          </p>
        </div>
      )}

      {/* ── Step Wizard ── */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e0e0e0', borderRadius: '4px', overflow: 'hidden' }}>

        {/* Steps Header */}
        <div style={{ display: 'flex', borderBottom: '1px solid #e0e0e0', overflowX: 'auto' }}>
          {STEPS.map((s, i) => (
            <button
              key={s}
              onClick={() => i < step && setStep(i)}
              style={stepHeaderStyle(i)}
            >
              <span style={stepNumStyle(i)}>{i + 1}</span>
              {s}
            </button>
          ))}
        </div>

        {/* Step Content */}
        <div style={{ padding: '24px' }}>

          {/* ── STEP 0: Details ── */}
          {step === 0 && (
            <div>
              {errors.length > 0 && (
                <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '4px', padding: '12px 16px', marginBottom: '20px' }}>
                  {errors.map((e, i) => (
                    <p key={i} style={{ fontSize: '13px', color: '#dc2626', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <AlertCircle size={13} /> {e}
                    </p>
                  ))}
                </div>
              )}

              {/* Title */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#333', marginBottom: '6px' }}>
                  Title <span style={{ color: '#cc0000' }}>*</span>
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  placeholder="Enter manuscript title"
                  style={inputStyle}
                />
              </div>

              {/* Submission Checklist */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#333', marginBottom: '8px' }}>
                  Submission Checklist <span style={{ color: '#cc0000' }}>*</span>
                </label>
                <p style={{ fontSize: '12px', color: '#555', marginBottom: '10px' }}>All submissions must meet the following requirements.</p>
                {checklistItems.map((item, i) => (
                  <label key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={form.checklist[i]}
                      onChange={e => {
                        const updated = [...form.checklist];
                        updated[i] = e.target.checked;
                        setForm(f => ({ ...f, checklist: updated }));
                      }}
                      style={{ marginTop: '2px', width: '14px', height: '14px', accentColor: '#007ab8', flexShrink: 0 }}
                    />
                    <span style={{ fontSize: '13px', color: '#333', lineHeight: '1.5' }}>{item}</span>
                  </label>
                ))}
              </div>

              {/* Privacy Consent */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#333', marginBottom: '8px' }}>
                  Privacy Consent <span style={{ color: '#cc0000' }}>*</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={form.privacyConsent}
                    onChange={e => setForm(f => ({ ...f, privacyConsent: e.target.checked }))}
                    style={{ marginTop: '2px', width: '14px', height: '14px', accentColor: '#007ab8', flexShrink: 0 }}
                  />
                  <span style={{ fontSize: '13px', color: '#333', lineHeight: '1.5' }}>
                    Yes, I agree to have my data collected and stored according to the{' '}
                    <Link href="/policies/privacy" style={{ color: '#007ab8' }}>privacy statement</Link>.
                  </span>
                </label>
              </div>

              {/* Begin Submission button */}
              <button
                onClick={nextStep}
                style={{ backgroundColor: '#007ab8', color: '#fff', border: 'none', borderRadius: '3px', padding: '10px 24px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}
              >
                Begin Submission
              </button>
            </div>
          )}

          {/* ── STEP 1: Upload Files ── */}
          {step === 1 && (
            <div>
              <h2 style={{ fontSize: '15px', fontWeight: '700', color: '#333', marginTop: 0, marginBottom: '6px' }}>Upload Files</h2>
              <p style={{ fontSize: '13px', color: '#555', marginBottom: '20px', lineHeight: '1.6' }}>
                Please upload your submission files here. Once you have uploaded a file you will be able to edit the file metadata and add more files.
              </p>

              {errors.length > 0 && (
                <div style={{ background: '#fff3cd', border: '1px solid #ffc107', borderRadius: '4px', padding: '12px 16px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <AlertCircle size={14} color="#856404" />
                  <span style={{ fontSize: '13px', color: '#856404' }}>{errors[0]}</span>
                </div>
              )}

              {/* Upload Area */}
              <div
                onDrop={handleDrop}
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                style={{
                  border: `2px dashed ${dragOver ? '#007ab8' : '#ccc'}`,
                  borderRadius: '4px',
                  padding: '32px',
                  textAlign: 'center',
                  backgroundColor: dragOver ? '#f0f7fb' : '#fafafa',
                  marginBottom: '20px',
                  transition: 'all 0.2s',
                }}
              >
                <Upload size={28} color="#aaa" style={{ marginBottom: '10px' }} />
                <p style={{ fontSize: '13px', color: '#555', margin: '0 0 12px 0' }}>
                  Drag and drop a file here to begin upload
                </p>
                <label style={{ backgroundColor: '#007ab8', color: '#fff', padding: '8px 16px', borderRadius: '3px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', display: 'inline-block' }}>
                  Upload File
                  <input type="file" multiple onChange={handleFileAdd} style={{ display: 'none' }} accept=".doc,.docx,.pdf,.rtf" />
                </label>
              </div>

              {/* File List */}
              {form.files.length > 0 && (
                <div style={{ border: '1px solid #e0e0e0', borderRadius: '4px', overflow: 'hidden', marginBottom: '20px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '40px 1fr 180px 100px', padding: '8px 12px', backgroundColor: '#f8f9fa', borderBottom: '1px solid #e0e0e0', fontSize: '11px', fontWeight: '700', color: '#555', textTransform: 'uppercase' }}>
                    <span>ID</span><span>File Name</span><span>Date Uploaded</span><span>Type</span>
                  </div>
                  {form.files.map((file, i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '40px 1fr 180px 100px', padding: '10px 12px', borderBottom: '1px solid #f0f0f0', alignItems: 'center', fontSize: '13px' }}>
                      <span style={{ color: '#555' }}>{i + 1}</span>
                      <span style={{ color: '#333', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</span>
                      <span style={{ color: '#777', fontSize: '12px' }}>{new Date().toLocaleDateString()}</span>
                      <span style={{ backgroundColor: '#007ab8', color: '#fff', fontSize: '10px', padding: '2px 8px', borderRadius: '2px', fontWeight: '700', width: 'fit-content' }}>Article Text</span>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={prevStep} style={{ background: 'none', border: '1px solid #ccc', borderRadius: '3px', padding: '9px 18px', fontSize: '13px', cursor: 'pointer', color: '#555' }}>← Back</button>
                <button onClick={nextStep} style={{ backgroundColor: '#007ab8', color: '#fff', border: 'none', borderRadius: '3px', padding: '9px 20px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>
                  Save and Continue →
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 2: Contributors ── */}
          {step === 2 && (
            <div>
              <h2 style={{ fontSize: '15px', fontWeight: '700', color: '#333', marginTop: 0, marginBottom: '6px' }}>Contributors</h2>
              <p style={{ fontSize: '13px', color: '#555', marginBottom: '20px', lineHeight: '1.6' }}>
                Add details for all contributing authors and co-authors. The submitting author has been added as the default contributor.
              </p>

              {/* Add Contributor Form */}
              <div style={{ backgroundColor: '#f8f9fa', border: '1px solid #e0e0e0', borderRadius: '4px', padding: '16px', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#333', marginTop: 0, marginBottom: '12px' }}>Add Contributor</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#555', marginBottom: '4px' }}>Full Name <span style={{ color: '#cc0000' }}>*</span></label>
                    <input value={contributorName} onChange={e => setContributorName(e.target.value)} type="text" placeholder="e.g. John Smith" style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#555', marginBottom: '4px' }}>Email <span style={{ color: '#cc0000' }}>*</span></label>
                    <input value={contributorEmail} onChange={e => setContributorEmail(e.target.value)} type="email" placeholder="email@institution.edu" style={inputStyle} />
                  </div>
                </div>
                <button onClick={addContributor} style={{ backgroundColor: '#007ab8', color: '#fff', border: 'none', borderRadius: '3px', padding: '7px 16px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>
                  Add Contributor
                </button>
              </div>

              {/* Contributors Table */}
              {form.contributors.length > 0 ? (
                <div style={{ border: '1px solid #e0e0e0', borderRadius: '4px', overflow: 'hidden', marginBottom: '20px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 120px', padding: '8px 12px', backgroundColor: '#f8f9fa', borderBottom: '1px solid #e0e0e0', fontSize: '11px', fontWeight: '700', color: '#555', textTransform: 'uppercase' }}>
                    <span>Name</span><span>Email</span><span>Action</span>
                  </div>
                  {form.contributors.map((c, i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 120px', padding: '10px 12px', borderBottom: '1px solid #f0f0f0', fontSize: '13px', alignItems: 'center' }}>
                      <span style={{ color: '#333' }}>{c.name}</span>
                      <span style={{ color: '#555' }}>{c.email}</span>
                      <button onClick={() => setForm(f => ({ ...f, contributors: f.contributors.filter((_, j) => j !== i) }))}
                        style={{ color: '#cc0000', background: 'none', border: 'none', cursor: 'pointer', fontSize: '12px', textDecoration: 'underline', padding: 0 }}>
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: '13px', color: '#888', marginBottom: '20px' }}>No contributors added yet.</p>
              )}

              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={prevStep} style={{ background: 'none', border: '1px solid #ccc', borderRadius: '3px', padding: '9px 18px', fontSize: '13px', cursor: 'pointer', color: '#555' }}>← Back</button>
                <button onClick={nextStep} style={{ backgroundColor: '#007ab8', color: '#fff', border: 'none', borderRadius: '3px', padding: '9px 20px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>
                  Save and Continue →
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 3: For the Editors ── */}
          {step === 3 && (
            <div>
              <h2 style={{ fontSize: '15px', fontWeight: '700', color: '#333', marginTop: 0, marginBottom: '6px' }}>For the Editors</h2>
              <p style={{ fontSize: '13px', color: '#555', marginBottom: '20px', lineHeight: '1.6' }}>
                Please provide the following details in order to help our editorial team manage your submission.
                When entering metadata, provide entries that are considered to be most helpful to the person managing your submission.
                This information can be changed before publication.
              </p>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#333', marginBottom: '8px' }}>
                  Comments for the Editor
                </label>
                <textarea
                  value={form.editorComments}
                  onChange={e => setForm(f => ({ ...f, editorComments: e.target.value }))}
                  rows={8}
                  placeholder="Add any information you think our editorial staff should know when evaluating your submission..."
                  style={{ ...inputStyle, resize: 'vertical', lineHeight: '1.6' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '12px', color: '#888' }}>Last saved 1 hour ago</span>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={prevStep} style={{ background: 'none', border: '1px solid #ccc', borderRadius: '3px', padding: '9px 18px', fontSize: '13px', cursor: 'pointer', color: '#555' }}>← Back</button>
                  <button style={{ background: 'none', border: '1px solid #ccc', borderRadius: '3px', padding: '9px 14px', fontSize: '13px', cursor: 'pointer', color: '#555' }}>Cancel</button>
                  <button style={{ background: 'none', border: '1px solid #ccc', borderRadius: '3px', padding: '9px 14px', fontSize: '13px', cursor: 'pointer', color: '#555' }}>Save for Later</button>
                  <button onClick={nextStep} style={{ backgroundColor: '#007ab8', color: '#fff', border: 'none', borderRadius: '3px', padding: '9px 20px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}>
                    Continue →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 4: Review ── */}
          {step === 4 && (
            <div>
              <h2 style={{ fontSize: '15px', fontWeight: '700', color: '#333', marginTop: 0, marginBottom: '6px' }}>Review and Submit</h2>
              <p style={{ fontSize: '13px', color: '#555', marginBottom: '20px', lineHeight: '1.6' }}>
                Review the information you have entered before completing your submission. You can change any of the details
                displayed here by clicking the edit button at the top of each section. Once you complete your submission,
                a member of our editorial team will be assigned to review it.
              </p>

              {/* Validation errors */}
              {reviewErrors.length > 0 && (
                <div style={{ border: '1px solid #fca5a5', backgroundColor: '#fef2f2', borderRadius: '4px', padding: '14px 16px', marginBottom: '20px' }}>
                  <p style={{ fontSize: '13px', color: '#dc2626', fontWeight: '700', marginTop: 0, marginBottom: '8px' }}>
                    There are one or more problems that need to be fixed before you can submit. Please review the information below and make the requested changes.
                  </p>
                  {reviewErrors.map((e, i) => (
                    <p key={i} style={{ fontSize: '13px', color: '#dc2626', margin: '4px 0' }}>• {e}</p>
                  ))}
                </div>
              )}

              {/* Review Sections */}
              {[
                {
                  label: 'Details', items: [
                    { k: 'Title', v: form.title || <span style={{ color: '#cc0000' }}>Not provided</span> },
                  ]
                },
                {
                  label: 'Files', items: form.files.length > 0
                    ? form.files.map((f, i) => ({ k: `File ${i + 1}`, v: f.name }))
                    : [{ k: '', v: <span style={{ color: '#cc0000' }}>No files uploaded</span> }]
                },
                {
                  label: 'Contributors', items: form.contributors.length > 0
                    ? form.contributors.map(c => ({ k: c.name, v: c.email }))
                    : [{ k: '', v: <span style={{ color: '#cc0000' }}>No contributors added</span> }]
                },
                {
                  label: 'For the Editors', items: [
                    { k: 'Comments', v: form.editorComments || 'None' }
                  ]
                },
              ].map(section => (
                <div key={section.label} style={{ border: '1px solid #e0e0e0', borderRadius: '4px', overflow: 'hidden', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', backgroundColor: '#f8f9fa', borderBottom: '1px solid #e0e0e0' }}>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#333' }}>{section.label}</span>
                    <button style={{ fontSize: '12px', color: '#007ab8', background: 'none', border: '1px solid #007ab8', borderRadius: '3px', padding: '3px 10px', cursor: 'pointer' }}>Edit</button>
                  </div>
                  <div style={{ padding: '12px 14px' }}>
                    {section.items.map((item, i) => (
                      <div key={i} style={{ display: 'flex', gap: '12px', marginBottom: '6px', fontSize: '13px' }}>
                        {item.k && <span style={{ color: '#777', minWidth: '100px', fontWeight: '600' }}>{item.k}:</span>}
                        <span style={{ color: '#333' }}>{item.v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button onClick={prevStep} style={{ background: 'none', border: '1px solid #ccc', borderRadius: '3px', padding: '9px 18px', fontSize: '13px', cursor: 'pointer', color: '#555' }}>← Back</button>
                <button
                  onClick={handleSubmit}
                  disabled={reviewErrors.length > 0 || submitting}
                  style={{
                    backgroundColor: reviewErrors.length > 0 ? '#aaa' : '#007ab8',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '3px',
                    padding: '9px 24px',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: reviewErrors.length > 0 ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  {submitting && <span style={{ width: '13px', height: '13px', border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }}></span>}
                  {submitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
