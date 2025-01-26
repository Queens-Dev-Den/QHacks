import React, { useState, useEffect } from 'react';
import './WorkoutHolder.css';
import { FaPlus, FaPencilAlt, FaTrash } from 'react-icons/fa';

const WorkoutHolder = ({ userInfo, onWorkoutDataChange }) => {
  const [workouts, setWorkouts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newWorkoutName, setNewWorkoutName] = useState('');
  const [exercises, setExercises] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [editMode, setEditMode] = useState(false);

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

  useEffect(() => {
    fetchWorkouts();
  }, [userInfo]);

  const handleCreateWorkout = async (e) => {
    e.preventDefault();

    if (exercises.length === 0) {
      setErrorMessage('You must add at least one exercise.');
      return;
    }

    const formattedExercises = exercises.map(exercise => ({
      name: exercise.name,
      weight: '0', // Default value for weight
      reps: exercise.reps,
      sets: exercise.sets
    }));

    const workoutData = {
      userId: userInfo.id,
      name: newWorkoutName,
      category: 'general-workout', // Default value for category
      exercises: formattedExercises
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/workouts/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify(workoutData),
      });

      if (response.ok) {
        setShowPopup(false);
        setNewWorkoutName('');
        setExercises([]);
        setErrorMessage('');
        window.location.reload(); // Refresh the page
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

  const handleDeleteWorkout = async (workoutId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/workouts/${workoutId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (response.ok) {
        setWorkouts(workouts.filter(workout => workout.id !== workoutId));
      } else {
        console.error('Failed to delete workout');
      }
    } catch (error) {
      console.error('Error deleting workout:', error);
    }
  };

  return (
    <div className="workout-container">
      <div className='content'>
        <button className="edit-button" onClick={() => setEditMode(!editMode)}>
          <FaPencilAlt />
        </button>
        <button className="plus-button" onClick={() => setShowPopup(true)}>
          <FaPlus />
        </button>
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
              {editMode && (
                <button className="delete-button" onClick={() => handleDeleteWorkout(workout.id)}>
                  <FaTrash />
                </button>
              )}
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
                <button type="button" className='add-exercise-button' onClick={handleAddExercise}>Add Exercise</button>
              </div>
              <div className='exercises-content'>
              {exercises.map((exercise, index) => (
                <div key={index} className="exercise-input">
                  <input
                  className="exercise-input-field exercise-field"
                    type="text"
                    value={exercise.name}
                    onChange={(e) => handleExerciseChange(index, 'name', e.target.value)}
                    placeholder="Exercise Name"
                    required
                  />
                  <input
                  className="exercise-input-field sets-field"
                    type="number"
                    value={exercise.sets}
                    onChange={(e) => handleExerciseChange(index, 'sets', e.target.value)}
                    placeholder="Sets"
                    required
                  />
                  <input
                  className="exercise-input-field reps-field"
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
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <div className="buttons">
                <button type="submit">Create</button>
                <button type="button" className="cancel-button" onClick={() => setShowPopup(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkoutHolder;