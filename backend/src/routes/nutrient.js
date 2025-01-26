const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_mysql_password',
  database: 'nutrientdb'
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

// Get all nutrients for a user
router.get('/:userId', (req, res) => {
  const userId = req.params.userId;
  db.query('SELECT * FROM nutrients WHERE userId = ?', [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json(results);
  });
});

// Create a new nutrient entry
router.post('/', (req, res) => {
  const { userId, protein, calories, carbs } = req.body;
  db.query('INSERT INTO nutrients (userId, protein, calories, carbs) VALUES (?, ?, ?, ?)', [userId, protein, calories, carbs], (err, results) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    res.status(201).json({ id: results.insertId, userId, protein, calories, carbs });
  });
});

// Update a nutrient entry
router.put('/:id', (req, res) => {
  const { protein, calories, carbs } = req.body;
  const id = req.params.id;
  db.query('UPDATE nutrients SET protein = ?, calories = ?, carbs = ? WHERE id = ?', [protein, calories, carbs, id], (err, results) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    res.json({ id, protein, calories, carbs });
  });
});

// Delete a nutrient entry
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM nutrients WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json({ message: 'Nutrient deleted' });
  });
});

module.exports = router;