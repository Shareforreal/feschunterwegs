#!/usr/bin/env node

/**
 * Database Migration Script
 * Migrates data from localhost to production server
 * 
 * Usage:
 * node migrate-database.js
 */

const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: './production.env' });

// Source database (localhost)
const sourceConfig = {
  user: 'postgres',
  host: 'localhost',
  database: 'reiseagentur',
  password: '', // Update with your local password
  port: 5432,
};

// Target database (production)
const targetConfig = {
  user: process.env.DB_USER || 'feschunterwegs_user',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'feschunterwegs_prod',
  password: process.env.DB_PASSWORD || 'your_secure_password_here',
  port: process.env.DB_PORT || 5432,
};

async function migrateDatabase() {
  const sourceClient = new Client(sourceConfig);
  const targetClient = new Client(targetConfig);

  try {
    console.log('🔄 Starting database migration...');
    
    // Connect to both databases
    console.log('📡 Connecting to source database (localhost)...');
    await sourceClient.connect();
    console.log('✅ Connected to source database');
    
    console.log('📡 Connecting to target database (production)...');
    await targetClient.connect();
    console.log('✅ Connected to target database');
    
    // Create tables in target database if they don't exist
    console.log('🏗️  Creating tables in target database...');
    
    await targetClient.query(`
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
    
    await targetClient.query(`
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
    
    console.log('✅ Tables created/verified');
    
    // Check if source tables exist
    const sourceTables = await sourceClient.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('quiz_submissions', 'reservations')
    `);
    
    if (sourceTables.rows.length === 0) {
      console.log('⚠️  No source tables found. Skipping data migration.');
      return;
    }
    
    // Migrate quiz_submissions
    if (sourceTables.rows.some(row => row.table_name === 'quiz_submissions')) {
      console.log('📊 Migrating quiz_submissions...');
      const quizData = await sourceClient.query('SELECT * FROM quiz_submissions');
      
      for (const row of quizData.rows) {
        const quizId = `Q${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
        await targetClient.query(
          'INSERT INTO quiz_submissions (quiz_id, email, first_name, answers, time_allocations, created_at) VALUES ($1, $2, $3, $4, $5, $6)',
          [quizId, row.email, row.first_name, row.answers, row.time_allocations, row.created_at]
        );
      }
      console.log(`✅ Migrated ${quizData.rows.length} quiz submissions`);
    }
    
    // Migrate reservations
    if (sourceTables.rows.some(row => row.table_name === 'reservations')) {
      console.log('📊 Migrating reservations...');
      const reservationData = await sourceClient.query('SELECT * FROM reservations');
      
      for (const row of reservationData.rows) {
        const bookingId = `B${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
        await targetClient.query(
          `INSERT INTO reservations (booking_id, experience, first_name, last_name, email, phone, arrival, departure, guests, wishes, terms_accepted, marketing_accepted, created_at) 
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
          [bookingId, row.experience, row.first_name, row.last_name, row.email, row.phone, row.arrival, row.departure, row.guests, row.wishes, row.terms_accepted, row.marketing_accepted, row.created_at]
        );
      }
      console.log(`✅ Migrated ${reservationData.rows.length} reservations`);
    }
    
    // Verify migration
    console.log('🔍 Verifying migration...');
    const quizCount = await targetClient.query('SELECT COUNT(*) FROM quiz_submissions');
    const reservationCount = await targetClient.query('SELECT COUNT(*) FROM reservations');
    
    console.log(`📈 Final counts:`);
    console.log(`   Quiz submissions: ${quizCount.rows[0].count}`);
    console.log(`   Reservations: ${reservationCount.rows[0].count}`);
    
    console.log('🎉 Database migration completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await sourceClient.end();
    await targetClient.end();
    console.log('🔌 Database connections closed');
  }
}

// Run migration if this script is executed directly
if (require.main === module) {
  migrateDatabase().catch(console.error);
}

module.exports = { migrateDatabase };
