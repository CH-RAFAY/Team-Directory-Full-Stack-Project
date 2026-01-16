-- This script creates the Employees table and populates it with sample data

CREATE TABLE IF NOT EXISTS Employees (
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    FirstName TEXT NOT NULL,
    LastName TEXT NOT NULL,
    Role TEXT NOT NULL
);


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

SELECT * FROM Employees;
