import React from 'react';
import { GiBiceps } from 'react-icons/gi';
import './WorkoutHolder.css';

const WorkoutHolder = () => {
    const workouts = [
      {
        "id": 1,
        "name": "Upper Hypertrophy",
        "category": "Arms 2",
        "createdAt": "2025-01-25T21:17:03.000Z",
        "updatedAt": "2025-01-25T21:17:03.000Z",
        "userId": 2,
        "exercises": [
          {
            "id": 2,
            "name": "Bench Press",
            "weight": 15,
            "reps": 12,
            "sets": 3,
            "workoutId": 1,
            "createdAt": "2025-01-25T21:17:03.000Z",
            "updatedAt": "2025-01-25T21:17:03.000Z"
          },
          {
            "id": 1,
            "name": "Leg Press",
            "weight": 20,
            "reps": 10,
            "sets": 3,
            "workoutId": 1,
            "createdAt": "2025-01-25T21:17:03.000Z",
            "updatedAt": "2025-01-25T21:17:03.000Z"
          }
        ],
        "user": {
          "username": "testing2",
          "email": "testin2g@zach.com"
        }
      },
      {
        "id": 2,
        "name": "Upper Hypertrophy",
        "category": "Arms 3",
        "createdAt": "2025-01-25T21:17:09.000Z",
        "updatedAt": "2025-01-25T21:17:09.000Z",
        "userId": 2,
        "exercises": [
          {
            "id": 4,
            "name": "Bench Press",
            "weight": 15,
            "reps": 12,
            "sets": 3,
            "workoutId": 2,
            "createdAt": "2025-01-25T21:17:09.000Z",
            "updatedAt": "2025-01-25T21:17:09.000Z"
          },
          {
            "id": 3,
            "name": "Leg Press",
            "weight": 20,
            "reps": 10,
            "sets": 3,
            "workoutId": 2,
            "createdAt": "2025-01-25T21:17:09.000Z",
            "updatedAt": "2025-01-25T21:17:09.000Z"
          }
        ],
        "user": {
          "username": "testing2",
          "email": "testin2g@zach.com"
        }
      },
      {
        "id": 3,
        "name": "Upper Hypertrophy",
        "category": "Arms 3",
        "createdAt": "2025-01-25T21:17:09.000Z",
        "updatedAt": "2025-01-25T21:17:09.000Z",
        "userId": 2,
        "exercises": [
          {
            "id": 4,
            "name": "Bench Press",
            "weight": 15,
            "reps": 12,
            "sets": 3,
            "workoutId": 2,
            "createdAt": "2025-01-25T21:17:09.000Z",
            "updatedAt": "2025-01-25T21:17:09.000Z"
          },
          {
            "id": 3,
            "name": "Leg Press",
            "weight": 20,
            "reps": 10,
            "sets": 3,
            "workoutId": 2,
            "createdAt": "2025-01-25T21:17:09.000Z",
            "updatedAt": "2025-01-25T21:17:09.000Z"
          }
        ],
        "user": {
          "username": "testing2",
          "email": "testin2g@zach.com"
        }
      }
    ]
  
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