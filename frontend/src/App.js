
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import Header from './components/Header';
import Cart from './components/Cart';
import CategoryList from './components/CategoryList';
import { CartProvider } from './context/CartContext';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import About from './components/About';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/categories/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the categories!', error);
      });
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <CartProvider>
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
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
