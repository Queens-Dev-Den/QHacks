import React, { useState, useEffect } from 'react';
import '../styles/HomePage.css';
import Assistant from '../components/homepage/Assistant';
import Summary from '../components/homepage/Summary';

const HomePage = () => {
  
  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Today</h1>
      <Assistant />
      <Summary />
    </div>
  );
};

export default HomePage;