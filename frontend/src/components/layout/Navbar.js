import React from 'react';
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import { HiHome } from "react-icons/hi2";
import { MdOutlineFoodBank } from "react-icons/md";
import { PiBarbell } from "react-icons/pi";

const Navbar = () => {
    const navigate = useNavigate();

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
                <ul className='nav-menu'>
                    <li className="nav-item">
                        <button onClick={navigateWorkout} className={"nav-button"} >
                            <PiBarbell className={`nav-icon ${location.pathname === '/workout' ? 'active' : ''}`} />
                        </button>
                    </li>
                    <li className="nav-item">
                        <button onClick={navigateHome} className={"nav-button"}>
                            <HiHome className={`nav-icon ${location.pathname === '/' ? 'active' : ''}`} />
                        </button>
                    </li>
                    <li className="nav-item">
                        <button onClick={navigateMeals} className={"nav-button"} >
                            <MdOutlineFoodBank className={`nav-icon ${location.pathname === '/meals' ? 'active' : ''}`} />
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;