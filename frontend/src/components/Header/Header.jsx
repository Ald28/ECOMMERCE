import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '../../assets/styles/Header.css'; // Importa el archivo CSS

const Header = ({ isAuthenticated, handleLogout, categories }) => {
  const { cart } = useCart();

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
                <a className="nav-link dropdown-toggle text-dark" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Categorías
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  {categories.map(category => (
                    <Link key={category.id} className="dropdown-item" to={`/categories/${category.id}`}>{category.name}</Link>
                  ))}
                </div>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-dark" to="/about">Sobre Nosotros</Link>
              </li>
            </ul>
            {isAuthenticated && (
              <>
                <Link to="/cart" className="btn btn-link text-dark">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1.5em" height="1.5em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-cart"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
                  <span className="badge badge-pill badge-danger">{cart.length}</span>
                </Link>
                <button className="btn btn-danger ml-2" onClick={handleLogout}>Logout</button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
