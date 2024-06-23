import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Registrarse from './pages/Registrarse';
import Inicio from './pages/Inicio';
import Carrito from './pages/Carrito';
import IniciarSesion from './pages/IniciarSesion';
import ProductosPorCategoria from './pages/ProductosPorCategoria';
import DetalleProducto from './pages/DetalleProducto';
import Contactanos from './pages/Contactanos';

import Header from './components/Header';
import About from './components/About';
import Footer from './components/Footer';

import { CartProvider } from './context/CartContext';

import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [categories, setCategories] = useState([]); // Estado para almacenar las categorías

  useEffect(() => {
    // Recuperar datos de localStorage al cargar la aplicación
    const storedIsAuthenticated = localStorage.getItem('isAuthenticated');
    const storedUserName = localStorage.getItem('userName');

    if (storedIsAuthenticated && storedIsAuthenticated === 'true') {
      setIsAuthenticated(true);
    }

    if (storedUserName) {
      setUserName(storedUserName);
    }

    // Obtener categorías desde la API
    axios.get('http://localhost:8000/api/categorias/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleLogin = (username) => {
    setIsAuthenticated(true);
    setUserName(username);
    // Guardar en localStorage
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userName', username);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName('');
    // Limpiar localStorage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userName');
  };

  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Header isAuthenticated={isAuthenticated} handleLogout={handleLogout} userName={userName} categories={categories} /> {/* Pasa las categorías */}
          <main className="container mt-4">
            <Routes>
              {/* Rutas protegidas */}
              <Route path="/categorias/:categoryId" element={isAuthenticated ? <ProductosPorCategoria /> : <Navigate to="/" />} />
              <Route path="/productos/:productId" element={isAuthenticated ? <DetalleProducto /> : <Navigate to="/" />} />
              <Route path="/carrito" element={isAuthenticated ? <Carrito /> : <Navigate to="/" />} />
              
              {/* Rutas públicas */}
              <Route path="/" element={isAuthenticated ? <Navigate to="/inicio" /> : <Inicio isAuthenticated={isAuthenticated} />} />
              <Route path="/inicio" element={isAuthenticated ? <Inicio isAuthenticated={isAuthenticated} /> : <Navigate to="/" />} />
              <Route path="/registrarse" element={<Registrarse onLogin={handleLogin} />} />
              <Route path="/iniciarsesion" element={<IniciarSesion onLogin={handleLogin} />} />
              <Route path="/about" element={<About />} />
              <Route path="/contactanos" element={<Contactanos />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;