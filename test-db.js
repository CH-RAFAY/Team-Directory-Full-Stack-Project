const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database', 'team_directory.db');

console.log('Testing database connection...');
console.log(`Database path: ${dbPath}`);

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('❌ Error connecting to database:', err.message);
        process.exit(1);
    }
    console.log('✅ Connected to database');
});

db.all('SELECT COUNT(*) as count FROM Employees', (err, rows) => {
    if (err) {
        console.error('❌ Error querying Employees:', err.message);
    } else {
        console.log(`✅ Employee count: ${rows[0].count}`);
        
        if (rows[0].count === 0) {
            console.log('⚠️  Database is empty! Initializing with sample data...');
            initializeDatabase();
        } else {
            console.log('\n✅ Sample employees:');
            db.all('SELECT * FROM Employees LIMIT 5', (err, employees) => {
                if (err) {
                    console.error(err);
                } else {
                    console.table(employees);
                }
                db.close();
            });
        }
    }
});

function initializeDatabase() {
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

    const stmt = db.prepare('INSERT INTO Employees (FirstName, LastName, Role) VALUES (?, ?, ?)');
    
    sampleEmployees.forEach((employee) => {
        stmt.run(employee.FirstName, employee.LastName, employee.Role, (err) => {
            if (err) console.error('Error inserting:', err.message);
        });
    });

    stmt.finalize(() => {
        console.log(`✅ Inserted ${sampleEmployees.length} employee records`);
        
        db.all('SELECT * FROM Employees', (err, employees) => {
            if (err) {
                console.error(err);
            } else {
                console.log('\n✅ Database initialized! Current records:');
                console.table(employees);
            }
            db.close();
        });
    });
}
