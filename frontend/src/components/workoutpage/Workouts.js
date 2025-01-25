import React from 'react';
import './Workouts.css';

workout = 
{
    "userId": 1,
    "category": "arms",
    "dayOfWeek": "Monday",
    "exercises": [
      {
        "name": "Bicep Curl",
        "weight": 20,
        "reps": 10,
        "sets": 3
      },
      {
        "name": "Tricep Extension",
        "weight": 15,
        "reps": 12,
        "sets": 3
      }
    ]
}

const Workouts = () => {
  return (
    <div className="workouts-container">
      {/* Add individual workout containers here */}
      <div className="workout-item">Workout 1</div>
      <div className="workout-item">Workout 2</div>
      <div className="workout-item">Workout 3</div>
      {/* Add more workout items as needed */}
    </div>
  );
};

export default Workouts;