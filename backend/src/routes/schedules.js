const express = require('express');
const router = express.Router();
const { Schedule, User } = require('../models');

// POST request to create a schedule
router.post('/', async (req, res) => {
  try {
    const { userId, monday, tuesday, wednesday, thursday, friday, saturday, sunday } = req.body;

    // Validate input
    if (!userId) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create the schedule
    const schedule = await Schedule.create({
      userId,
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
    });

    return res.status(201).json({ message: 'Schedule created successfully', schedule });
  } catch (error) {
    console.error('Error creating schedule:', error);
    return res.status(500).json({ error: 'An error occurred while creating the schedule', details: error.message });
  }
});

// POST request to return user's schedule
router.post('/user-schedule', async (req, res) => {
  try {
    const { userId } = req.body;

    // Validate input
    if (!userId) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    const schedule = await Schedule.findOne({
      where: { userId },
      attributes: ['userId', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['username', 'email'],
        },
      ],
    });

    return res.status(200).json(schedule);
  } catch (error) {
    console.error('Error retrieving schedule:', error);
    return res.status(500).json({ error: 'An error occurred while retrieving the schedule', details: error.message });
  }
});

// GET request to return all schedules (for debugging purposes)
router.get('/all-schedules', async (req, res) => {
  try {
    const schedules = await Schedule.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['username', 'email'],
        },
      ],
    });

    return res.status(200).json(schedules);
  } catch (error) {
    console.error('Error retrieving schedules:', error);
    return res.status(500).json({ error: 'An error occurred while retrieving the schedules', details: error.message });
  }
});

module.exports = router;