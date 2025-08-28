import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Auth.css';

const Auth = () => {
    const navigate = useNavigate();
    const [currentForm, setCurrentForm] = useState('signup');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Form states
    const [signupForm, setSignupForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        agree: false
    });

    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    });

    const toggleForm = (formType) => {
        setCurrentForm(formType);
        setError('');
    };

    const validateEmail = (email) => {
        const validator = /\S+@\S+\.\S+/;
        return validator.test(email);
    };

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Username validation
        if (!signupForm.username.trim()) {
            setError('Please enter a username!');
            return;
        }

        // Email validation
        if (!validateEmail(signupForm.email)) {
            setError('Please enter a valid E-Mail address!');
            return;
        }

        // Password validation
        if (!signupForm.password.trim() || !signupForm.confirmPassword.trim()) {
            setError('Please enter and confirm your password!');
            return;
        }

        if (signupForm.password !== signupForm.confirmPassword) {
            setError('Passwords do not match!');
            return;
        }

        // Terms and conditions validation
        if (!signupForm.agree) {
            setError('You must agree to the Terms & Conditions.');
            return;
        }

        // Store user data in localStorage (for demo purposes)
        const userData = {
            username: signupForm.username,
            email: signupForm.email,
            password: signupForm.password
        };

        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('isAuthenticated', 'true');

        alert('Sign Up Form Submitted Successfully!');
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate('/dashboard');
        }, 1200);
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            setError('');
        }
        catch (error) {
            setError('An roor occured');
        }
        finally {
            setLoading(false);
        }



        // Username validation
        if (!loginForm.username.trim()) {
            setError('Please enter your username!');
            return;
        }

        // Password validation
        if (!loginForm.password.trim()) {
            setError('Please enter your password!');
            return;
        }

        // Check if user exists (simple demo authentication)
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            if (userData.username === loginForm.username && userData.password === loginForm.password) {
                localStorage.setItem('isAuthenticated', 'true');
                setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                    navigate('/dashboard');
                }, 1200);
                return;
            }
        }

        // For demo purposes, also allow any username/password combination
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('currentUser', loginForm.username);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate('/dashboard');
        }, 100);
    };

    const handleSignupChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSignupForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginForm(prev => ({
            ...prev,
            [name]: value
        }));
    };


    return (
            <div className={`auth-container${loading ? ' loading-blur' : ''}`}>
                {loading && <div className="loading-overlay">Loading...</div>}
                <div className="auth-wrapper">
                    <div className="toggle-buttons">
                        <button
                            className={`toggle-btn ${currentForm === 'signup' ? 'active' : ''}`}
                            onClick={() => toggleForm('signup')}
                        >
                            Sign Up
                        </button>
                        <button
                            className={`toggle-btn ${currentForm === 'login' ? 'active' : ''}`}
                            onClick={() => toggleForm('login')}
                        >
                            Login
                        </button>
                    </div>

                    {error && <div className="auth-error">{error}</div>}

                    {/* Signup Form */}
                    <div className={`form-container ${currentForm !== 'signup' ? 'hidden' : ''}`}>
                        <form onSubmit={handleSignupSubmit}>
                            <fieldset>
                                <h2>Sign Up</h2>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={signupForm.username}
                                    onChange={handleSignupChange}
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="E-Mail"
                                    value={signupForm.email}
                                    onChange={handleSignupChange}
                                    required
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={signupForm.password}
                                    onChange={handleSignupChange}
                                    required
                                />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={signupForm.confirmPassword}
                                    onChange={handleSignupChange}
                                    required
                                />

                                <a href="#terms" className="terms-link">Terms and Conditions Apply</a>
                                <div className="checkbox-container">
                                    <input
                                        type="checkbox"
                                        name="agree"
                                        id="agree"
                                        checked={signupForm.agree}
                                        onChange={handleSignupChange}
                                    />
                                    <label htmlFor="agree">I agree</label>
                                </div>

                                <button type="submit" className="btn">Sign Up</button>

                                <div className="auth-switch">
                                    <p>Already have an account?
                                        <button
                                            type="button"
                                            className="switch-auth-btn"
                                            onClick={() => toggleForm('login')}
                                        >
                                            Login here
                                        </button>
                                    </p>
                                </div>
                            </fieldset>
                        </form>
                    </div>

                    {/* Login Form */}
                    <div className={`form-container ${currentForm !== 'login' ? 'hidden' : ''}`}>
                        <form onSubmit={handleLoginSubmit}>
                            <fieldset>
                                <h2>Login</h2>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={loginForm.username}
                                    onChange={handleLoginChange}
                                    required
                                />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={loginForm.password}
                                    onChange={handleLoginChange}
                                    required
                                />

                                <button type="submit" className="btn">Login</button>

                                <div className="auth-switch">
                                    <p>Don't have an account?
                                        <button
                                            type="button"
                                            className="switch-auth-btn"
                                        >
                                            Sign up here
                                        </button>
                                    </p>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
            );
};

            export default Auth;
