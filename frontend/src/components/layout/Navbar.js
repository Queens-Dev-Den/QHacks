import React from 'react';
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import { PiHouseFill } from "react-icons/pi";
import { BiSolidPlusSquare } from "react-icons/bi";
import { BiSolidExit } from "react-icons/bi";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    const navigateHome = () => {
        navigate('/');
    };

    const navigateWorkout = () => {
        navigate('/workout');
    }

    const navigateMeals = () => {
        navigate('/meals');
    }

    const location = useLocation();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                </Link>
                <ul className='nav-menu'>
                    <li className="nav-item">
                        <button onClick={navigateHome} className={`nav-button ${location.pathname === '/' ? 'active' : ''}`}>
                            <PiHouseFill className="nav-icon" />
                            Home
                        </button>
                    </li>
                    <li className="nav-item">
                        <button onClick={navigateWorkout} className={`nav-button ${location.pathname === '/workout' ? 'active' : ''}`} >
                            <BiSolidPlusSquare className="nav-icon" />
                            Workout
                        </button>
                    </li>
                    <li className="nav-item">
                        <button onClick={navigateMeals} className={`nav-button ${location.pathname === '/meals' ? 'active' : ''}`} >
                            <BiSolidPlusSquare className="nav-icon" />
                            Meals
                        </button>
                    </li>
                    <li className="nav-item">
                        <button onClick={handleLogout} className='nav-button'>
                            <BiSolidExit className='nav-icon' />
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;