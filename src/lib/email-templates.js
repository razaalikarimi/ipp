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
    editorName
}) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f7f9; }
            .container { max-width: 650px; margin: 20px auto; background: #ffffff; border: 1px solid #e1e8ed; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
            .header { background-color: #002137; color: #ffffff; padding: 25px 35px; text-align: left; }
            .header h1 { margin: 0; font-size: 20px; font-weight: 700; letter-spacing: 0.5px; }
            .content { padding: 35px; }
            .greeting { font-size: 16px; margin-bottom: 20px; }
            .message { margin-bottom: 25px; font-size: 15px; }
            .highlight { background-color: #fff9c4; padding: 2px 4px; font-weight: 600; }
            .abstract-section { border-left: 4px solid #005f96; padding-left: 20px; margin: 25px 0; background-color: #f8fafc; padding: 15px 20px; }
            .abstract-title { font-weight: 700; color: #002137; margin-bottom: 8px; display: block; text-transform: uppercase; font-size: 13px; letter-spacing: 0.5px; }
            .abstract-text { font-style: italic; color: #444; font-size: 14px; }
            .cta-section { margin: 35px 0; text-align: left; }
            .btn { display: inline-block; padding: 12px 24px; background-color: #005f96; color: #ffffff !important; text-decoration: none; border-radius: 5px; font-weight: 700; font-size: 14px; }
            .btn-secondary { background-color: #f1f5f9; color: #475569 !important; margin-left: 10px; border: 1px solid #e2e8f0; }
            .timeline { background-color: #fff7ed; border: 1px solid #ffedd5; padding: 15px; border-radius: 6px; margin-bottom: 25px; }
            .timeline-item { display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 13px; }
            .timeline-label { color: #9a3412; font-weight: 700; }
            .timeline-date { color: #c2410c; }
            .note { font-size: 13px; color: #64748b; border-top: 1px solid #f1f5f9; paddingTop: 20px; margin-top: 25px; }
            .footer { background-color: #f8fafc; padding: 25px 35px; border-top: 1px solid #f1f5f9; font-size: 13px; color: #64748b; }
            .footer p { margin: 5px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Invitation to Review</h1>
            </div>
            <div class="content">
                <p class="greeting">Dear ${reviewerName},</p>
                
                <p class="message">
                    I believe that you would serve as an excellent reviewer for a submission to the <span class="highlight">${journalName}</span>. 
                    The submission's title and abstract are below, and I hope that you will consider undertaking this important task for us.
                </p>

                <div style="margin-bottom: 20px;">
                    <strong style="color: #002137; font-size: 15px;">Article Title:</strong>
                    <p style="margin-top: 5px; font-size: 15px; color: #333;">${articleTitle}</p>
                </div>

                <div class="abstract-section">
                    <span class="abstract-title">Abstract</span>
                    <p class="abstract-text">${abstract}</p>
                </div>

                <div class="timeline">
                    <div class="timeline-item">
                        <span class="timeline-label">Response Due By:</span>
                        <span class="timeline-date">${responseDueDate}</span>
                    </div>
                </div>

                <p class="message">
                    If you are able to review this submission, your review is due by <span style="font-weight: 700;">${reviewDueDate}</span>. 
                    You can view the submission, upload review files, and submit your review by logging into the journal site.
                </p>

                <div class="cta-section" style="display: flex; gap: 10px;">
                    <a href="${dashboardUrl}" class="btn">Accept or Decline</a>
                </div>

                <div class="note">
                    <p><strong>Note:</strong> Kindly don't use or upload the manuscript in any AI applications.</p>
                    <p>You may contact me with any questions about the submission or the review process.</p>
                </div>

                <div style="margin-top: 30px;">
                    <p style="margin: 0; font-weight: 700;">Kind regards,</p>
                    <p style="margin: 5px 0;">Managing Editor</p>
                    <p style="margin: 0; color: #005f96;">${editorName}</p>
                </div>
            </div>
            <div class="footer">
                <p>&copy; ${new Date().getFullYear()} ${journalName}. All rights reserved.</p>
                <p>This is an automated message. Please do not reply directly to this email.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};
