// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Header from './components/Header/Header';
import Cart from './Pages/Cart';
import CategoryList from './components/Categorias/CategoryList';
import { CartProvider } from './context/CartContext';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import About from './components/landin/About';
import ProductDetail from './Pages/ProductDetail';

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
              <Route path="/product/:id" element={<ProductDetail />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
