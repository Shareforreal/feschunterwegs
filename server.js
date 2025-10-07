const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path');
const fs = require('fs');
const nodemailer = require('nodemailer');

// Helper function to generate ID (max 6 characters)
const generateId = (type) => {
  const prefix = type === 'quiz' ? 'Q' : type === 'booking' ? 'B' : 'E';
  const random = Math.random().toString(36).substr(2, 5).toUpperCase();
  return `${prefix}${random}`;
};
// Load environment variables if dotenv is available
try {
  require('dotenv').config({ path: './production.env' });
} catch (e) {
  // dotenv not installed, continue without it
}

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));

// Initialize PostgreSQL database
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'reiseagentur',
  password: process.env.DB_PASSWORD || '',
  port: process.env.DB_PORT || 5432,
});

// Test database connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Email configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.ionos.de',
  port: process.env.SMTP_PORT || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || 'servus@feschunterwegs.com',
    pass: process.env.SMTP_PASS || ''
  }
});

// Email helper functions
const sendAdminNotification = async (type, data) => {
  try {
    const subject = type === 'quiz' 
      ? `🎯 Neue Quiz-Einreichung - feschunterwegs.com [${data.quizId}]`
      : type === 'reservation'
      ? `📅 Neue Reservierungsanfrage - feschunterwegs.com [${data.bookingId}]`
      : `📧 Neue Exit Intent E-Mail - feschunterwegs.com [${data.subscriptionId}]`;
    
    const html = type === 'quiz' 
      ? `
        <h2>🎯 Neue Quiz-Einreichung</h2>
        <p><strong>Quiz-ID:</strong> ${data.quizId}</p>
        <p><strong>E-Mail:</strong> ${data.email}</p>
        <p><strong>Name:</strong> ${data.firstName || 'Nicht angegeben'}</p>
        <p><strong>Antworten:</strong></p>
        <ul>
          ${Object.entries(data.answers).map(([key, value]) => 
            `<li><strong>${key}:</strong> ${value}</li>`
          ).join('')}
        </ul>
        <p><strong>Zeitstempel:</strong> ${new Date().toLocaleString('de-DE')}</p>
      `
      : type === 'reservation'
      ? `
        <h2>📅 Neue Reservierungsanfrage</h2>
        <p><strong>Buchungs-ID:</strong> ${data.bookingId}</p>
        <p><strong>Erlebnis:</strong> ${data.experience}</p>
        <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>E-Mail:</strong> ${data.email}</p>
        <p><strong>Telefon:</strong> ${data.phone || 'Nicht angegeben'}</p>
        <p><strong>Anreise:</strong> ${data.arrival}</p>
        <p><strong>Abreise:</strong> ${data.departure}</p>
        <p><strong>Gäste:</strong> ${data.guests}</p>
        <p><strong>Wünsche:</strong> ${data.wishes || 'Keine besonderen Wünsche'}</p>
        <p><strong>Marketing:</strong> ${data.marketingAccepted ? 'Ja' : 'Nein'}</p>
        <p><strong>Zeitstempel:</strong> ${new Date().toLocaleString('de-DE')}</p>
      `
      : `
        <h2>📧 Neue Exit Intent E-Mail</h2>
        <p><strong>Subscription-ID:</strong> ${data.subscriptionId}</p>
        <p><strong>E-Mail:</strong> ${data.email}</p>
        <p><strong>Quelle:</strong> Exit Intent Popup</p>
        <p><strong>Zeitstempel:</strong> ${new Date().toLocaleString('de-DE')}</p>
      `;

    await transporter.sendMail({
      from: process.env.SMTP_USER || 'servus@feschunterwegs.com',
      to: 'servus@feschunterwegs.com',
      subject: subject,
      html: html
    });
    
    console.log(`${type === 'quiz' ? 'Quiz' : 'Reservierungs'} Benachrichtigung an Admin gesendet`);
  } catch (error) {
    console.error('Fehler beim Senden der Admin-Benachrichtigung:', error);
  }
};

const sendFollowUpEmail = async (data) => {
  try {
    const subject = '🤔 Dein fescher Last Minute Zugang wartet noch...';
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <p style="font-size: 14px; line-height: 1.5;">Servus ${data.firstName || 'liebe Reiselustige'},</p>
        <p style="font-size: 14px; line-height: 1.5;">wir haben gemerkt, dass du dich noch nicht für unsere feschen Last Minute Deals angemeldet hast. Schade eigentlich – wir haben gerade ein paar richtig gute Spots entdeckt, die perfekt zu dir passen würden.</p>
        <p style="font-size: 14px; line-height: 1.5;">Vielleicht ist dir die E-Mail untergegangen? Oder du hattest einfach keine Zeit? Kein Problem – hier ist nochmal dein persönlicher Zugang:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://feschunterwegs.com/confirm?token=${data.confirmationToken}" style="display: inline-block; background-color: #ff6b6b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;">👉 Jetzt doch anmelden</a>
        </div>
        <p style="font-size: 14px; line-height: 1.5;">Falls du doch kein Interesse hast, ist das auch völlig okay. Dann schicken wir dir einfach keine weiteren E-Mails mehr.</p>
        <p style="font-size: 14px; line-height: 1.5;">Aber wir würden uns freuen, wenn du dabei wärst – die besten Spots verraten wir nur unseren Abonnenten. 😉</p>
        <div style="margin-top: 30px; padding-top: 20px;">
          <p style="margin: 0 0 6px 0; font-size: 13px;">Bis bald,<br>Marie</p>
          <p style="margin: 0 0 3px 0; font-size: 13px;">
            <strong>Feschunterwegs Team</strong> | <a href="https://feschunterwegs.com" style="color: #ff6b6b; text-decoration: none;">feschunterwegs.com</a><br>
            Deine Boutique Reiseagentur
          </p>
          <p style="margin: 6px 0 0 0; font-size: 10px; color: #888; line-height: 1.3;">
            Baaderstraße 25 | 80469 München<br>
            Geschäftsführung: Alessa Schuhmacher | HRB 284198
          </p>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.SMTP_USER || 'servus@feschunterwegs.com',
      to: data.email,
      subject: subject,
      html: html
    });
    
    console.log(`Follow-up email sent to ${data.email} for subscription ${data.subscriptionId}`);
  } catch (error) {
    console.error('Fehler beim Senden der Follow-up E-Mail:', error);
  }
};

const sendCustomerConfirmation = async (type, data) => {
  try {
    // Generate unique email ID for web version
    const emailId = generateId('email');
    
    // Create web version URL
    const webVersionUrl = `https://feschunterwegs.com/email/${emailId}`;
    
    const subject = type === 'quiz'
      ? `Wer ist denn hier so fesch unterwegs? 🥰`
      : type === 'reservation'
      ? `Wer ist denn hier so fesch unterwegs? 🥰 #${data.bookingId}`
      : type === 'trip_proposal'
      ? `Da isser – dein Traum-Trip 🤭`
      : `😍 Ab jetzt fesch unterwegs – exklusive Last Minute Deals ab München`;
    
    let html;
    if (type === 'quiz') {
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <p style="font-size: 14px; line-height: 1.5;">Servus ${data.firstName || 'liebe Reiselustige'},</p>
          <p style="font-size: 14px; line-height: 1.5;">wow, das war fantastisch! Deine Antworten haben uns erreicht, und wir können es kaum erwarten, dir deine perfekt passenden Reiseempfehlungen zu zeigen.</p>
          <p style="font-size: 14px; line-height: 1.5;">Unser Team arbeitet bereits an deinen personalisierten Vorschlägen und meldet sich in den nächsten 24 Stunden bei dir.</p>
          <p style="font-size: 14px; line-height: 1.5;">Wenn dir noch etwas einfällt, das wir unbedingt beachten sollen oder du Fragen hast - antworte einfach auf diese Mail.</p>
        <div style="margin-top: 30px; padding-top: 20px;">
          <p style="margin: 0 0 6px 0; font-size: 13px;">Pfiat di,<br>Marie</p>
          <p style="margin: 0 0 3px 0; font-size: 13px;">
            <strong>Feschunterwegs Team</strong> | <a href="https://feschunterwegs.com" style="color: #ff6b6b; text-decoration: none;">feschunterwegs.com</a><br>
            Deine Boutique Reiseagentur
          </p>
          <p style="margin: 6px 0 0 0; font-size: 10px; color: #888; line-height: 1.3;">
            Baaderstraße 25 | 80469 München<br>
            Geschäftsführung: Alessa Schuhmacher | HRB 284198
          </p>
        </div>
        <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e8e8e8;">
          <p style="font-size: 12px; color: #888; margin: 0 0 10px;">
            <strong>Falls die E-Mail nicht richtig angezeigt wird:</strong>
          </p>
          <p style="font-size: 12px; color: #888; margin: 0;">
            <a href="${webVersionUrl}" style="color: #ff6b6b; text-decoration: none;">📱 E-Mail im Browser anzeigen</a>
          </p>
        </div>
        </div>
      `;
    } else if (type === 'reservation') {
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <p style="font-size: 14px; line-height: 1.5;">Servus ${data.firstName},</p>
          <p style="font-size: 14px; line-height: 1.5;">wow, was für eine tolle Wahl. Deine Reservierungsanfrage für <strong>${data.experience}</strong> ist bei uns eingegangen und wir sind nun fleißig dabei, alles für dich zu organisieren.</p>
          <p style="font-size: 14px; line-height: 1.5;">Deine Anfrage im Überblick:</p>
          <ul style="font-size: 14px; line-height: 1.5;">
            <li><strong>Hotel:</strong> ${data.experience}</li>
            ${data.arrival && data.departure ? 
              `<li><strong>Datum:</strong> ${data.arrival} - ${data.departure}</li>` : 
              `<li><strong>Datum:</strong> Wir suchen die besten Termine für dich</li>`
            }
            <li><strong>Anzahl Personen:</strong> ${data.guests}</li>
          </ul>
          ${data.arrival && data.departure ? 
            `<p style="font-size: 14px; line-height: 1.5;">Wir prüfen gerade die Verfügbarkeiten und die besten Konditionen für dich. Innerhalb der nächsten 24 Stunden melden wir uns mit allen Details und deinem Angebot zurück.</p>` :
            `<p style="font-size: 14px; line-height: 1.5;">Da du noch keine konkreten Reisedaten angegeben hast, suchen wir für dich die besten Termine und Konditionen. Innerhalb der nächsten 24 Stunden melden wir uns mit allen Details und deinem Angebot zurück.</p>`
          }
          <p style="font-size: 14px; line-height: 1.5;">Falls sich noch etwas ändert oder dir spontan etwas einfällt - einfach auf diese Mail antworten!</p>
        <div style="margin-top: 30px; padding-top: 20px;">
          <p style="margin: 0 0 6px 0; font-size: 13px;">Pfiat di,<br>Marie</p>
          <p style="margin: 0 0 3px 0; font-size: 13px;">
            <strong>Feschunterwegs Team</strong> | <a href="https://feschunterwegs.com" style="color: #ff6b6b; text-decoration: none;">feschunterwegs.com</a><br>
            Deine Boutique Reiseagentur
          </p>
          <p style="margin: 6px 0 0 0; font-size: 10px; color: #888; line-height: 1.3;">
            Baaderstraße 25 | 80469 München<br>
            Geschäftsführung: Alessa Schuhmacher | HRB 284198
          </p>
        </div>
        <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e8e8e8;">
          <p style="font-size: 12px; color: #888; margin: 0 0 10px;">
            <strong>Falls die E-Mail nicht richtig angezeigt wird:</strong>
          </p>
          <p style="font-size: 12px; color: #888; margin: 0;">
            <a href="${webVersionUrl}" style="color: #ff6b6b; text-decoration: none;">📱 E-Mail im Browser anzeigen</a>
          </p>
        </div>
        </div>
      `;
    } else if (type === 'trip_proposal') {
      // Read the HTML template file
      try {
        const templatePath = path.join(__dirname, 'simple-short-email-template-fixed.html');
        html = fs.readFileSync(templatePath, 'utf8');
      } catch (error) {
        console.error('Error reading trip proposal template:', error);
        html = data.html || '<p>No email content provided</p>';
      }
      
      // Add web version link to footer
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
      
      html = html.replace('</body>', webVersionFooter + '</body>');
    } else {
      html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <p style="font-size: 14px; line-height: 1.5;">Servus liebe Reiselustige,</p>
          <p style="font-size: 14px; line-height: 1.5;">ab jetzt bist du Teil unserer Community.</p>
          <p style="font-size: 14px; line-height: 1.5;">Das heißt: Zugang zu handverlesenen Last Minute Deals und Trips, die wir persönlich getestet haben – nur für dich.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="https://feschunterwegs.com/confirm?token=${data.confirmationToken || ''}" style="display: inline-block; background-color: #ff6b6b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 14px;">👉 Anmeldung bestätigen</a>
          </div>
          <p style="font-size: 14px; line-height: 1.5;">Ab dann bringen wir dich zu den Momenten, die du dein Leben lang erzählen wirst.</p>
        <div style="margin-top: 30px; padding-top: 20px;">
          <p style="margin: 0 0 6px 0; font-size: 13px;">Pfiat di,<br>Marie</p>
          <p style="margin: 0 0 3px 0; font-size: 13px;">
            <strong>Feschunterwegs Team</strong> | <a href="https://feschunterwegs.com" style="color: #ff6b6b; text-decoration: none;">feschunterwegs.com</a><br>
            Deine Boutique Reiseagentur
          </p>
          <p style="margin: 6px 0 0 0; font-size: 10px; color: #888; line-height: 1.3;">
            Baaderstraße 25 | 80469 München<br>
            Geschäftsführung: Alessa Schuhmacher | HRB 284198
          </p>
        </div>
        <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e8e8e8;">
          <p style="font-size: 12px; color: #888; margin: 0 0 10px;">
            <strong>Falls die E-Mail nicht richtig angezeigt wird:</strong>
          </p>
          <p style="font-size: 12px; color: #888; margin: 0;">
            <a href="${webVersionUrl}" style="color: #ff6b6b; text-decoration: none;">📱 E-Mail im Browser anzeigen</a>
          </p>
        </div>
        </div>
      `;
    }

    // Store email ID in database for tracking
    try {
      await pool.query(
        'INSERT INTO email_tracking (email_id, template_type, recipient_email, sent_at) VALUES ($1, $2, $3, $4)',
        [emailId, type, data.email, new Date()]
      );
    } catch (dbError) {
      console.log('Email tracking not available:', dbError.message);
    }

    await transporter.sendMail({
      from: process.env.SMTP_USER || 'servus@feschunterwegs.com',
      to: data.email,
      subject: subject,
      html: html
    });
    
    console.log(`${type === 'quiz' ? 'Quiz' : type === 'reservation' ? 'Reservierungs' : 'Exit Intent'} Bestätigung an Kunde gesendet`);
  } catch (error) {
    console.error('Fehler beim Senden der Kundenbestätigung:', error);
  }
};

// API Routes
app.post('/api/quiz', async (req, res) => {
  const { email, firstName, answers, timeAllocations } = req.body;
  
  // EMERGENCY LOGGING - LOG EVERYTHING IMMEDIATELY
  console.log('🚨 QUIZ SUBMISSION RECEIVED 🚨');
  console.log('Email:', email);
  console.log('First Name:', firstName);
  console.log('Answers:', JSON.stringify(answers));
  console.log('Time Allocations:', JSON.stringify(timeAllocations));
  console.log('Full Request Body:', JSON.stringify(req.body));
  console.log('Timestamp:', new Date().toISOString());
  console.log('🚨 END QUIZ DATA 🚨');
  
  if (!email || !answers) {
    return res.status(400).json({ error: 'Email and answers are required' });
  }
  
  try {
    const quizId = generateId('quiz');
    
    const result = await pool.query(
      'INSERT INTO quiz_submissions (quiz_id, email, first_name, answers, time_allocations) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [quizId, email, firstName || null, JSON.stringify(answers), timeAllocations ? JSON.stringify(timeAllocations) : null]
    );
    
    console.log(`Quiz submission saved for email: ${email} with quiz ID: ${quizId}`);
    
    // Send emails
    await sendAdminNotification('quiz', { quizId, email, firstName, answers, timeAllocations });
    await sendCustomerConfirmation('quiz', { quizId, email, firstName, answers, timeAllocations });
    
    res.json({ 
      success: true, 
      message: 'Quiz submission saved successfully',
      id: result.rows[0].id,
      quizId
    });
  } catch (err) {
    console.error('Error inserting quiz submission:', err);
    res.status(500).json({ error: 'Failed to save quiz submission' });
  }
});

// Get quiz statistics (for admin purposes)
app.get('/api/stats', async (req, res) => {
  try {
    const result = await pool.query('SELECT COUNT(*) as total_submissions FROM quiz_submissions');
    res.json({ total_submissions: parseInt(result.rows[0].total_submissions) });
  } catch (err) {
    console.error('Error getting stats:', err);
    res.status(500).json({ error: 'Failed to get statistics' });
  }
});

// Reservation API endpoint
app.post('/api/reservation', async (req, res) => {
  const { 
    experience, 
    firstName, 
    lastName, 
    email, 
    phone, 
    arrival, 
    departure, 
    guests, 
    wishes, 
    termsAccepted, 
    marketingAccepted 
  } = req.body;
  
  if (!experience || !firstName || !lastName || !email || termsAccepted === undefined) {
    return res.status(400).json({ error: 'All required fields must be provided' });
  }
  
  try {
    const bookingId = generateId('reservation');
    
    const result = await pool.query(
      `INSERT INTO reservations (booking_id, experience, first_name, last_name, email, phone, arrival, departure, guests, wishes, terms_accepted, marketing_accepted) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id`,
      [bookingId, experience, firstName, lastName, email, phone || '', arrival, departure, guests, wishes || '', termsAccepted, marketingAccepted || false]
    );
    
    console.log(`Reservation saved for ${firstName} ${lastName} - ${experience} with booking ID: ${bookingId}`);
    
    // Send emails
    await sendAdminNotification('reservation', { 
      bookingId, experience, firstName, lastName, email, phone, arrival, departure, guests, wishes, marketingAccepted 
    });
    await sendCustomerConfirmation('reservation', { 
      bookingId, experience, firstName, lastName, email, phone, arrival, departure, guests, wishes, marketingAccepted 
    });
    
    res.json({ 
      success: true, 
      message: 'Reservation request saved successfully',
      id: result.rows[0].id,
      bookingId
    });
  } catch (err) {
    console.error('Error inserting reservation:', err);
    res.status(500).json({ error: 'Failed to save reservation' });
  }
});

// Exit Intent E-Mail Subscription
app.post('/api/exit-intent', async (req, res) => {
  const { email, firstName } = req.body;
  
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }
  
  try {
    const subscriptionId = generateId('exit_intent');
    
    // First try to add the column if it doesn't exist
    try {
      await pool.query('ALTER TABLE exit_intent_subscriptions ADD COLUMN first_name VARCHAR(100)');
      console.log('Added first_name column to exit_intent_subscriptions table');
    } catch (alterError) {
      // Column might already exist, ignore error
      console.log('first_name column might already exist or other error:', alterError.message);
    }
    
    // Generate confirmation token
    const confirmationToken = generateId('confirm');
    
    const result = await pool.query(
      'INSERT INTO exit_intent_subscriptions (subscription_id, email, first_name, confirmation_token, confirmed) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [subscriptionId, email, firstName || null, confirmationToken, false]
    );
    
    console.log(`Exit intent subscription saved for email: ${email}, name: ${firstName || 'N/A'} with subscription ID: ${subscriptionId}`);
    
    // Send confirmation email
    await sendCustomerConfirmation('exit_intent', { subscriptionId, email, firstName, confirmationToken });
    
    res.json({ 
      success: true, 
      message: 'Exit intent subscription saved successfully',
      id: result.rows[0].id,
      subscriptionId
    });
  } catch (err) {
    console.error('Error inserting exit intent subscription:', err);
    res.status(500).json({ error: 'Failed to save exit intent subscription' });
  }
});

// Confirmation endpoint
app.get('/confirm', async (req, res) => {
  const { token } = req.query;
  
  if (!token) {
    return res.status(400).send('Invalid confirmation link');
  }
  
  try {
    // Update confirmation status
    const result = await pool.query(
      'UPDATE exit_intent_subscriptions SET confirmed = true, confirmed_at = CURRENT_TIMESTAMP WHERE confirmation_token = $1 RETURNING email, first_name',
      [token]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).send('Confirmation link not found or already used');
    }
    
    const { email, first_name } = result.rows[0];
    console.log(`Subscription confirmed for ${email} (${first_name || 'N/A'})`);
    
    // Redirect to success page or show confirmation message
    res.redirect('https://feschunterwegs.com?confirmed=true');
  } catch (err) {
    console.error('Error confirming subscription:', err);
    res.status(500).send('Error confirming subscription');
  }
});

// Check for unconfirmed subscriptions and send follow-ups
const checkUnconfirmedSubscriptions = async () => {
  try {
    // Find subscriptions older than 3 days that haven't been confirmed
    const result = await pool.query(`
      SELECT subscription_id, email, first_name, confirmation_token, created_at 
      FROM exit_intent_subscriptions 
      WHERE confirmed = false 
      AND created_at < NOW() - INTERVAL '3 days'
      AND follow_up_sent = false
    `);
    
    for (const subscription of result.rows) {
      await sendFollowUpEmail({
        subscriptionId: subscription.subscription_id,
        email: subscription.email,
        firstName: subscription.first_name,
        confirmationToken: subscription.confirmation_token
      });
      
      // Mark follow-up as sent
      await pool.query(
        'UPDATE exit_intent_subscriptions SET follow_up_sent = true WHERE subscription_id = $1',
        [subscription.subscription_id]
      );
    }
    
    if (result.rows.length > 0) {
      console.log(`Sent ${result.rows.length} follow-up emails for unconfirmed subscriptions`);
    }
  } catch (error) {
    console.error('Error checking unconfirmed subscriptions:', error);
  }
};

// Run follow-up check once daily at 6 PM
const scheduleFollowUpCheck = () => {
  const now = new Date();
  const sixPM = new Date();
  sixPM.setHours(18, 0, 0, 0); // 6 PM
  
  // If it's already past 6 PM today, schedule for tomorrow
  if (now > sixPM) {
    sixPM.setDate(sixPM.getDate() + 1);
  }
  
  const timeUntilSixPM = sixPM.getTime() - now.getTime();
  
  setTimeout(() => {
    checkUnconfirmedSubscriptions();
    // Schedule the next check for 24 hours later
    setInterval(checkUnconfirmedSubscriptions, 24 * 60 * 60 * 1000);
  }, timeUntilSixPM);
  
  console.log(`Follow-up check scheduled for ${sixPM.toLocaleString()}`);
};

// Start the daily follow-up check
scheduleFollowUpCheck();

// API endpoint to send trip proposal email manually
app.post('/api/send-trip-proposal', async (req, res) => {
  try {
    const { email, html } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    
    if (!html) {
      return res.status(400).json({ error: 'HTML content is required' });
    }
    
    // Send trip proposal email with custom HTML
    await sendCustomerConfirmation('trip_proposal', { 
      email, 
      html: html
    });
    
    res.json({ 
      success: true, 
      message: 'Trip proposal email sent successfully' 
    });
  } catch (error) {
    console.error('Error sending trip proposal email:', error);
    res.status(500).json({ error: 'Failed to send trip proposal email' });
  }
});

// Email template serving route
app.get('/email/:templateId', async (req, res) => {
  try {
    const templateId = req.params.templateId;
    
    // Map template IDs to actual files
    const templateMap = {
      'trip-proposal': 'simple-short-email-template-fixed.html',
      'villa-winternitz': 'villa-winternitz.html',
      'hotel-kleiner-loewe': 'hotel-kleiner-loewe.html'
    };
    
    const templateFile = templateMap[templateId];
    if (!templateFile) {
      return res.status(404).send('Email template not found');
    }
    
    // Read the HTML template
    const templatePath = path.join(__dirname, templateFile);
    const htmlContent = fs.readFileSync(templatePath, 'utf8');
    
    // Track view (optional)
    try {
      await pool.query(
        'UPDATE email_tracking SET viewed_at = CURRENT_TIMESTAMP, view_count = view_count + 1 WHERE email_id = $1',
        [templateId]
      );
    } catch (dbError) {
      // If tracking fails, continue serving the email
      console.log('Email tracking not available:', dbError.message);
    }
    
    // Send as HTML response
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(htmlContent);
    
  } catch (error) {
    console.error('Error serving email template:', error);
    res.status(500).send('Error loading email template');
  }
});

// Admin email sender page
app.get('/admin/email-sender', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin-email-sender.html'));
});

// Redirect non-existent SEO pages to homepage
app.get('/wochenendtrips-muenchen', (req, res) => {
  res.redirect(301, 'https://www.feschunterwegs.com/');
});

app.get('/reisebuero-muenchen', (req, res) => {
  res.redirect(301, 'https://www.feschunterwegs.com/');
});

app.get('/kurztrips-bayern', (req, res) => {
  res.redirect(301, 'https://www.feschunterwegs.com/');
});

app.get('/muenchen-suedtirol', (req, res) => {
  res.redirect(301, 'https://www.feschunterwegs.com/');
});

app.get('/muenchen-gardasee', (req, res) => {
  res.redirect(301, 'https://www.feschunterwegs.com/');
});

app.get('/muenchen-salzburg', (req, res) => {
  res.redirect(301, 'https://www.feschunterwegs.com/');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});

// Enhanced port conflict detection and handling
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use!`);
    console.log('🔍 Checking for existing processes...');
    
    // Try to find and kill existing processes on this port
    const { exec } = require('child_process');
    exec(`lsof -ti:${PORT}`, (error, stdout, stderr) => {
      if (stdout.trim()) {
        console.log(`🛑 Found existing process(es) on port ${PORT}: ${stdout.trim()}`);
        console.log('💡 Try running: pm2 stop feschunterwegs && pm2 delete feschunterwegs');
        console.log('💡 Or kill the process manually: kill -9 ' + stdout.trim());
      }
    });
    
    console.log('🔄 Attempting graceful restart in 3 seconds...');
    server.close(() => {
      setTimeout(() => {
        console.log('🚀 Restarting server...');
        const newServer = app.listen(PORT, '0.0.0.0', () => {
          console.log(`✅ Server successfully restarted on port ${PORT}`);
        });
        newServer.on('error', (err) => {
          if (err.code === 'EADDRINUSE') {
            console.error(`❌ Port ${PORT} still in use after restart attempt`);
            console.log('🔄 Trying fallback port 5003...');
            const fallbackServer = app.listen(5003, '0.0.0.0', () => {
              console.log(`✅ Server running on fallback port 5003`);
            });
            fallbackServer.on('error', (fallbackErr) => {
              console.error('❌ All port attempts failed:', fallbackErr.message);
              process.exit(1);
            });
          }
        });
      }, 3000);
    });
  } else {
    console.error('❌ Server error:', err.message);
    process.exit(1);
  }
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down server...');
  try {
    await pool.end();
    console.log('Database connection closed');
  } catch (err) {
    console.error('Error closing database:', err.message);
  }
  process.exit(0);
});
