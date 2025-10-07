#!/usr/bin/env node

const { Client } = require('pg');

// Load environment variables
require('dotenv').config({ path: './production.env' });

// Production database configuration
const dbConfig = {
  user: process.env.DB_USER || 'feschi',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'feschunterwegs_prod',
  password: process.env.DB_PASSWORD || 'feschunterwegs2024',
  port: process.env.DB_PORT || 5432,
};

async function setupDatabase() {
  const client = new Client(dbConfig);

  try {
    console.log('🔄 Setting up production database...');
    
    // Connect to production database
    console.log('📡 Connecting to production database...');
    await client.connect();
    console.log('✅ Connected to production database');
    
    // Create tables
    console.log('📋 Creating tables...');
    
    // Quiz submissions table
    await client.query(`
      CREATE TABLE IF NOT EXISTS quiz_submissions (
        id SERIAL PRIMARY KEY,
        quiz_id VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) NOT NULL,
        first_name VARCHAR(255),
        answers JSONB NOT NULL,
        time_allocations JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Created quiz_submissions table');
    
    // Reservations table
    await client.query(`
      CREATE TABLE IF NOT EXISTS reservations (
        id SERIAL PRIMARY KEY,
        booking_id VARCHAR(50) UNIQUE NOT NULL,
        experience VARCHAR(255) NOT NULL,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        arrival DATE NOT NULL,
        departure DATE NOT NULL,
        guests INTEGER NOT NULL,
        wishes TEXT,
        terms_accepted BOOLEAN NOT NULL,
        marketing_accepted BOOLEAN NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Created reservations table');
    
    // Exit intent subscriptions table
    await client.query(`
      CREATE TABLE IF NOT EXISTS exit_intent_subscriptions (
        id SERIAL PRIMARY KEY,
        subscription_id VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) NOT NULL,
        source VARCHAR(50) DEFAULT 'exit_intent',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Created exit_intent_subscriptions table');
    
    // Verify tables were created
    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('quiz_submissions', 'reservations', 'exit_intent_subscriptions')
      ORDER BY table_name
    `);
    
    console.log('\n📊 Database tables created:');
    tables.rows.forEach(row => {
      console.log(`  ✅ ${row.table_name}`);
    });
    
    console.log('\n🎉 Database setup completed successfully!');
    console.log('Your application can now track:');
    console.log('  📝 Quiz submissions with email addresses');
    console.log('  🏨 Hotel reservations with contact info');
    console.log('  📧 Email subscriptions from exit intent');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

// Run the setup
setupDatabase();
