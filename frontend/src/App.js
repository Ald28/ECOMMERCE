import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <h1>eCommerce Store</h1>
                    {isAuthenticated && (
                        <button onClick={handleLogout}>Logout</button>
                    )}
                </header>
                <main>
                    <Routes>
                        <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Home isAuthenticated={isAuthenticated} />} />
                        <Route path="/home" element={isAuthenticated ? <Home isAuthenticated={isAuthenticated} /> : <Navigate to="/" />} />
                        <Route path="/categories/:categoryId" element={<Home isAuthenticated={isAuthenticated} />} />
                        <Route path="/register" element={<Register onLogin={handleLogin} />} />
                        <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
