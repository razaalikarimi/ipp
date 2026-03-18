import nodemailer from 'nodemailer';
import { getInvitationEmailTemplate } from './email-templates';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Send an invitation email to a reviewer
 */
export const sendReviewerInvitation = async ({
  to,
  reviewerName,
  journalName = 'Journal of Cyber Security and Risk Auditing',
  articleTitle,
  abstract,
  responseDueDate,
  reviewDueDate,
  submissionId,
  editorName = 'Editorial Team'
}) => {
  const dashboardUrl = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard/reviewer/assignments/${submissionId}`;
  
  const html = getInvitationEmailTemplate({
    reviewerName,
    journalName,
    articleTitle,
    abstract,
    responseDueDate,
    reviewDueDate,
    dashboardUrl,
    editorName
  });

  const mailOptions = {
    from: `"${journalName}" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to,
    subject: `Invitation to review: ${articleTitle.substring(0, 50)}${articleTitle.length > 50 ? '...' : ''}`,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Invitation email sent: %s', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending invitation email:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Send general notification email
 */
export const sendNotificationEmail = async (to, subject, text, html) => {
  const mailOptions = {
    from: `"${process.env.SMTP_FROM_NAME || 'EISR Portal'}" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to,
    subject,
    text,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Error sending notification email:', error);
    return { success: false, error };
  }
};
