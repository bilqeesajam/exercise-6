CREATE DATABASE pick_n_steal;
USE pick_n_steal;
SET SQL_SAFE_UPDATES = 0;

CREATE TABLE employees (
	employee_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(45) NOT NULL,
    last_name VARCHAR(45) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    department VARCHAR(50) NOT NULL,
    salary DECIMAL(10,2) NOT NULL
);

INSERT INTO employees (first_name, last_name, email, phone_number, department, salary)
VALUES ('John', 'Doe', 'john.doe@example.com', '555-1234', 'Engineering', 85000.00),
	   ('Jane', 'Smith', 'jane.smith@example.com', '555-5678', 'Marketing', 92000.00),
	   ('Michael', 'Johnson', 'michael.johnson@example.com', '555-8765', 'Marketing', 75000.00),
	   ('Emily', 'Davis', 'emily.davis@example.com', '555-4321', 'Engineering', 78000.00);

CREATE TABLE departments (
    department_id INT PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(50) NOT NULL,
    location VARCHAR(100) NULL
);

ALTER TABLE employees
ADD department_id INT NULL;

ALTER TABLE employees
DROP department;

INSERT INTO departments (department_name, location)
VALUES ('Engineering', 'South Africa'),
       ('Marketing', 'Europe');

UPDATE employees
SET department_id = 1
WHERE first_name = 'John' AND last_name = 'Doe';

UPDATE employees
SET department_id = 2
WHERE first_name = 'Jane' AND last_name = 'Smith';

UPDATE employees
SET department_id = 2
WHERE first_name = 'Michael' AND last_name = 'Johnson';

UPDATE employees
SET department_id = 1
WHERE first_name = 'Emily' AND last_name = 'Davis';

SET SQL_SAFE_UPDATES = 1;
