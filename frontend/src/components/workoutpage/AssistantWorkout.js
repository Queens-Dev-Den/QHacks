import React from 'react';
import { GiBiceps } from 'react-icons/gi';
import './AssistantWorkout.css';

const AssistantWorkout = () => {
    const exercises = [
      { name: 'Bicep Curls', reps: '3 sets of 12 reps' },
      { name: 'Tricep Dips', reps: '3 sets of 15 reps' },
      { name: 'Hammer Curls', reps: '3 sets of 10 reps' },
      // Add more exercises as needed
    ];
  
    return (
      <div className="assistant-workout-container">
        <div className="top-content">
          <p className="assistant-workout-top-text">Today is...</p>
        </div>
        <div className='bottom-content'>
            <h1 className="assistant-workout-title">Arms</h1>
            <div className="exercise-list">
            {exercises.map((exercise, index) => (
                <div key={index} className="exercise-item">
                <div className="exercise-details">
                    <p className="exercise-name">{exercise.name}</p>
                    <p className="exercise-reps">{exercise.reps}</p>
                </div>
                </div>
            ))}
            </div>
        </div>
      </div>
    );
};

export default AssistantWorkout;