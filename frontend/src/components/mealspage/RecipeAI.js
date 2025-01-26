import React, { useState } from 'react';
import './RecipeAI.css';

const RecipeAI = () => {
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState('');
  const [generatedRecipe, setGeneratedRecipe] = useState('Enter some ingredients and tap on Generate New Recipe to generate a recipe.');

  const addIngredient = () => {
    if (ingredient.trim()) {
      setIngredients([...ingredients, ingredient]);
      setIngredient('');
    }
  };

  const deleteIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/gpt/meal-feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mealData: ingredients }), // Assuming mealData is similar to ingredients
      });

      if (!response.ok) {
        throw new Error('Failed to fetch recipe');
      }

      const data = await response.json();
      setGeneratedRecipe(data.message);
    } catch (error) {
      console.error('Error fetching recipe:', error);
    }
  };

  return (
    <div className='recipe-ai'>
    <div className="recipe-container">
      <h2>Add Ingredients</h2>
      <form className="recipe-form" onSubmit={(e) => { e.preventDefault(); addIngredient(); }}>
        <div className="ingredient-input-group">
          <input
          className='ingredient-input'
            type="text"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            placeholder="Enter ingredient"
            required
          />
          <button className="ingredient-button" type="button" onClick={addIngredient}>Add</button>
        </div>
        <div className="ingredients-list">
          <ul className='ingrelist'>
            {ingredients.map((ing, index) => (
              <li className='ingredient' key={index}>
                {ing}
                <button type="button" className="delete-button" onClick={() => deleteIngredient(index)}>X</button>
              </li>
            ))}
          </ul>
        </div>
      </form>
      <button type="button" className="generate-button" onClick={handleSubmit}>Generate New Recipe</button>
    </div>
        <div className="generated-recipe">
          <h3 className='gen-rec-title'>Generated Recipe</h3>
          <p className='gen-rec'>{generatedRecipe}</p>
        </div>
    </div>
  );
};

export default RecipeAI;