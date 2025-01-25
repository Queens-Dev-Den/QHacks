const express = require('express');
const router = express.Router();
const { Workout, Exercise, User } = require('../models'); // Adjust the path as needed

// POST request to create a workout
router.post('/', async (req, res) => {
  try {
    const { userId, name, category, exercises } = req.body;

    // Validate input
    if (!userId || !category || !Array.isArray(exercises)) {
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
router.post('/getuserworkouts', async (req, res) => {
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