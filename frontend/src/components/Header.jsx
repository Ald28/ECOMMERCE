import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../assets/styles/Header.css';
import SearchResults from './SearchResults'; // Importar el componente SearchResults

const Header = ({ isAuthenticated, handleLogout, categories }) => {
  const { cart } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      axios.get(`http://localhost:8000/api/buscar_productos/?query=${searchQuery}`) // Usar la URL correcta
        .then(response => {
          setSearchResults(response.data);
          console.log(response.data); // Manejar los resultados de búsqueda
        })
        .catch(error => {
          console.error('Error fetching search results:', error);
        });
    }
  };

  const handleClickOutside = (event) => {
    if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
      setSearchResults([]);
      setIsSearchFocused(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="header text-dark py-1">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark d-flex justify-content-between">
          <Link className="navbar-brand" to="/">
            <img src="./images/logo5.png" alt="Logo" style={{ height: '60px' }} />
          </Link>
          <div className="d-flex align-items-center">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item fw-bold">
                <NavLink className="nav-link text-white fw-bold" to="/inicio">INICIO</NavLink>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  CATEGORÍAS
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {categories && categories.length > 0 && categories.map(category => (
                    <Link key={category.id} className="dropdown-item text-dark" to={`/categorias/${category.id}`}>{category.nombre}</Link>
                  ))}
                </div>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/about">NOSOTROS</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link text-white" to="/contactanos">CONTÁCTANOS</NavLink>
              </li>
            </ul>
            <div className="d-flex align-items-center search-container" ref={searchContainerRef}>
              <form onSubmit={handleSearch} className={`form-inline ml-3 ${isSearchFocused ? 'focused' : ''}`}>
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Buscar productos"
                  aria-label="Buscar"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Buscar</button>
              </form>
              {/* Renderizar los resultados de búsqueda */}
              <SearchResults results={searchResults} />
              {isAuthenticated ? (
                <>
                  <Link to="/carrito" className="btn btn-link text-dark ml-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-cart"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
                    <span className="badge badge-pill badge-danger">{cart.length}</span>
                  </Link>
                  <button className="btn btn-danger ml-2" onClick={handleLogout}>Cerrar Sesion</button>
                </>
              ) : (
                <>
                  <Link to="/iniciarsesion" className="btn boton ml-2">Iniciar Sesión</Link>
                  <Link to="/registrarse" className="btn boton ml-1">Registrarse</Link>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;