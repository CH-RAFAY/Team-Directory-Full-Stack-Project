#!/usr/bin/env python3

import sqlite3
import os
from pathlib import Path

db_dir = Path(__file__).parent
db_path = db_dir / 'team_directory.db'

sample_employees = [
    ('Ahmed', 'Khan', 'Software Engineer'),
    ('Fatima', 'Ali', 'Product Manager'),
    ('Hassan', 'Malik', 'UX Designer'),
    ('Ayesha', 'Raza', 'Data Analyst'),
    ('Usman', 'Sheikh', 'DevOps Engineer'),
    ('Zainab', 'Iqbal', 'Frontend Developer'),
    ('Bilal', 'Hussain', 'Backend Developer'),
    ('Sana', 'Ahmed', 'QA Engineer')
]

try:
    # Connect to database (creates file if it doesn't exist)
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    print(f'Connected to SQLite database: {db_path}')
    
    # Create table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS Employees (
            ID INTEGER PRIMARY KEY AUTOINCREMENT,
            FirstName TEXT NOT NULL,
            LastName TEXT NOT NULL,
            Role TEXT NOT NULL
        )
    ''')
    print('Employees table created/verified.')
    
    # Clear existing data (optional)
    cursor.execute('DELETE FROM Employees')
    print('Table cleared.')
    
    # Insert sample data
    cursor.executemany('''
        INSERT INTO Employees (FirstName, LastName, Role)
        VALUES (?, ?, ?)
    ''', sample_employees)
    
    print(f'Inserted {len(sample_employees)} employee records.')
    
    # Verify data
    cursor.execute('SELECT * FROM Employees ORDER BY LastName, FirstName')
    rows = cursor.fetchall()
    
    print('\nDatabase contents:')
    print('ID | First Name | Last Name  | Role')
    print('-' * 60)
    for row in rows:
        print(f'{row[0]:2} | {row[1]:10} | {row[2]:10} | {row[3]}')
    
    # Commit changes
    conn.commit()
    print('\nDatabase initialized successfully!')
    
except sqlite3.Error as e:
    print(f'Database error: {e}')
except Exception as e:
    print(f'Error: {e}')
finally:
    if conn:
        conn.close()
        print(f'Database connection closed.')
