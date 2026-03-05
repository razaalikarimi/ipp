'use client';
import { useState, useEffect } from 'react';
import { Bold, Italic, Underline, Link2, DivideSquare, Image as ImageIcon, UploadCloud } from 'lucide-react';

const PROFILE_TABS = ['Identity', 'Contact', 'Roles', 'Public', 'Password', 'Notifications', 'API Key'];

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

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('Identity');
  const [saving, setSaving] = useState(false);
  
  // Simulated state for UI purposes
  const [profile, setProfile] = useState({
    username: 'shubhsalunke',
    givenName: 'Shubham',
    familyName: 'Salunke',
    publicName: '',
    initials: '',
    email: 'shubhsalunke02@gmail.com',
    phone: '',
    affiliation: '',
    country: 'India',
    bio: '',
    homepage: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(p => ({ ...p, [name]: value }));
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 500);
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

  const helpTextStyle = {
    fontSize: '11px', 
    color: '#64748b', 
    marginTop: '6px',
    lineHeight: '1.4'
  };

  const saveBtnStyle = {
    color: '#005f96', 
    background: 'none', 
    border: 'none', 
    fontSize: '13px', 
    fontWeight: '600', 
    cursor: 'pointer',
    marginTop: '24px',
    padding: '0'
  };

  return (
    <div style={{ padding: '30px 40px', maxWidth: '1000px', width: '100%', boxSizing: 'border-box', fontFamily: '"Noto Sans", sans-serif' }}>
      
      {/* Title above tabs area if needed, but in OJS it's "Profile" as a top header inside the card */}
      
      <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '2px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
        
        <div style={{ padding: '20px 24px 0 24px' }}>
          <h1 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', margin: '0 0 20px 0' }}>Profile</h1>
          
          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', overflowX: 'auto', gap: '2px' }}>
            {PROFILE_TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '10px 16px', 
                  fontSize: '12px',
                  fontWeight: activeTab === tab ? '700' : '600',
                  color: activeTab === tab ? '#005f96' : '#64748b',
                  backgroundColor: 'transparent',
                  border: 'none', 
                  borderBottom: activeTab === tab ? '3px solid #005f96' : '3px solid transparent',
                  cursor: 'pointer', 
                  whiteSpace: 'nowrap',
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div style={{ padding: '24px', maxWidth: '800px' }}>
          
          {/* ── Identity Tab ── */}
          {activeTab === 'Identity' && (
            <div>
              <label style={labelStyle}>Username</label>
              <div style={{ fontSize: '13px', color: '#334155', marginBottom: '8px' }}>{profile.username}</div>

              <div>
                <label style={{...labelStyle, color: '#1e293b'}}>Name</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '4px' }}>
                  <div>
                    <input name="givenName" value={profile.givenName} onChange={handleChange} type="text" style={inputStyle} />
                    <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '4px' }}>Given Name <span style={{color:'#dc2626'}}>*</span></div>
                  </div>
                  <div>
                    <input name="familyName" value={profile.familyName} onChange={handleChange} type="text" style={inputStyle} />
                    <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '4px' }}>Family Name</div>
                  </div>
                </div>
                <p style={helpTextStyle}>Please provide the full name as the author should be identified on the published work. Example: Dr. Alan P. Mwandenga</p>
              </div>

              <div>
                <label style={labelStyle}>Preferred Public Name</label>
                <input name="publicName" value={profile.publicName} onChange={handleChange} type="text" style={inputStyle} />
              </div>

              <div>
                <label style={labelStyle}>Preferred Avatar Initials</label>
                <input name="initials" value={profile.initials} onChange={handleChange} type="text" style={{...inputStyle, width: '80px'}} />
                <p style={helpTextStyle}>Enter the two letters you'd like to use as your avatar. These initials will be displayed to represent you.</p>
              </div>

              <div style={{ marginTop: '30px', borderTop: '1px solid #e2e8f0', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#005f96', cursor: 'pointer', marginBottom: '4px' }}>Your data is stored in accordance with our privacy statement.</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Required fields are marked with an asterisk: <span style={{color:'#dc2626'}}>*</span></div>
                </div>
                <button onClick={handleSave} style={saveBtnStyle}>{saving ? 'Saving...' : 'Save'}</button>
              </div>
            </div>
          )}

          {/* ── Contact Tab ── */}
          {activeTab === 'Contact' && (
            <div>
              <div>
                <label style={{...labelStyle, marginTop: 0}}>Email <span style={{color:'#dc2626'}}>*</span></label>
                <input name="email" value={profile.email} onChange={handleChange} type="email" style={inputStyle} />
              </div>
              
              <div>
                <label style={labelStyle}>Signature</label>
                <div style={{ border: '1px solid #cbd5e1', borderRadius: '2px', overflow: 'hidden' }}>
                  <WysiwygToolbar />
                  <textarea rows={6} style={{ width: '100%', border: 'none', padding: '12px', outline: 'none', resize: 'vertical', fontSize: '13px', fontFamily: '"Noto Sans", sans-serif' }}></textarea>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Phone</label>
                <input name="phone" value={profile.phone} onChange={handleChange} type="text" style={inputStyle} />
              </div>

              <div>
                <label style={labelStyle}>Affiliation</label>
                <div style={{ border: '1px solid #cbd5e1', borderRadius: '2px', overflow: 'hidden' }}>
                  <WysiwygToolbar />
                  <textarea rows={4} style={{ width: '100%', border: 'none', padding: '12px', outline: 'none', resize: 'vertical', fontSize: '13px', fontFamily: '"Noto Sans", sans-serif' }}></textarea>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Mailing Address</label>
                <div style={{ border: '1px solid #cbd5e1', borderRadius: '2px', overflow: 'hidden' }}>
                  <WysiwygToolbar />
                  <textarea rows={3} style={{ width: '100%', border: 'none', padding: '12px', outline: 'none', resize: 'vertical', fontSize: '13px', fontFamily: '"Noto Sans", sans-serif' }}></textarea>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Country <span style={{color:'#dc2626'}}>*</span></label>
                <select name="country" value={profile.country} onChange={handleChange} style={inputStyle}>
                  <option value="India">India</option>
                  <option value="United States">United States</option>
                  <option value="United Kingdom">United Kingdom</option>
                </select>
              </div>

              <div style={{ marginTop: '30px', borderTop: '1px solid #e2e8f0', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#005f96', cursor: 'pointer', marginBottom: '4px' }}>Your data is stored in accordance with our privacy statement.</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Required fields are marked with an asterisk: <span style={{color:'#dc2626'}}>*</span></div>
                </div>
                <button onClick={handleSave} style={saveBtnStyle}>{saving ? 'Saving...' : 'Save'}</button>
              </div>
            </div>
          )}

          {/* ── Roles Tab ── */}
          {activeTab === 'Roles' && (
            <div>
              <div style={labelStyle}>Roles</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                <label style={{ fontSize: '13px', color: '#334155', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="checkbox" /> Reader
                </label>
                <label style={{ fontSize: '13px', color: '#334155', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="checkbox" defaultChecked /> Author
                </label>
                <label style={{ fontSize: '13px', color: '#334155', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="checkbox" defaultChecked /> Reviewer
                </label>
              </div>
              
              <button style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#fff', border: '1px solid #cbd5e1', color: '#005f96', padding: '6px 12px', fontSize: '13px', borderRadius: '2px', cursor: 'pointer', marginBottom: '24px' }}>
                <span style={{ fontSize: '16px' }}>+</span> Register with other journals
              </button>

              <div style={labelStyle}>Reviewing interests</div>
              <div style={{ border: '1px solid #cbd5e1', borderRadius: '2px', padding: '8px', minHeight: '40px', display: 'flex' }}>
                {/* tags logic would go here */}
              </div>

              <div style={{ marginTop: '30px', borderTop: '1px solid #e2e8f0', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#005f96', cursor: 'pointer', marginBottom: '4px' }}>Your data is stored in accordance with our privacy statement.</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Required fields are marked with an asterisk: <span style={{color:'#dc2626'}}>*</span></div>
                </div>
                <button onClick={handleSave} style={saveBtnStyle}>{saving ? 'Saving...' : 'Save'}</button>
              </div>
            </div>
          )}

          {/* ── Public Tab ── */}
          {activeTab === 'Public' && (
            <div>
              <div style={{...labelStyle, marginTop: 0}}>Profile Image</div>
              <div style={{ border: '1px solid #cbd5e1', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', marginBottom: '24px', backgroundColor: '#f8fafc' }}>
                <div style={{ fontSize: '12px', color: '#94a3b8' }}>Drag and drop a file here to begin upload</div>
                <button style={{ backgroundColor: '#fff', border: '1px solid #cbd5e1', color: '#005f96', padding: '6px 12px', fontSize: '12px', borderRadius: '2px', cursor: 'pointer' }}>
                  Upload File
                </button>
              </div>

              <div>
                <label style={labelStyle}>Bio Statement (e.g., department and rank)</label>
                <div style={{ border: '1px solid #cbd5e1', borderRadius: '2px', overflow: 'hidden' }}>
                  <WysiwygToolbar />
                  <textarea rows={5} style={{ width: '100%', border: 'none', padding: '12px', outline: 'none', resize: 'vertical', fontSize: '13px', fontFamily: '"Noto Sans", sans-serif' }}></textarea>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Homepage URL</label>
                <input name="homepage" value={profile.homepage} onChange={handleChange} type="text" style={inputStyle} />
              </div>

              <div style={{ marginTop: '30px', borderTop: '1px solid #e2e8f0', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '11px', color: '#005f96', cursor: 'pointer', marginBottom: '4px' }}>Your data is stored in accordance with our privacy statement.</div>
                  <div style={{ fontSize: '11px', color: '#64748b' }}>Required fields are marked with an asterisk: <span style={{color:'#dc2626'}}>*</span></div>
                </div>
                <button onClick={handleSave} style={saveBtnStyle}>{saving ? 'Saving...' : 'Save'}</button>
              </div>
            </div>
          )}

          {/* ── Password Tab ── */}
          {activeTab === 'Password' && (
            <div>
              <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>Enter your current and new passwords below to change the password for your account.</p>
              
              <div style={{ maxWidth: '300px' }}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={labelStyle}>Current password</label>
                  <input type="password" style={inputStyle} />
                </div>
                
                <div style={{ marginBottom: '16px' }}>
                  <label style={labelStyle}>New password</label>
                  <input type="password" style={inputStyle} />
                  <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>The password must be at least 6 characters.</div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={labelStyle}>Repeat new password</label>
                  <input type="password" style={inputStyle} />
                </div>
              </div>

              <div style={{ marginTop: '30px', borderTop: '1px solid #e2e8f0', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '11px', color: '#005f96', cursor: 'pointer' }}>Your data is stored in accordance with our privacy statement.</div>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <button style={{ color: '#dc2626', background: 'none', border: 'none', fontSize: '13px', cursor: 'pointer', padding: 0 }}>Cancel</button>
                  <button onClick={handleSave} style={{ color: '#005f96', background: 'none', border: 'none', fontSize: '13px', fontWeight: '600', cursor: 'pointer', padding: 0 }}>{saving ? 'Saving...' : 'Save'}</button>
                </div>
              </div>
            </div>
          )}

          {/* ── Notifications Tab ── */}
          {activeTab === 'Notifications' && (
            <div>
              <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '24px', lineHeight: '1.5' }}>
                Select the system events that you wish to be notified about. Unchecking an item will prevent notifications of the event from showing up in the system and also from being emailed to you. Checked events will appear in the system and you have an extra option to receive or not the same notification by email.
              </p>

              <h3 style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', marginBottom: '12px' }}>Public Announcements</h3>
              
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '13px', color: '#1e293b', fontWeight: '600', marginBottom: '8px' }}>A new announcement has been created.</div>
                <label style={{ fontSize: '12px', color: '#475569', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <input type="checkbox" defaultChecked /> Enable these types of notifications.
                </label>
                <label style={{ fontSize: '12px', color: '#475569', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="checkbox" /> Do not send me an email for these types of notifications.
                </label>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '13px', color: '#1e293b', fontWeight: '600', marginBottom: '8px' }}>An issue has been published.</div>
                <label style={{ fontSize: '12px', color: '#475569', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <input type="checkbox" defaultChecked /> Enable these types of notifications.
                </label>
                <label style={{ fontSize: '12px', color: '#475569', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input type="checkbox" /> Do not send me an email for these types of notifications.
                </label>
              </div>
              
              {/* Other notifications left out for brevity, but this gives the structural match */}
              <div style={{ marginTop: '30px', borderTop: '1px solid #e2e8f0', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div></div>
                <button onClick={handleSave} style={saveBtnStyle}>{saving ? 'Saving...' : 'Save'}</button>
              </div>
            </div>
          )}

          {/* ── API Key Tab ── */}
          {activeTab === 'API Key' && (
            <div>
              <div style={{ border: '1px solid #e2e8f0', borderLeft: '3px solid #dc2626', padding: '12px 16px', marginBottom: '24px', backgroundColor: '#fff', fontSize: '12px', color: '#475569' }}>
                <strong style={{ color: '#1e293b' }}>Notification</strong><br/>
                Before generating an API key, your site administrator must set a secret in the config file ("api_key_secret").
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '24px', alignItems: 'start' }}>
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', marginBottom: '4px' }}>API Key</div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>None</div>
                </div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>
                  Deleting a key will revoke access to any application that uses it.
                </div>
              </div>

              <div style={{ marginTop: '30px', borderTop: '1px solid #e2e8f0', paddingTop: '16px', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <div style={{ fontSize: '11px', color: '#005f96', cursor: 'pointer' }}>Your data is stored in accordance with our privacy statement.</div>
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}
