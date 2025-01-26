import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import WorkoutPage from './pages/WorkoutPage';
import MealsPage from './pages/MealsPage';
import './App.css';
import ProtectedRoute from './components/routing/ProtectedRoute';
import AlreadyLoggedIn from './components/routing/AlreadyLoggedIn';
import Layout from './components/layout/Layout';
import ProteinProgressRing from './components/mealspage/ProteinProgressRing';

const App = () => {
  const userId = 1; // Replace with the actual user ID

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          <AlreadyLoggedIn>
            <LoginPage />
          </AlreadyLoggedIn>
          } 
        />
        <Route path="/signup" element={
          <AlreadyLoggedIn>
            <SignupPage />
          </AlreadyLoggedIn>
          } 
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <HomePage/>
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/workout"
          element={
            <ProtectedRoute>
              <Layout>
                <WorkoutPage/>
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/meals"
          element={
            <ProtectedRoute>
              <Layout>
                <MealsPage/>
                <div>
                  <h1>Nutrient Tracker</h1>
                  <ProteinProgressRing userId={userId} />
                </div>
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;