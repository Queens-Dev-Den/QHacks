import React from 'react';
import './ProgressRing.css';

const CarbsProgressRing = ({ carbsConsumed, carbsGoal }) => {
  const radius = 50;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (carbsConsumed / carbsGoal) * circumference;

  return (
    <div className="progress-ring-container">
        <svg
        height={radius * 2}
        width={radius * 2}
        className="progress-ring"
        >
        <circle
            stroke="#d3d3d3"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
        />
        <circle
            stroke="#2e17ffa8"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={`${circumference} ${circumference}`}
            style={{ strokeDashoffset }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="progress-ring__circle"
        />
        </svg>
        <p className="progress-ring__text">
            {carbsConsumed}g / {carbsGoal}g
        </p>
        <p className="progress-ring__text">
            Carbs
        </p>
    </div>
  );
};

export default CarbsProgressRing;