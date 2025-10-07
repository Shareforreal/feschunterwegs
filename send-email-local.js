const nodemailer = require('nodemailer');
const fs = require('fs');

console.log('Starting email send from localhost...');

const emailTemplate = fs.readFileSync('./simple-short-email-template-fixed.html', 'utf8');
console.log('Template loaded, size:', emailTemplate.length);

const transporter = nodemailer.createTransport({
  host: 'smtp.ionos.de',
  port: 587,
  auth: {
    user: 'servus@feschunterwegs.com',
    pass: 'Bq@5B29cDn7!wNDT'
  }
});

console.log('Sending email...');

transporter.sendMail({
  from: 'servus@feschunterwegs.com',
  to: 'as@shareforreal.com',
  subject: 'Da isser – dein Traum-Trip 🤭',
  html: emailTemplate
}).then((info) => {
  console.log('✅ Email sent from localhost!');
  console.log('Message ID:', info.messageId);
  process.exit(0);
}).catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});
