import nodemailer from 'nodemailer';

// Check if email configuration is available
const isEmailConfigured = process.env.EMAIL_USER && process.env.EMAIL_PASSWORD;

// Email configuration (only create if configured)
let transporter: nodemailer.Transporter | null = null;

if (isEmailConfigured) {
  try {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    console.log('📧 Email service configured successfully');
  } catch (error) {
    console.error('❌ Failed to configure email service:', error);
    transporter = null;
  }
} else {
  console.log('⚠️  Email service not configured - missing EMAIL_USER or EMAIL_PASSWORD');
}

// Email template for contact reply
const createReplyEmailTemplate = (name: string, originalMessage: string, replyMessage: string) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #ef4444, #eab308); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .original-message { background: #e5e7eb; padding: 15px; border-left: 4px solid #6b7280; margin: 20px 0; border-radius: 5px; }
        .reply-message { background: #dcfce7; padding: 15px; border-left: 4px solid #22c55e; margin: 20px 0; border-radius: 5px; }
        .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; }
        .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">🔥 Shakti Sabha</div>
          <h1>Thank you for contacting us!</h1>
        </div>
        <div class="content">
          <p>Dear ${name},</p>
          <p>Thank you for reaching out to us. We have received your message and here is our response:</p>
          
          <div class="original-message">
            <h3>📝 Your Original Message:</h3>
            <p>${originalMessage.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div class="reply-message">
            <h3>💬 Our Response:</h3>
            <p>${replyMessage.replace(/\n/g, '<br>')}</p>
          </div>
          
          <p>If you have any further questions, please don't hesitate to contact us.</p>
          <p>Best regards,<br><strong>The Shakti Sabha Team</strong></p>
        </div>
        <div class="footer">
          <p>&copy; 2024 Shakti Sabha. All rights reserved.</p>
          <p>💪 Empowering women through education and support.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Function to send reply email
export const sendReplyEmail = async (
  userEmail: string,
  userName: string,
  subject: string,
  originalMessage: string,
  replyMessage: string
): Promise<boolean> => {
  if (!transporter || !isEmailConfigured) {
    console.log('⚠️  Email not configured - reply email not sent');
    return false;
  }

  try {
    const mailOptions = {
      from: {
        name: 'Shakti Sabha',
        address: process.env.EMAIL_USER || 'noreply@shaktisabha.com'
      },
      to: userEmail,
      subject: `Re: ${subject} - Shakti Sabha`,
      html: createReplyEmailTemplate(userName, originalMessage, replyMessage),
      text: `Dear ${userName},\n\nThank you for contacting us. Here is our response to your message:\n\nYour Original Message:\n${originalMessage}\n\nOur Response:\n${replyMessage}\n\nBest regards,\nThe Shakti Sabha Team`
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Reply email sent successfully:', result.messageId);
    return true;
  } catch (error) {
    console.error('❌ Error sending reply email:', error);
    return false;
  }
};

// Function to send contact confirmation email
export const sendContactConfirmationEmail = async (
  userEmail: string,
  userName: string,
  subject: string
): Promise<boolean> => {
  if (!transporter || !isEmailConfigured) {
    console.log('⚠️  Email not configured - confirmation email not sent');
    return false;
  }

  try {
    const mailOptions = {
      from: {
        name: 'Shakti Sabha',
        address: process.env.EMAIL_USER || 'noreply@shaktisabha.com'
      },
      to: userEmail,
      subject: '✅ Message Received - Shakti Sabha',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #ef4444, #eab308); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; }
            .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
            .highlight { background: #fef3c7; padding: 10px; border-radius: 5px; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🔥 Shakti Sabha</div>
              <h1>Message Received!</h1>
            </div>
            <div class="content">
              <p>Dear ${userName},</p>
              <p>Thank you for contacting us! We have received your message and are excited to help you.</p>
              
              <div class="highlight">
                <p><strong>📋 Your Message Subject:</strong> ${subject}</p>
                <p><strong>⏰ Response Time:</strong> We will get back to you within 24 hours</p>
              </div>
              
              <p>Our team is committed to providing you with the best support possible. We appreciate your interest in Shakti Sabha and look forward to helping you on your empowerment journey.</p>
              
              <p>Best regards,<br><strong>The Shakti Sabha Team</strong></p>
            </div>
            <div class="footer">
              <p>&copy; 2024 Shakti Sabha. All rights reserved.</p>
              <p>💪 Empowering women through education and support.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `Dear ${userName},\n\nThank you for contacting us! We have received your message regarding "${subject}" and will get back to you within 24 hours.\n\nOur team is committed to provide you with the best support possible.\n\nBest regards,\nThe Shakti Sabha Team`
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Confirmation email sent successfully:', result.messageId);
    return true;
  } catch (error) {
    console.error('❌ Error sending confirmation email:', error);
    return false;
  }
}; 