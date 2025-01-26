// filepath: /c:/Users/jorda/repos/QHacks/frontend/src/pages/MealsPage.js
import React from 'react';
import '../styles/MealsPage.css';
import ProteinProgressRing from '../components/mealspage/ProteinProgressRing';
import CaloriesProgressRing from '../components/mealspage/CaloriesProgressRing';
import CarbsProgressRing from '../components/mealspage/CarbsProgressRing';
import RecipeAI from '../components/mealspage/RecipeAI';

const MealsPage = () => {
  const proteinConsumed = 60; // Example value
  const proteinGoal = 100; // Example value
  const caloriesConsumed = 1500; // Example value
  const caloriesGoal = 2000; // Example value
  const carbsConsumed = 200; // Example value
  const carbsGoal = 300; // Example value

  return (
    <div className="mealspage-container">
      <h1 className='meals-title'>Meals</h1>
      <div className="progress-rings">
        <ProteinProgressRing proteinConsumed={proteinConsumed} proteinGoal={proteinGoal} />
        <CaloriesProgressRing caloriesConsumed={caloriesConsumed} caloriesGoal={caloriesGoal} />
        <CarbsProgressRing carbsConsumed={carbsConsumed} carbsGoal={carbsGoal} />
      </div>
      <RecipeAI />
    </div>
  );
};

export default MealsPage;