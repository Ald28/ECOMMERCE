import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import CategoryList from './components/CategoryList';
import Header from './components/Header';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [categories, setCategories] = useState([]);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  useEffect(() => {
    axios.get('http://localhost:8000/api/categories/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  return (
    <Router>
      <div className="App">
        <Header isAuthenticated={isAuthenticated} handleLogout={handleLogout} categories={categories} />
        <main className="container mt-4">
          <Routes>
            <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Home isAuthenticated={isAuthenticated} />} />
            <Route path="/home" element={isAuthenticated ? <Home isAuthenticated={isAuthenticated} /> : <Navigate to="/" />} />
            <Route path="/categories/:categoryId" element={<Home isAuthenticated={isAuthenticated} />} />
            <Route path="/categories" element={<CategoryList />} />
            <Route path="/register" element={<Register onLogin={handleLogin} />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
