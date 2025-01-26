import React, { useState } from 'react';
import './RecipeAI.css';

const RecipeAI = () => {
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState('');
  const [generatedRecipe, setGeneratedRecipe] = useState('');

  const addIngredient = () => {
    if (ingredient.trim()) {
      setIngredients([...ingredients, ingredient]);
      setIngredient('');
    }
  };

  const deleteIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const generateRecipe = async () => {
    const prompt = `Create a recipe using the following ingredients: ${ingredients.join(', ')}`;
    console.log('Generating recipe with prompt:', prompt);

    try {
      const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          max_tokens: 150
        })
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Generated recipe:', data.choices[0].text);
        setGeneratedRecipe(data.choices[0].text);
      } else {
        console.error('Failed to generate recipe');
      }
    } catch (error) {
      console.error('Error generating recipe:', error);
    }
  };

  return (
    <div className="recipe-container">
      <h2>Add Ingredients</h2>
      <form className="recipe-form" onSubmit={(e) => { e.preventDefault(); addIngredient(); }}>
        <div className="input-group">
          <input
            type="text"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            placeholder="Enter ingredient"
            required
          />
          <button type="button" onClick={addIngredient}>Add</button>
        </div>
        <div className="ingredients-list">
          <ul>
            {ingredients.map((ing, index) => (
              <li key={index}>
                {ing}
                <button type="button" className="delete-button" onClick={() => deleteIngredient(index)}>X</button>
              </li>
            ))}
          </ul>
        </div>
        <button type="button" className="generate-button" onClick={generateRecipe}>Generate New Recipe</button>
      </form>
      {generatedRecipe && (
        <div className="generated-recipe">
          <h3>Generated Recipe</h3>
          <p>{generatedRecipe}</p>
        </div>
      )}
    </div>
  );
};

export default RecipeAI;