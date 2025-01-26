import React from 'react';
import '../styles/MealsPage.css';
import RecipeAI from '../components/mealspage/RecipeAI';

const MealsPage = () => {


  return (
    <div className="mealspage-container">
      <h1 className='meals-title'>Meals</h1>
      <RecipeAI />
    </div>
  );
};

export default MealsPage;