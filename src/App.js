import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap

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
              <header className="bg-dark text-white py-3 text-center">
                  <div className="container">
                      <h1 className="mb-0">eCommerce Store</h1>
                      {isAuthenticated && (
                          <button className="btn btn-danger mt-3" onClick={handleLogout}>Logout</button>
                      )}
                  </div>
              </header>
              <main className="container mt-4">
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