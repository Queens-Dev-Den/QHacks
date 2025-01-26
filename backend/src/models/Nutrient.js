const mongoose = require('mongoose');

const NutrientSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  protein: {
    type: Number,
    required: true,
    default: 0
  },
  calories: {
    type: Number,
    required: true,
    default: 0
  },
  carbs: {
    type: Number,
    required: true,
    default: 0
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Nutrient = mongoose.model('Nutrient', NutrientSchema);

module.exports = Nutrient;