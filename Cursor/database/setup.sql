-- Team Directory Database Setup Script
-- This script creates the Employees table and populates it with sample data

-- Create Employees table
CREATE TABLE IF NOT EXISTS Employees (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    FirstName TEXT NOT NULL,
    LastName TEXT NOT NULL,
    Role TEXT NOT NULL
);

-- Clear existing data (optional - uncomment if you want to reset)
-- DELETE FROM Employees;

-- Insert sample employee data
INSERT INTO Employees (FirstName, LastName, Role) VALUES
    ('Ahmed', 'Khan', 'Software Engineer'),
    ('Fatima', 'Ali', 'Product Manager'),
    ('Hassan', 'Malik', 'UX Designer'),
    ('Ayesha', 'Raza', 'Data Analyst'),
    ('Usman', 'Sheikh', 'DevOps Engineer'),
    ('Zainab', 'Iqbal', 'Frontend Developer'),
    ('Bilal', 'Hussain', 'Backend Developer'),
    ('Sana', 'Ahmed', 'QA Engineer');

-- Verify the data
SELECT * FROM Employees;
