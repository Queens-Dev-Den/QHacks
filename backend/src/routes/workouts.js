const express = require('express');
const router = express.Router();
const { Workout, Exercise, User, Schedule } = require('../models');

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

    // Fetch the workout with its exercises
    const createdWorkout = await Workout.findByPk(workout.id, {
      include: [
        {
          model: Exercise,
          as: 'exercises', // Ensure the alias matches
        },
        {
          model: User,
          as: 'user', // Ensure the alias matches
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

    // Fetch the workout with its exercises
    const createdWorkout = await Workout.findByPk(workout.id, {
      include: [
        {
          model: Exercise,
          as: 'exercises', // Ensure the alias matches
        },
        {
          model: User,
          as: 'user', // Ensure the alias matches
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

// POST request to return user's workouts for the category of the current day
router.post('/current-day-workouts', async (req, res) => {
  try {
    const { userId } = req.body;

    // Validate input
    if (!userId) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    // Determine the current day of the week
    const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const currentDay = daysOfWeek[new Date().getDay()];

    // Get the user's schedule for the current day
    const schedule = await Schedule.findOne({
      where: { userId },
      attributes: [currentDay],
    });

    console.log('Schedule:', schedule);

    if (!schedule || !schedule[currentDay]) {
      return res.status(404).json({ error: 'No workout scheduled for today' });
    }

    const category = schedule[currentDay];
    console.log('Category:', category);

    // Get the workouts for the user and the category of the current day
    const workouts = await Workout.findAll({
      where: { userId, category },
      include: [
        {
          model: Exercise,
          as: 'exercises', // Ensure the alias matches
        },
        {
          model: User,
          as: 'user', // Ensure the alias matches
          attributes: ['username', 'email'],
        },
      ],
    });

    console.log('Workouts:', workouts);

    return res.status(200).json(workouts);
  } catch (error) {
    console.error('Error retrieving workouts:', error);
    return res.status(500).json({ error: 'An error occurred while retrieving the workouts', details: error.message });
  }
});

// GET request to return all workouts (for testing purposes)
router.get('/test', async (req, res) => {
  try {
    const workouts = await Workout.findAll({
      include: [
        {
          model: Exercise,
          as: 'exercises', // Ensure the alias matches
        },
        {
          model: User,
          as: 'user', // Ensure the alias matches
          attributes: ['username', 'email'],
        },
      ],
    });

    return res.status(200).json(workouts);
  } catch (error) {
    console.error('Error retrieving workouts:', error);
    return res.status(500).json({ error: 'An error occurred while retrieving the workouts', details: error.message });
  }
});

module.exports = router;