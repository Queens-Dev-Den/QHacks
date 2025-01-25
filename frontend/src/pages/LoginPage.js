import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Get the navigate function

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER_URL}/api/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                // Store the authentication token (e.g., in localStorage)
                localStorage.setItem('authToken', data.token);
                setError('');
                navigate('/'); // Redirect to the home page
            } else {
                const data = await response.json();
                setError(data.error || 'Failed to login');
            }
        } catch (error) {
            setError('Failed to login');
        }
    };

    return (
        <div className="login-page">
            <form className='login-form' onSubmit={handleSubmit}>
                <h2>Login</h2>
                {error && <p className="error">{error}</p>}
                <div className='input-group'>
                    <label htmlFor='email'>Email</label>
                    <input
                        type='email'
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className='input-group'>
                    <label htmlFor='password'>Password</label>
                    <div className='password-input-group'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            className="toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                </div>
                <button className="submit-button" type='submit'>Login</button>
            </form>
            <p className="signup-text">
                New to qhacks? <Link to="/signup" className="signup-link">Sign Up</Link>
            </p>
        </div>
    );
};

export default LoginPage;