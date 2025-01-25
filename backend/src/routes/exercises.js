const express = require('express');
const router = express.Router();
const { Exercise, Workout } = require('../models'); // Adjust the path as needed

// POST request to create an exercise
router.post('/', async (req, res) => {
  try {
    const { workoutId, name, weight, reps, sets } = req.body;

    // Validate input
    if (!workoutId || !name || !weight || !reps || !sets) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    // Check if the workout exists
    const workout = await Workout.findByPk(workoutId);
    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    // Create the exercise
    const exercise = await Exercise.create({
      workoutId,
      name,
      weight,
      reps,
      sets,
    });

    return res.status(201).json({ message: 'Exercise created successfully', exercise });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while creating the exercise' });
  }
});

module.exports = router;