import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'team_directory.db');

const sampleEmployees = [
    { FirstName: 'Ahmed', LastName: 'Khan', Role: 'Software Engineer' },
    { FirstName: 'Fatima', LastName: 'Ali', Role: 'Product Manager' },
    { FirstName: 'Hassan', LastName: 'Malik', Role: 'UX Designer' },
    { FirstName: 'Ayesha', LastName: 'Raza', Role: 'Data Analyst' },
    { FirstName: 'Usman', LastName: 'Sheikh', Role: 'DevOps Engineer' },
    { FirstName: 'Zainab', LastName: 'Iqbal', Role: 'Frontend Developer' },
    { FirstName: 'Bilal', LastName: 'Hussain', Role: 'Backend Developer' },
    { FirstName: 'Sana', LastName: 'Ahmed', Role: 'QA Engineer' }
];

// Create or open database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
        process.exit(1);
    }
    console.log('Connected to SQLite database.');
});

// Create table
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS Employees (
            ID INTEGER PRIMARY KEY AUTOINCREMENT,
            FirstName TEXT NOT NULL,
            LastName TEXT NOT NULL,
            Role TEXT NOT NULL
        )
    `, (err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        } else {
            console.log('Employees table created/verified.');
        }
    });

    // Clear existing data (optional)
    db.run('DELETE FROM Employees', (err) => {
        if (err) {
            console.error('Error clearing table:', err.message);
        } else {
            console.log('Table cleared.');
        }
    });

    // Insert sample data
    const stmt = db.prepare('INSERT INTO Employees (FirstName, LastName, Role) VALUES (?, ?, ?)');
    
    sampleEmployees.forEach((employee) => {
        stmt.run(employee.FirstName, employee.LastName, employee.Role, (err) => {
            if (err) {
                console.error('Error inserting employee:', err.message);
            }
        });
    });

    stmt.finalize((err) => {
        if (err) {
            console.error('Error finalizing statement:', err.message);
        } else {
            console.log(`Inserted ${sampleEmployees.length} employee records.`);
        }

        // Verify data
        db.all('SELECT * FROM Employees', (err, rows) => {
            if (err) {
                console.error('Error querying data:', err.message);
            } else {
                console.log('\nDatabase contents:');
                console.table(rows);
            }

            // Close database
            db.close((err) => {
                if (err) {
                    console.error('Error closing database:', err.message);
                } else {
                    console.log('\nDatabase initialized successfully!');
                    console.log(`Database file: ${dbPath}`);
                }
            });
        });
    });
});
