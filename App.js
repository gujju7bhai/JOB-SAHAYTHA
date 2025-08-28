import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Add Link here
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
// import TermsAndConditions from './components/TermsAndConditions'; // Removed Terms and Conditions page component
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Try to get mode from localStorage or default to false
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : '';
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
        <button
          className="dark-light-toggle"
          onClick={toggleDarkMode}
          aria-label="Toggle dark/light mode"
        >
          {darkMode ? '🌙' : '☀️'}
        </button>
      </div>
    </Router>
  );
}

export default App;