/**
 * Node.js API Server
 * Mimics the ColdFusion API endpoint for testing
 * Reads from SQLite database and serves JSON
 */

import express from 'express';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 8500;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Database path
const dbPath = join(__dirname, 'database', 'team_directory.db');

// Helper function to get database connection
function getDB() {
  return new sqlite3.verbose().Database(dbPath, (err) => {
    if (err) {
      console.error('Error opening database:', err.message);
    }
  });
}

// API endpoint that mimics ColdFusion endpoint
app.get('/api/employees_alternative.cfc', (req, res) => {
  // Check if method parameter matches
  if (req.query.method !== 'getEmployees') {
    return res.status(400).json({ error: 'Invalid method parameter' });
  }

  const db = getDB();
  
  // Query employees from database
  db.all(
    'SELECT ID, FirstName, LastName, Role FROM Employees ORDER BY LastName, FirstName',
    [],
    (err, rows) => {
      db.close();
      
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({
          error: true,
          message: 'Failed to retrieve employees',
          details: err.message
        });
      }

      // Return JSON array matching ColdFusion format
      res.json(rows);
    }
  );
});

// Alternative endpoint (RESTful style)
app.get('/api/employees.cfc', (req, res) => {
  if (req.query.method !== 'getEmployees') {
    return res.status(400).json({ error: 'Invalid method parameter' });
  }

  const db = getDB();
  
  db.all(
    'SELECT ID, FirstName, LastName, Role FROM Employees ORDER BY LastName, FirstName',
    [],
    (err, rows) => {
      db.close();
      
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({
          error: true,
          message: 'Failed to retrieve employees',
          details: err.message
        });
      }

      res.json(rows);
    }
  );
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log('═══════════════════════════════════════════════════════');
  console.log('  Node.js API Server Running');
  console.log('═══════════════════════════════════════════════════════');
  console.log(`  Server: http://localhost:${PORT}`);
  console.log(`  API Endpoint: http://localhost:${PORT}/api/employees_alternative.cfc?method=getEmployees`);
  console.log(`  Health Check: http://localhost:${PORT}/api/health`);
  console.log('═══════════════════════════════════════════════════════');
  console.log('\n✅ Backend API is ready!');
  console.log('✅ React app can now fetch data from this server');
  console.log('\nPress Ctrl+C to stop the server\n');
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\nShutting down server...');
  process.exit(0);
});
