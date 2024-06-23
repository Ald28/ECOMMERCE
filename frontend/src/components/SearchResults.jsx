// src/components/SearchResults.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchResults = ({ results }) => {
  return (
    <div className="search-results">
      {results.length > 0 ? (
        <ul className="list-group">
          {results.map(result => (
            <li key={result.id} className="list-group-item">
              <Link to={`/productos/${result.id}`}>
                <div className="d-flex align-items-center">
                  <img src={`http://localhost:8000${result.imagen}`}  alt={result.nombre} className="img-thumbnail mr-3" style={{ width: '50px', height: '50px' }} />
                  {result.nombre}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="no-results"></div>
      )}
    </div>
  );
};

export default SearchResults;
