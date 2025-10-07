#!/usr/bin/env node

const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: './production.env' });

// Read the email template
const emailTemplate = fs.readFileSync('./simple-short-email-template-fixed.html', 'utf8');

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.ionos.de',
  port: process.env.SMTP_PORT || 587,
  auth: {
    user: process.env.SMTP_USER || 'servus@feschunterwegs.com',
    pass: process.env.SMTP_PASS || 'Bq@5B29cDn7!wNDT'
  }
});

// Function to send email
async function sendEmail(to, subject = 'Test: Updated Email Template') {
  try {
    console.log(`📧 Sending email to ${to}...`);
    
    const result = await transporter.sendMail({
      from: process.env.SMTP_USER || 'servus@feschunterwegs.com',
      to: to,
      subject: subject,
      html: emailTemplate,
      text: 'This is a test email with the updated template. Please view in HTML format.'
    });
    
    console.log('✅ Email sent successfully!');
    console.log('Message ID:', result.messageId);
    console.log('Recipient:', to);
    
  } catch (error) {
    console.error('❌ Failed to send email:', error.message);
  }
}

// Get command line arguments
const args = process.argv.slice(2);
const recipient = args[0] || 'as@shareforreal.com';
const subject = args[1] || 'Test: Updated Email Template - Eure persönlichen Reisevorschläge';

// Send the email
sendEmail(recipient, subject);
