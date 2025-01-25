import React, { useState, useEffect } from 'react';
import '../styles/WorkoutPage.css';
import WorkoutHolder from '../components/workoutpage/WorkoutHolder';

const WorkoutPage = () => {

  return (
    <div className="workoutpage-container">
      <h1 className='workoutpage-title'>Workout</h1>
      <WorkoutHolder />
    </div>
  );
};

export default WorkoutPage;