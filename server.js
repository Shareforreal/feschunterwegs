const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path');
// Load environment variables if dotenv is available
try {
  require('dotenv').config({ path: process.env.NODE_ENV === 'production' ? './production.env' : './.env' });
} catch (e) {
  // dotenv not installed, continue without it
}

const app = express();
const PORT = process.env.PORT || 5001;

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

// API Routes
app.post('/api/quiz', async (req, res) => {
  const { email, firstName, answers, timeAllocations } = req.body;
  
  if (!email || !answers) {
    return res.status(400).json({ error: 'Email and answers are required' });
  }
  
  try {
    const result = await pool.query(
      'INSERT INTO quiz_submissions (email, first_name, answers, time_allocations) VALUES ($1, $2, $3, $4) RETURNING id',
      [email, firstName || null, JSON.stringify(answers), timeAllocations ? JSON.stringify(timeAllocations) : null]
    );
    
    console.log(`Quiz submission saved for email: ${email}`);
    res.json({ 
      success: true, 
      message: 'Quiz submission saved successfully',
      id: result.rows[0].id 
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
    const result = await pool.query(
      `INSERT INTO reservations (experience, first_name, last_name, email, phone, arrival, departure, guests, wishes, terms_accepted, marketing_accepted) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING id`,
      [experience, firstName, lastName, email, phone || '', arrival, departure, guests, wishes || '', termsAccepted, marketingAccepted || false]
    );
    
    console.log(`Reservation saved for ${firstName} ${lastName} - ${experience}`);
    
    // TODO: Send email notifications here
    // - Notification to servus@feschunterwegs.com
    // - Confirmation email to customer
    
    res.json({ 
      success: true, 
      message: 'Reservation request saved successfully',
      id: result.rows[0].id 
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
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
