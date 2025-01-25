import React, { useState, useEffect } from 'react';
import { GiBiceps } from 'react-icons/gi';
import './WorkoutHolder.css';

const WorkoutHolder = ({ userInfo }) => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      if (!userInfo) return;

      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/workouts/get-users-workouts`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId: userInfo.id }),
        });

        if (response.ok) {
          const data = await response.json();
          setWorkouts(data);
        } else {
          console.error('Failed to fetch workouts');
        }
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    };

    fetchWorkouts();
  }, [userInfo]);
  
    return (
      <div className="workout-container">
        <div className='content'>
            <div className="workout-list">
            {workouts.map((workout, workoutIndex) => (
                <div key={workoutIndex} className="workout-item">
                <div className="workout-details">
                    <p className="workout-name">{workout.name}</p>
                    {workout.exercises.map((exercise, exerciseIndex) => (
                      <div key={exerciseIndex} className="exercise-item">
                        <div className="exercise-details">
                          <p className="exercise-name">{exercise.name}</p>
                          <p className="exercise-sets">{exercise.sets}x{exercise.reps}</p>
                        </div>
                      </div>
                      ))}
                </div>
                </div>
            ))}
            </div>
        </div>
      </div>
    );
};

export default WorkoutHolder;