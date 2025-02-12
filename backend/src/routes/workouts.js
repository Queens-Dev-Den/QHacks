const express = require('express');
const router = express.Router();
const { Workout, Exercise, User, Schedule } = require('../models');
const verifyToken = require('../middleware/authMiddleware');

// POST request to create a workout
router.post('/', async (req, res) => {
  try {
    const { userId, name, category, exercises } = req.body;

    // Validate input
    if (!userId || !name || !category || !Array.isArray(exercises)) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create the workout
    const workout = await Workout.create({
      userId,
      name,
      category,
    });

    // Create the exercises
    const exercisePromises = exercises.map(exercise => {
        return Exercise.create({
          workoutId: workout.id,
          name: exercise.name,
          weight: exercise.weight,
          reps: exercise.reps,
          sets: exercise.sets,
        });
      });

    await Promise.all(exercisePromises);

    const createdWorkout = await Workout.findByPk(workout.id, {
        include: [
          {
            model: Exercise,
            as: 'exercises',
          },
          {
            model: User,
            as: 'user',
            attributes: ['username', 'email'],
          },
        ],
      });

      return res.status(201).json({ message: 'Workout created successfully', workout: createdWorkout });
    } catch (error) {
      console.error('Error creating workout:', error);
      return res.status(500).json({ error: 'An error occurred while creating the workout', details: error.message });
    }
});

// GET request to return user's workouts
router.post('/get-users-workouts', async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({ error: 'Invalid input' });
      }

    const workouts = await Workout.findAll({
    where: { userId },
      include: [
        {
          model: Exercise,
          as: 'exercises',
        },
        {
          model: User,
          as: 'user',
          attributes: ['username', 'email'],
        },
      ],
    });

    return res.status(200).json(workouts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while retrieving the workouts' });
  }
});

// Route to delete a workout
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const workoutId = req.params.id;
    const deletedWorkout = await Workout.destroy({
      where: { id: workoutId }
    });

    if (!deletedWorkout) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    res.status(200).json({ message: 'Workout deleted successfully' });
  } catch (error) {
    console.error('Error deleting workout:', error);
    res.status(500).json({ error: 'Failed to delete workout' });
  }
});

// GET request to return all workouts
router.get('/test', async (req, res) => {
    try {
      const workouts = await Workout.findAll({
        include: [
          {
            model: Exercise,
            as: 'exercises',
          },
          {
            model: User,
            as: 'user',
            attributes: ['username', 'email'],
          },
        ],
      });
  
      return res.status(200).json(workouts);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'An error occurred while retrieving the workouts' });
    }
  });

module.exports = router;