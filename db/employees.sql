CREATE TABLE Employees (
    ID INT PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Role VARCHAR(100) NOT NULL
);

INSERT INTO Employees (ID, FirstName, LastName, Role) VALUES
(1, 'Alice', 'Johnson', 'Software Engineer'),
(2, 'Bob', 'Martinez', 'Product Manager'),
(3, 'Carol', 'Singh', 'UX Designer'),
(4, 'David', 'Nguyen', 'QA Engineer'),
(5, 'Emma', 'Garcia', 'DevOps Engineer');

