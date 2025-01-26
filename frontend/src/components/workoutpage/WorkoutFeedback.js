import React,{ useState, useEffect } from 'react';
import './WorkoutFeedback.css';

const WorkoutFeedback = ({ userInfo }) => {
    const [feedback, setFeedback] = useState(null);
    const [workouts, setWorkouts] = useState({});
        
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

    useEffect(() => {
        const fetchWorkoutFeedback = async () => {
        if (workouts && userInfo) {
            try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/gpt/workout-feedback`, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(workouts),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch workout feedback');
            }

            const data = await response.json();
            setFeedback(data);
            } catch (error) {
            console.error('Error fetching workout feedback:', error);
            }
        }
        };

        fetchWorkoutFeedback();
    }, [workouts]);

    if (!userInfo) {
        return <div className="workoutfeedback-container"><p className='workoutfeedback-text' >AI Feedback is unavailable if you are not signed in.</p></div>;
      }

      return (
        <div className="workoutfeedback-container">
          <h2 className="workoutfeedback-title">AI Expert Feedback</h2>
          {feedback ? (
            <pre className='workoutfeedback-text' >{feedback.message }</pre>
          ) : (
            <p className='workoutfeedback-text' >Loading workout feedback...</p>
          )}
        </div>
      );
    };

export default WorkoutFeedback;