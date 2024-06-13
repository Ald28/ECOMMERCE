import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/Header.css'; // Importa el archivo CSS

const Header = ({ isAuthenticated, handleLogout, categories }) => {
  return (
    <header className="sticky-header bg-white text-dark py-1">
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-dark">
          <Link className="navbar-brand" to="/">
            <img src="./images/logoOfficeHub.png" alt="Logo" style={{ height: '70px' }} />
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/home">Home</Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-dark" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Categorías
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {categories.map(category => (
                    <li key={category.id}>
                      <Link className="dropdown-item" to={`/categories/${category.id}`}>{category.name}</Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
            {isAuthenticated && (
              <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
