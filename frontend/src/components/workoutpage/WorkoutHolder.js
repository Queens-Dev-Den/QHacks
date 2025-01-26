import React, { useState, useEffect } from 'react';
import './WorkoutHolder.css';

const WorkoutHolder = ({ userInfo }) => {
  const [workouts, setWorkouts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newWorkoutName, setNewWorkoutName] = useState('');
  const [exercises, setExercises] = useState([]);

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

  const handleCreateWorkout = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/workouts/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId: userInfo.id, name: newWorkoutName, exercises }),
      });

      if (response.ok) {
        const newWorkout = await response.json();
        setWorkouts([...workouts, newWorkout]);
        setShowPopup(false);
        setNewWorkoutName('');
        setExercises([]);
      } else {
        console.error('Failed to create workout');
      }
    } catch (error) {
      console.error('Error creating workout:', error);
    }
  };

  const handleAddExercise = () => {
    setExercises([...exercises, { name: '', sets: '', reps: '' }]);
  };

  const handleRemoveExercise = (index) => {
    const newExercises = exercises.filter((_, i) => i !== index);
    setExercises(newExercises);
  };

  const handleExerciseChange = (index, field, value) => {
    const newExercises = exercises.map((exercise, i) => 
      i === index ? { ...exercise, [field]: value } : exercise
    );
    setExercises(newExercises);
  };

  return (
    <div className="workout-container">
      <div className='content'>
        <button className="plus-button" onClick={() => setShowPopup(true)}>+</button>
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

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Create New Workout</h2>
            <form className="popup-form" onSubmit={handleCreateWorkout}>
              <div className='popup-top-content'>
                <input
                  type="text"
                  value={newWorkoutName}
                  onChange={(e) => setNewWorkoutName(e.target.value)}
                  placeholder="Workout Name"
                  required
                />
                <button type="add-exercise-button" onClick={handleAddExercise}>Add Exercise</button>
              </div>
              <div className='exercises-content'>
              {exercises.map((exercise, index) => (
                <div key={index} className="exercise-input">
                  <input
                  className="exercise-input-field"
                    type="text"
                    value={exercise.name}
                    onChange={(e) => handleExerciseChange(index, 'name', e.target.value)}
                    placeholder="Exercise Name"
                    required
                  />
                  <input
                  className="exercise-input-field"
                    type="number"
                    value={exercise.sets}
                    onChange={(e) => handleExerciseChange(index, 'sets', e.target.value)}
                    placeholder="Sets"
                    required
                  />
                  <input
                  className="exercise-input-field"
                    type="number"
                    value={exercise.reps}
                    onChange={(e) => handleExerciseChange(index, 'reps', e.target.value)}
                    placeholder="Reps"
                    required
                  />
                  <button type="button" onClick={() => handleRemoveExercise(index)}>X</button>
                </div>
              ))}
              </div>
              <div className="buttons">
                <button type="submit">Create</button>
                <button type="button" onClick={() => setShowPopup(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutHolder;