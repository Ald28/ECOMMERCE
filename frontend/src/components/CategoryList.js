import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de que Bootstrap está importado

const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/categories/')
            .then(response => setCategories(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <nav className="my-4">
            <ul className="list-group">
                <li className="list-group-item">
                    <Link to="/">Home</Link>
                </li>
                {categories.map(category => (
                    <li key={category.id} className="list-group-item">
                        <Link to={`/categories/${category.id}`}>{category.name}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default CategoryList;
