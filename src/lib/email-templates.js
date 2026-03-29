/**
 * Professional Email Templates for EISR Academic Portal
 * Inspired by OJS and standard journal correspondence
 */

export const getInvitationEmailTemplate = ({
    reviewerName,
    journalName,
    articleTitle,
    abstract,
    responseDueDate,
    reviewDueDate,
    dashboardUrl,
    editorName,
    acceptLink,
    declineLink
}) => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: Arial, Helvetica, sans-serif;
      font-size: 15px;
      line-height: 1.8;
      color: #222222;
      background-color: #ffffff;
      margin: 0;
      padding: 0;
    }
    .wrap {
      max-width: 720px;
      margin: 0 auto;
      padding: 30px 20px 40px 20px;
      background: #ffffff;
    }
    p { margin: 0 0 16px 0; }
    a { color: #1155cc; }
    .bold-title { font-weight: bold; }
    .abstract-heading { font-weight: bold; margin-top: 18px; margin-bottom: 6px; }
    .abstract-text { margin: 0 0 16px 0; text-align: justify; }
    .action-links { margin: 24px 0; font-weight: bold; }
    .action-btn { margin-right: 20px; text-decoration: underline; color: #1155cc; }
    .action-btn-decline { text-decoration: underline; color: #cc0000; }
    .signature { margin-top: 24px; }
    .signature p { margin: 0 0 5px 0; }
  </style>
</head>
<body>
  <div class="wrap">
    <p>Dear ${reviewerName},</p>

    <p>
      I am writing to respectfully request your expertise and invite you to serve as a reviewer for a manuscript that has been recently submitted to the <strong>${journalName}</strong>. Given your extensive and highly regarded research background in this field, we firmly believe that your insights would serve as an invaluable contribution to our editorial evaluation process. We hold your scientific judgment in the highest esteem and hope that you will consider undertaking this important task for our distinguished journal.
    </p>

    <p>
      The editorial board has conducted an initial assessment of the manuscript and concluded that it warrants a comprehensive peer review to determine its suitability for publication. Your rigorous evaluation and constructive feedback are crucial in helping us maintain the exceptional scientific standards and academic integrity that our readership consistently expects from us.
    </p>

    <p class="bold-title">Title: ${articleTitle}</p>

    <p class="abstract-heading">Abstract:</p>
    <p class="abstract-text">${abstract}</p>

    <p>
      If you are able to accommodate this request and review this submission, your comprehensive evaluation and final recommendation will be due by <strong>${reviewDueDate}</strong>. As a reviewer, you will be expected to thoroughly examine the methodology, validate the empirical claims, and provide constructive commentary that can guide both the authors in the revision process and the editorial team in reaching a final publication decision.
    </p>

    <p>
      You can securely view the complete manuscript, upload detailed review files, and submit your final recommendation by logging into our dedicated manuscript management system. The platform will guide you through our standard evaluation questionnaire and provide secure access to all necessary supplementary materials required for your assessment at <a href="${dashboardUrl}">${dashboardUrl}</a>.
    </p>

    <div class="action-links">
      <p>Please click one of the following links to accept or decline the review by <strong>${responseDueDate}</strong>:</p>
      <p>
        <a href="${acceptLink}" class="action-btn">Accept Review</a> | 
        <a href="${declineLink}" class="action-btn-decline">Decline Review</a>
      </p>
    </div>

    <p><strong>Kindly don't use or upload the manuscript in AI applications.</strong> Maintaining the strictest confidentiality of unpublished research is a foundational ethical requirement of our peer review process, and we rely on our reviewers to protect the intellectual property of our submitting authors.</p>

    <p>You may contact me directly should you encounter any technical difficulties accessing the system, or if you have any preliminary questions regarding the submission or the scope of the review process.</p>

    <p>Thank you for your time, dedication to the scientific community, and for considering this request. Your scholarly help is very much appreciated.</p>

    <div class="signature">
      <p>Kind regards,</p>
      <p>Managing Editor</p>
      <p style="color:#666">${editorName}</p>
    </div>
  </div>
</body>
</html>`;
};


export const getSubmissionNotificationTemplate = ({
    authorName,
    authorEmail,
    articleTitle,
    submissionId,
    journalName,
    editorComments,
    submissionDate,
    portalUrl,
}) => {
    const year = new Date().getFullYear();
    const commentsBlock = editorComments && editorComments.trim()
        ? `<div class="comments-box">
               <div class="clabel">Comments for the Editor</div>
               <div>${editorComments}</div>
           </div>`
        : '';

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f7f9; }
    .wrap { max-width: 650px; margin: 20px auto; background: #ffffff; border: 1px solid #e1e8ed; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
    .hdr { background-color: #002137; color: #ffffff; padding: 28px 35px; }
    .hdr h1 { margin: 0 0 4px 0; font-size: 20px; font-weight: 700; letter-spacing: 0.5px; }
    .hdr p { margin: 0; font-size: 13px; opacity: 0.72; }
    .body { padding: 35px; }
    .badge { display: inline-block; background-color: #00a86b; color: #fff; font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; padding: 3px 10px; border-radius: 20px; margin-bottom: 16px; }
    .intro { font-size: 15px; margin-bottom: 26px; color: #444; }
    .title-box { background: #fff9c4; border-left: 4px solid #f59e0b; padding: 14px 18px; border-radius: 0 6px 6px 0; margin-bottom: 26px; }
    .title-box .tlbl { font-size: 11px; font-weight: 700; color: #92400e; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; }
    .title-box .ttl { font-size: 15px; font-weight: 600; color: #1e293b; }
    .card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 22px 25px; margin-bottom: 26px; }
    .row { display: flex; align-items: flex-start; margin-bottom: 13px; }
    .row:last-child { margin-bottom: 0; }
    .rlbl { font-weight: 700; color: #002137; font-size: 13px; min-width: 150px; padding-top: 1px; }
    .rval { color: #334155; font-size: 14px; flex: 1; }
    .rval a { color: #005f96; text-decoration: none; }
    .pill { display: inline-block; background: #eff6ff; border: 1px solid #bfdbfe; color: #1d4ed8; font-size: 13px; font-weight: 700; padding: 4px 12px; border-radius: 20px; }
    .comments-box { background: #f0fdf4; border-left: 4px solid #22c55e; padding: 14px 18px; border-radius: 0 6px 6px 0; margin-bottom: 26px; font-size: 14px; color: #166534; }
    .clabel { font-weight: 700; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; }
    .btn { display: inline-block; padding: 13px 26px; background-color: #005f96; color: #ffffff !important; text-decoration: none; border-radius: 6px; font-weight: 700; font-size: 14px; }
    .note { font-size: 13px; color: #64748b; margin-top: 26px; padding-top: 18px; border-top: 1px solid #f1f5f9; }
    .ftr { background-color: #f8fafc; padding: 22px 35px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; }
    .ftr p { margin: 4px 0; }
  </style>
</head>
<body>
  <div class="wrap">
    <div class="hdr">
      <h1>EISR Portal &mdash; New Submission Received</h1>
      <p>Eye-Innovations Scientific Research | Academic Publishing System</p>
    </div>
    <div class="body">
      <span class="badge">&#10003; New Submission</span>
      <p class="intro">A new manuscript has been submitted through the EISR Portal. Please review the details below and take the appropriate editorial action.</p>

      <div class="title-box">
        <div class="tlbl">Manuscript Title</div>
        <div class="ttl">${articleTitle}</div>
      </div>

      <div class="card">
        <div class="row">
          <span class="rlbl">Submission ID</span>
          <span class="rval"><span class="pill">#${submissionId}</span></span>
        </div>
        <div class="row">
          <span class="rlbl">Author</span>
          <span class="rval">${authorName}</span>
        </div>
        <div class="row">
          <span class="rlbl">Author Email</span>
          <span class="rval"><a href="mailto:${authorEmail}">${authorEmail}</a></span>
        </div>
        <div class="row">
          <span class="rlbl">Journal</span>
          <span class="rval">${journalName}</span>
        </div>
        <div class="row">
          <span class="rlbl">Date Submitted</span>
          <span class="rval">${submissionDate}</span>
        </div>
      </div>

      ${commentsBlock}

      <p style="font-size:14px; color:#475569; margin-bottom:14px;">Log in to the editorial dashboard to assign reviewers and manage this submission.</p>
      <a href="${portalUrl}/dashboard" class="btn">Open Editorial Dashboard &rarr;</a>

      <div class="note">
        <p>This is an automated notification from the EISR Portal. Please do not reply directly to this email.</p>
      </div>
    </div>
    <div class="ftr">
      <p>&copy; ${year} Eye-Innovations Scientific Research (EISR). All rights reserved.</p>
      <p>EISR Academic Publishing Portal</p>
    </div>
  </div>
</body>
</html>`;
};
