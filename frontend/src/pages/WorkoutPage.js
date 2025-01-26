import React, { useState, useEffect } from 'react';
import '../styles/WorkoutPage.css';
import WorkoutHolder from '../components/workoutpage/WorkoutHolder';
import getUserInfo from '../utils/user-info';

const WorkoutPage = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const data = await getUserInfo();
        setUserInfo(data);
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="workoutpage-container">
      <h1 className='workoutpage-title'>Workout</h1>
      <WorkoutHolder userInfo={userInfo} />
    </div>
  );
};

export default WorkoutPage;