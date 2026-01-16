import sqlite3
import os
from pathlib import Path

db_path = Path(__file__).parent / 'database' / 'team_directory.db'

print(f"Database path: {db_path}")
print(f"Database exists: {db_path.exists()}")

if not db_path.exists():
    print("❌ Database file not found!")
    exit(1)

conn = sqlite3.connect(str(db_path))
cursor = conn.cursor()

try:
    cursor.execute("SELECT COUNT(*) FROM Employees")
    count = cursor.fetchone()[0]
    print(f"✅ Current employee count: {count}")
    
    if count == 0:
        print("\n⚠️  Database is empty. Inserting sample data...")
        
        employees = [
            ('Ahmed', 'Khan', 'Software Engineer'),
            ('Fatima', 'Ali', 'Product Manager'),
            ('Hassan', 'Malik', 'UX Designer'),
            ('Ayesha', 'Raza', 'Data Analyst'),
            ('Usman', 'Sheikh', 'DevOps Engineer'),
            ('Zainab', 'Iqbal', 'Frontend Developer'),
            ('Bilal', 'Hussain', 'Backend Developer'),
            ('Sana', 'Ahmed', 'QA Engineer')
        ]
        
        cursor.executemany(
            'INSERT INTO Employees (FirstName, LastName, Role) VALUES (?, ?, ?)',
            employees
        )
        conn.commit()
        print(f"✅ Inserted {len(employees)} employee records")
    
    print("\n📋 Database contents:")
    cursor.execute("SELECT ID, FirstName, LastName, Role FROM Employees ORDER BY LastName")
    rows = cursor.fetchall()
    for row in rows:
        print(f"  {row[0]}: {row[1]} {row[2]} - {row[3]}")
        
except Exception as e:
    print(f"❌ Error: {e}")
finally:
    conn.close()
