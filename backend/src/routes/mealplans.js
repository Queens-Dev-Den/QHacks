const express = require('express');
const router = express.Router();
const { Mealplan, Meal, User } = require('../models');

// POST request to create a meal plan
router.post('/', async (req, res) => {
  try {
    const { userId, name, meals } = req.body;

    // Validate input
    if (!userId || !name || !Array.isArray(meals)) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    // Check if the user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create the meal plan
    const mealplan = await Mealplan.create({
      userId,
      name,
    });

    // Create the meals
    const mealPromises = meals.map(meal => {
      return Meal.create({
        mealplanId: mealplan.id,
        name: meal.name,
        description: meal.description,
        protein: meal.protein,
        carbohydrates: meal.carbohydrates,
        fat: meal.fat,
        calories: meal.calories,
        day: meal.day,
      });
    });

    await Promise.all(mealPromises);

    // Fetch the meal plan with its meals
    const createdMealplan = await Mealplan.findByPk(mealplan.id, {
      include: [
        {
          model: Meal,
          as: 'meals',
        },
        {
          model: User,
          as: 'user',
          attributes: ['username', 'email'],
        },
      ],
    });

    return res.status(201).json({ message: 'Meal plan created successfully', mealplan: createdMealplan });
  } catch (error) {
    console.error('Error creating meal plan:', error);
    return res.status(500).json({ error: 'An error occurred while creating the meal plan', details: error.message });
  }
});

// POST request to retrieve a user's meal plan
router.post('/get-users-mealplans', async (req, res) => {
  try {
    const { userId } = req.body;

    // Validate input
    if (!userId) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    // Retrieve the meal plan
    const mealplan = await Mealplan.findOne({
      where: { userId },
      include: [
        {
          model: Meal,
          as: 'meals',
        },
        {
          model: User,
          as: 'user',
          attributes: ['username', 'email'],
        },
      ],
    });

    if (!mealplan) {
      return res.status(404).json({ error: 'Meal plan not found' });
    }

    return res.status(200).json(mealplan);
  } catch (error) {
    console.error('Error retrieving meal plan:', error);
    return res.status(500).json({ error: 'An error occurred while retrieving the meal plan', details: error.message });
  }
});

router.get('/test', async (req, res) => {
    try {
      const workouts = await Mealplan.findAll({
        include: [
          {
            model: Meal,
            as: 'meals',
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