const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

const db = require('./db');

// Get all employees
app.get('/employees', (req, res) => {
    db.query('SELECT * FROM employees', (err, results) => {
        if (err) {
            console.error("DB Error:", err);
            return res.status(500).send('Error fetching employees');
        }
        res.json(results);
    });
});

// Get single employee by employee_id
app.get('/employees/:id', (req, res) => {
    const employeeId = req.params.id;
    db.query('SELECT * FROM employees WHERE employee_id = ?', [employeeId], (err, results) => {
        if (err) {
            console.error("Error fetching employee:", err);
            return res.status(500).send('Error fetching employee');
        }
        if (results.length === 0) {
            return res.status(404).send('Employee not found');
        }
        res.json(results[0]);
    });
});

// Create new employee
app.post('/employees', (req, res) => {
    const { first_name, last_name, email, phone_number, salary, department_id } = req.body;
    if (!first_name || !last_name || !email || !phone_number || !salary || !department_id) {
        return res.status(400).send('Missing required fields');
    }

    const sql = `
        INSERT INTO employees (first_name, last_name, email, phone_number, salary, department_id)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [first_name, last_name, email, phone_number, salary, department_id], (err, result) => {
        if (err) {
            console.error('Error inserting employee:', err);
            return res.status(500).send('Error inserting employee');
        }
        res.status(201).send(`Employee added with ID: ${result.insertId}`);
    });
});

app.delete('/employees/:id', (req, res) => {
    const employeeId = req.params.id;
    const sql = 'DELETE FROM employees WHERE employee_id = ?';
    db.query(sql, [employeeId], (err, result) => {
        if (err) {
            console.error('Error deleting employee:', err);
            return res.status(500).send('Error deleting employee');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Employee not found');
        }
        res.send(`Employee with ID ${employeeId} deleted`);
    });
});

app.delete('/employees', (req, res) => {
    const sql = 'DELETE FROM employees';
    db.query(sql, (err, result) => {
        if (err) return res.status(500).send('Error deleting employees');
        res.send(`All employees deleted (${result.affectedRows} rows)`);
    });
});

app.get('/employees/south-africa', (req, res) => {
    const sql = `
        SELECT e.*, d.department_name, d.location
        FROM employees e
        JOIN departments d ON e.department_id = d.department_id
        WHERE d.location = 'South Africa'
    `;
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send('Error fetching employees in South Africa');
        res.json(results);
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
    console.log(`View all employees at http://localhost:${port}/employees`);
});
