import React, { useState, useEffect } from 'react';
import '../styles/HomePage.css';
import Assistant from '../components/homepage/Assistant';
import Summary from '../components/homepage/Summary';

const HomePage = () => {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const date = new Date();
    const day = date.getDate();
    const daySuffix = getDaySuffix(day);
    const weekday = date.toLocaleDateString(undefined, { weekday: 'long' });
    const month = date.toLocaleDateString(undefined, { month: 'long' });
    const formattedDate = `${weekday}<br>${month} ${day}${daySuffix}`;
    setCurrentDate(formattedDate);
  }, []);

  const getDaySuffix = (day) => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };
  
  return (
    <div className="homepage-container">
      <h1 className="homepage-title" dangerouslySetInnerHTML={{ __html: currentDate }}></h1>
      <Assistant />
      <Summary />
    </div>
  );
};

export default HomePage;