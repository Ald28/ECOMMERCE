import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/categories/')
      .then(response => setCategories(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2 className="my-4 text-center">Categorías</h2>
      <ul className="list-group">
        {categories.map(category => (
          <li key={category.id} className="list-group-item">
            <Link to={`/categories/${category.id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
