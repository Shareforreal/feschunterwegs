const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path');
const nodemailer = require('nodemailer');

// Helper function to generate ID (max 6 characters)
const generateId = (type) => {
  const prefix = type === 'quiz' ? 'Q' : 'B';
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
const PORT = process.env.PORT || 5002;

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
      : `📅 Neue Reservierungsanfrage - feschunterwegs.com [${data.bookingId}]`;
    
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
      : `
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

const sendCustomerConfirmation = async (type, data) => {
  try {
    const subject = type === 'quiz'
      ? `Wer ist denn hier so fesch unterwegs? 🥰 #${data.quizId}`
      : `Wer ist denn hier so fesch unterwegs? 🥰 #${data.bookingId}`;
    
    const html = type === 'quiz'
      ? `
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
        </div>
      `
      : `
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
        </div>
      `;

    await transporter.sendMail({
      from: process.env.SMTP_USER || 'servus@feschunterwegs.com',
      to: data.email,
      subject: subject,
      html: html
    });
    
    console.log(`${type === 'quiz' ? 'Quiz' : 'Reservierungs'} Bestätigung an Kunde gesendet`);
  } catch (error) {
    console.error('Fehler beim Senden der Kundenbestätigung:', error);
  }
};

// API Routes
app.post('/api/quiz', async (req, res) => {
  const { email, firstName, answers, timeAllocations } = req.body;
  
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

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Enable SO_REUSEADDR to handle zombie sockets
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log('Port is in use, retrying in 1 second...');
    setTimeout(() => {
      server.close();
      server.listen(PORT);
    }, 1000);
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
