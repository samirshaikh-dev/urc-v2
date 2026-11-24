#!/usr/bin/env node
require('dotenv').config({ path: '.env' });

const { Pool } = require('pg');

async function checkConnection() {
  const url = process.env.DATABASE_URL;
  
  if (!url) {
    console.error('❌ DATABASE_URL not set in .env.local');
    process.exit(1);
  }

  console.log('🔌 Testing database connection...');
  console.log(`   Host: ${new URL(url).hostname}`);

  const pool = new Pool({ connectionString: url, ssl: { rejectUnauthorized: false } });

  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW() as time, version() as version');
    client.release();
    
    console.log('✅ Connection successful!');
    console.log(`   Server time: ${result.rows[0].time}`);
    console.log(`   PostgreSQL: ${result.rows[0].version.split(' ')[0]} ${result.rows[0].version.split(' ')[1]}`);
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

checkConnection();