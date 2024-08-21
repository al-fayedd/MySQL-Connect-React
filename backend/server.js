const express = require('express');
const app = express();
const mysql = require('mysql2/promise'); // Use promise-based mysql2
const cors = require('cors');

// Middleware setup
app.use(cors());
app.use(express.json());

// Create a MySQL connection pool
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Alfayedd27@',
  database: 'crud',
};

let pool;
(async function initializeDb() {
  try {
    pool = await mysql.createPool(dbConfig);
    console.log('Database connected.');
  } catch (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
})();

// Route to get all students
app.get('/', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM student2');
    res.json(results);
  } catch (err) {
    console.error('Error fetching students:', err);
    res.status(500).json({ error: 'Failed to retrieve students' });
  }
});

// Route to create a new student
app.post('/create', async (req, res) => {
  const { name, email, mark, city, grade } = req.body;
  if (!name || !email || !mark || !city || !grade) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO student2 (name, email, mark, city, grade) VALUES (?, ?, ?, ?, ?)',
      [name, email, mark, city, grade]
    );
    res.status(201).json({ message: 'Student added successfully', data: result });
  } catch (err) {
    console.error('Error creating student:', err);
    res.status(500).json({ error: 'Failed to add student' });
  }
});

// Route to update an existing student
app.put('/update/:id', async (req, res) => {
  const { name, email, mark, city, grade } = req.body;
  const studentId = req.params.id;
  
  if (!name || !email || !mark || !city || !grade) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const [result] = await pool.query(
      'UPDATE student2 SET name = ?, email = ?, mark = ?, city = ?, grade = ? WHERE id = ?',
      [name, email, mark, city, grade, studentId]
    );
    res.json({ message: 'Student updated successfully', data: result });
  } catch (err) {
    console.error('Error updating student:', err);
    res.status(500).json({ error: 'Failed to update student' });
  }
});

// Route to delete a student
app.delete('/student/:id', async (req, res) => {
  const studentId = req.params.id;
  
  try {
    const [result] = await pool.query('DELETE FROM student2 WHERE id = ?', [studentId]);
    res.json({ message: 'Student deleted successfully', data: result });
  } catch (err) {
    console.error('Error deleting student:', err);
    res.status(500).json({ error: 'Failed to delete student' });
  }
});

// Start the server
app.listen(3001, () => {
  console.log('Server started on port 3001');
});

