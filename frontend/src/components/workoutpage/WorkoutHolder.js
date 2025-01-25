import React from 'react';
import { GiBiceps } from 'react-icons/gi';
import './WorkoutHolder.css';

const WorkoutHolder = () => {
    const exercises = [
      { name: 'Bicep Curls', reps: '3 sets of 12 reps' },
      { name: 'Tricep Dips', reps: '3 sets of 15 reps' },
      { name: 'Hammer Curls', reps: '3 sets of 10 reps' },
      // Add more exercises as needed
    ];
  
    return (
      <div className="workout-container">
        <div className='content'>
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

export default WorkoutHolder;