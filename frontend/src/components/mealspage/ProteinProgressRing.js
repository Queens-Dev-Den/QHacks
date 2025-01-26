import React, { useState, useEffect } from 'react';
import { getNutrients, updateNutrient } from '../../utils/apiService';
import './ProgressRing.css';

const ProteinProgressRing = ({ userId }) => {
  const [proteinConsumed, setProteinConsumed] = useState(0);
  const [proteinGoal, setProteinGoal] = useState(100);
  const [showModal, setShowModal] = useState(false);
  const [newProteinConsumed, setNewProteinConsumed] = useState(proteinConsumed);
  const [newProteinGoal, setNewProteinGoal] = useState(proteinGoal);
  const [nutrientId, setNutrientId] = useState(null);

  const radius = 50;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const [strokeDashoffset, setStrokeDashoffset] = useState(circumference - (proteinConsumed / proteinGoal) * circumference);

  useEffect(() => {
    const fetchNutrients = async () => {
      try {
        const data = await getNutrients(userId);
        if (data.length > 0) {
          const nutrient = data[0]; // Assuming the first entry is the one we want
          setProteinConsumed(nutrient.protein);
          setProteinGoal(nutrient.calories); // Assuming calories is the goal
          setNutrientId(nutrient.id);
          setNewProteinConsumed(nutrient.protein);
          setNewProteinGoal(nutrient.calories);
        }
      } catch (error) {
        console.error('Error fetching nutrients:', error);
      }
    };

    fetchNutrients();
  }, [userId]);

  useEffect(() => {
    setStrokeDashoffset(circumference - (proteinConsumed / proteinGoal) * circumference);
  }, [proteinConsumed, proteinGoal, circumference]);

  const handleSave = async () => {
    try {
      await updateNutrient(nutrientId, {
        protein: Number(newProteinConsumed),
        calories: Number(newProteinGoal),
        carbs: 0 // Assuming carbs is not used in this context
      });
      setProteinConsumed(Number(newProteinConsumed));
      setProteinGoal(Number(newProteinGoal));
      setShowModal(false);
    } catch (error) {
      console.error('Error updating nutrient:', error);
    }
  };

  return (
    <div className="progress-ring-container">
      <svg
        height={radius * 2}
        width={radius * 2}
        className="progress-ring"
      >
        <circle
          stroke="#d3d3d3"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="#00f"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <p className="progress-ring__text">
        {proteinConsumed}g / {proteinGoal}g
      </p>
      <p className="progress-ring__text">
        Protein
      </p>
      <button className="invisible-button" onClick={() => setShowModal(true)}></button>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Update Protein</h2>
            <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              <div>
                <label>Protein Consumed:</label>
                <input
                  type="number"
                  value={newProteinConsumed}
                  onChange={(e) => setNewProteinConsumed(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Protein Goal:</label>
                <input
                  type="number"
                  value={newProteinGoal}
                  onChange={(e) => setNewProteinGoal(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProteinProgressRing;