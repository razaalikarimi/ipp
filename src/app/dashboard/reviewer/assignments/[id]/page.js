'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ChevronLeft, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  User, 
  Download,
  Info,
  Send,
  Save,
  Check
} from 'lucide-react';
import Link from 'next/link';

export default function ReviewerEvaluationPage() {
  const { id } = useParams();
  const router = useRouter();
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Evaluation State
  const [evaluation, setEvaluation] = useState({
    commentsForAuthors: '',
    commentsForEditors: '',
    checklist: {
      q1: null, // Figures and tables satisfactory?
      q2: null, // Reference list cover relevant literature?
      q3: null, // Statistical methods valid?
      q4: null, // Methods sufficiently documented?
      q5: null, // Quality of writing?
    },
    recommendation: '',
  });

  useEffect(() => {
    const fetchEverything = async () => {
      try {
        const token = localStorage.getItem('eisr_token');
        
        // 1. Fetch submission details
        const subRes = await fetch(`/api/submissions/${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const subData = await subRes.json();
        
        if (subData.success) {
          setSubmission(subData.submission);
        }

        // 2. Fetch existing review draft
        const revRes = await fetch(`/api/reviewer/reviews?submissionId=${id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const revData = await revRes.json();

        if (revData.success && revData.review) {
          const r = revData.review;
          setEvaluation({
            commentsForAuthors: r.comments_authors || '',
            commentsForEditors: r.comments_editors || '',
            checklist: r.checklist_json ? JSON.parse(r.checklist_json) : {
              q1: null, q2: null, q3: null, q4: null, q5: null
            },
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

  const handleChecklistChange = (q, value) => {
    setEvaluation(prev => ({
      ...prev,
      checklist: { ...prev.checklist, [q]: value }
    }));
  };

  const handleAction = async (isDraft = true) => {
    setSaving(true);
    try {
      const token = localStorage.getItem('eisr_token');
      const res = await fetch('/api/reviewer/reviews', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          submissionId: id,
          checklist: evaluation.checklist,
          commentsAuthors: evaluation.commentsForAuthors,
          commentsEditors: evaluation.commentsForEditors,
          recommendation: evaluation.recommendation,
          isDraft
        })
      });

      const data = await res.json();
      if (data.success) {
        alert(isDraft ? 'Draft saved!' : 'Review submitted successfully!');
        if (!isDraft) router.push('/dashboard/reviewer/action-required');
      } else {
        alert(data.message || 'Action failed');
      }
    } catch (err) {
      alert('Network error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-[#005f96] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto', fontFamily: '"Noto Sans", sans-serif', color: '#333' }}>
      
      {/* ── Breadcrumbs & Header ── */}
      <div style={{ marginBottom: '24px' }}>
        <Link href="/dashboard/reviewer/action-required" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#005f96', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
          <ChevronLeft size={16} /> Back to Assignments
        </Link>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '15px' }}>
          <div>
            <span style={{ fontSize: '12px', color: '#4BA6B9', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Manuscript ID: #{submission.id}</span>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#1a1a1a', margin: '5px 0' }}>Review Submission</h1>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => handleAction(true)}
              disabled={saving}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', backgroundColor: '#fff', border: '1.5px solid #cbd5e1', borderRadius: '8px', color: '#475569', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
              <Save size={18} /> {saving ? 'Saving...' : 'Save Draft'}
            </button>
            <button 
              onClick={() => handleAction(false)}
              disabled={saving}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', backgroundColor: '#005f96', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '14px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,95,150,0.2)' }}>
              <Send size={18} /> {saving ? 'Submitting...' : 'Submit My Report'}
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '30px' }}>
        
        {/* ── Left Column: Form ── */}
        <div style={{ spaceY: '25px' }}>
          
          {/* Section 1: Evaluation Checklist */}
          <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', marginBottom: '25px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '700', borderBottom: '1px solid #f1f5f9', paddingBottom: '15px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle size={20} color="#005f96" /> Evaluation Checklist
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {[
                { id: 'q1', text: 'Is the quality of the figures and tables satisfactory?' },
                { id: 'q2', text: 'Does the reference list cover the relevant literature adequately?' },
                { id: 'q3', text: 'Are the statistical methods used valid and correctly applied?' },
                { id: 'q4', text: 'Are the methods sufficiently documented to allow replication?' },
                { id: 'q5', text: 'Is the quality of writing and language professional?' },
              ].map((q, idx) => (
                <div key={q.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: idx < 4 ? '1px solid #f8fafc' : 'none' }}>
                  <span style={{ fontSize: '14px', color: '#444', fontWeight: '500', maxWidth: '70%' }}>
                    {idx + 1}. {q.text}
                  </span>
                  <div style={{ display: 'flex', border: '1px solid #e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
                    {['Yes', 'No', 'N/A'].map(opt => (
                      <button
                        key={opt}
                        onClick={() => handleChecklistChange(q.id, opt)}
                        style={{
                          padding: '6px 16px', fontSize: '12px', fontWeight: '600', border: 'none', cursor: 'pointer',
                          backgroundColor: evaluation.checklist[q.id] === opt ? '#005f96' : '#fff',
                          color: evaluation.checklist[q.id] === opt ? '#fff' : '#64748b',
                          transition: 'all 0.2s',
                          borderLeft: opt !== 'Yes' ? '1px solid #e2e8f0' : 'none'
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Comments for Authors */}
          <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px', marginBottom: '25px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '700', borderBottom: '1px solid #f1f5f9', paddingBottom: '15px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FileText size={20} color="#005f96" /> Reviewer Comments for Authors
            </h2>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '15px' }}>
              Please provide detailed feedback on the manuscript's strengths and weaknesses. Be constructive and specific.
            </p>
            <textarea 
              placeholder="Enter your detailed comments here..."
              value={evaluation.commentsForAuthors}
              onChange={e => setEvaluation(prev => ({ ...prev, commentsForAuthors: e.target.value }))}
              style={{ width: '100%', minHeight: '200px', padding: '15px', border: '1.5px solid #e2e8f0', borderRadius: '8px', fontSize: '14px', outline: 'none', fontFamily: 'inherit', resize: 'vertical' }}
            />
          </div>

          {/* Section 3: Recommendation */}
          <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '24px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '700', borderBottom: '1px solid #f1f5f9', paddingBottom: '15px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AlertCircle size={20} color="#005f96" /> Final Recommendation
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                { id: 'accept', label: 'Accept Submission', color: '#16a34a' },
                { id: 'revisions', label: 'Revisions Required', color: '#ca8a04' },
                { id: 'resubmit', label: 'Resubmit for Review', color: '#2563eb' },
                { id: 'decline', label: 'Decline Submission', color: '#dc2626' },
              ].map(rec => (
                <button
                  key={rec.id}
                  onClick={() => setEvaluation(prev => ({ ...prev, recommendation: rec.id }))}
                  style={{
                    padding: '14px', textAlign: 'left', borderRadius: '10px', fontSize: '14px', fontWeight: '600',
                    border: '2px solid', 
                    borderColor: evaluation.recommendation === rec.id ? rec.color : '#e2e8f0',
                    backgroundColor: evaluation.recommendation === rec.id ? rec.color + '10' : '#fff',
                    color: evaluation.recommendation === rec.id ? rec.color : '#64748b',
                    cursor: 'pointer', transition: 'all 0.2s',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                  }}
                >
                  {rec.label}
                  {evaluation.recommendation === rec.id && <Check size={16} />}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* ── Right Column: Sidebar Info ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Manuscript Details */}
          <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Info size={16} color="#005f96" /> Manuscript Details
            </h3>
            <div style={{ fontSize: '13px', spaceY: '12px' }}>
              <div style={{ marginBottom: '12px' }}>
                <span style={{ color: '#64748b', display: 'block' }}>Title</span>
                <strong style={{ display: 'block', marginTop: '4px' }}>{submission.title}</strong>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <span style={{ color: '#64748b', display: 'block' }}>Authors</span>
                <strong style={{ display: 'block', marginTop: '4px' }}>
                  {submission.contributors?.map(c => c.name).join(', ') || 'Anonymous'}
                </strong>
              </div>
              <div style={{ marginBottom: '12px' }}>
                <span style={{ color: '#64748b', display: 'block' }}>Submitted On</span>
                <strong>{new Date(submission.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</strong>
              </div>
              <div style={{ marginTop: '15px' }}>
                <button style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px', backgroundColor: '#fff', border: '1px solid #005f96', borderRadius: '6px', color: '#005f96', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
                  <Download size={14} /> Full Manuscript PDF
                </button>
              </div>
            </div>
          </div>

          {/* AI Helper Banner */}
          <div style={{ 
            background: 'linear-gradient(135deg, #005f96 0%, #002137 100%)', 
            borderRadius: '12px', padding: '20px', color: '#fff', position: 'relative', overflow: 'hidden' 
          }}>
            <div style={{ position: 'absolute', top: -10, right: -10, width: '60px', height: '60px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '50%' }} />
            <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '10px', position: 'relative' }}>A-I-R-A</h3>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', lineHeight: '1.5', margin: 0 }}>
              Hi, I'm your AI Review Assistant. Ask me anything about the manuscript—structure, claims, or clarity.
            </p>
            <button style={{ marginTop: '12px', background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '4px', padding: '6px 12px', color: '#fff', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}>
              Ask AIRA
            </button>
          </div>

          {/* Peer Review Timeline */}
          <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={16} color="#005f96" /> Review Deadline
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#fff7ed', padding: '12px', borderRadius: '8px', border: '1px solid #ffedd5' }}>
              <AlertCircle size={18} color="#f97316" />
              <div>
                <span style={{ fontSize: '12px', color: '#9a3412', display: 'block', fontWeight: '700' }}>
                  Expected by: {submission.assignment?.assigned_at ? new Date(new Date(submission.assignment.assigned_at).getTime() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '14 Days'}
                </span>
                <span style={{ fontSize: '11px', color: '#c2410c' }}>
                  {submission.assignment?.assigned_at ? 
                    `${Math.max(0, Math.ceil((new Date(new Date(submission.assignment.assigned_at).getTime() + 14 * 24 * 60 * 60 * 1000) - new Date()) / (1000 * 60 * 60 * 24)))} days remaining` : 
                    'Deadline active'}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

      <style jsx>{`
        textarea:focus { border-color: #005f96 !important; box-shadow: 0 0 0 3px rgba(0,95,150,0.1); }
        button:hover { opacity: 0.9; transform: translateY(-1px); }
        button:active { transform: translateY(0); }
      `}</style>
    </div>
  );
}
