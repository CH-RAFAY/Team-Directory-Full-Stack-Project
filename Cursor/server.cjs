const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8501;

app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, 'database', 'team_directory.db');

function getDB() {
  return new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Error opening database:', err.message);
    }
  });
}

app.get('/api/employees_alternative.cfc', (req, res) => {
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

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API server is running' });
});

app.listen(PORT, () => {
  console.log('\nAPI Server Running');
  console.log(`Server: http://localhost:${PORT}`);
  console.log(`API: http://localhost:${PORT}/api/employees_alternative.cfc?method=getEmployees`);
  console.log('Press Ctrl+C to stop\n');
});

process.on('SIGINT', () => {
  console.log('\nShutting down server...');
  process.exit(0);
});
