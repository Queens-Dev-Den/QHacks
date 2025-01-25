import React, { useState, useEffect } from 'react';
import '../styles/WorkoutPage.css';
import AssistantWorkout from '../components/workoutpage/AssistantWorkout';

const WorkoutPage = () => {

  return (
    <div className="workoutpage-container">
      <h1 className='workoutpage-title'>Workout</h1>
      <AssistantWorkout />
    </div>
  );
};

export default WorkoutPage;