const nodemailer = require('nodemailer');
const fs = require('fs');
require('dotenv').config({ path: './production.env' });

// Read the HTML template
const emailTemplate = fs.readFileSync('./simple-short-email-template-fixed.html', 'utf8');

// Create transporter (same as server)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.ionos.de',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'servus@feschunterwegs.com',
    pass: process.env.SMTP_PASS || 'Bq@5B29cDn7!wNDT'
  }
});

// Simulate the server's sendCustomerConfirmation function for trip_proposal
const sendTripProposal = async () => {
  try {
    const subject = 'Da isser – dein Traum-Trip 🤭';
    
    // Add web version link to footer (like the server does)
    const webVersionFooter = `
      <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e8e8e8;">
        <p style="font-size: 12px; color: #888; margin: 0 0 10px;">
          <strong>Falls die E-Mail nicht richtig angezeigt wird:</strong>
        </p>
        <p style="font-size: 12px; color: #888; margin: 0;">
          <a href="https://feschunterwegs.com/email/trip-proposal" style="color: #ff6b6b; text-decoration: none;">📱 E-Mail im Browser anzeigen</a>
        </p>
      </div>
    `;
    
    // Combine the template with the footer
    const html = emailTemplate + webVersionFooter;

    await transporter.sendMail({
      from: process.env.SMTP_USER || 'servus@feschunterwegs.com',
      to: 'as@shareforreal.com',
      subject: subject,
      html: html
    });
    
    console.log('✅ Trip proposal email sent successfully!');
  } catch (error) {
    console.error('❌ Error sending trip proposal email:', error.message);
  }
};

sendTripProposal();
