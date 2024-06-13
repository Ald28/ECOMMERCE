import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import CategoryList from './CategoryList';
import './Home.css'; // Importa el archivo CSS donde se definió la clase

const Home = ({ isAuthenticated }) => {
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const { categoryId } = useParams();

    useEffect(() => {
        axios.get('http://localhost:8000/api/products/')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the products!', error);
            });
    }, []);

    useEffect(() => {
        if (categoryId) {
            axios.get(`http://localhost:8000/api/products/?category=${categoryId}`)
                .then(response => {
                    setProducts(response.data);
                })
                .catch(error => {
                    console.error('There was an error fetching the products!', error);
                });

            axios.get(`http://localhost:8000/api/categories/${categoryId}/`)
                .then(response => {
                    setCategoryName(response.data.name);
                })
                .catch(error => {
                    console.error('There was an error fetching the category!', error);
                });
        } else {
            axios.get('http://localhost:8000/api/products/')
                .then(response => {
                    setProducts(response.data);
                })
                .catch(error => {
                    console.error('There was an error fetching the products!', error);
                });

            setCategoryName('');
        }
    }, [categoryId]);

    return (
        <div>
            <h2>Bienvenido a nuestra pasteleria :D</h2>
            {!isAuthenticated ? (
                <div>
                    <Link to="/register">
                        <button>Registro</button>
                    </Link>
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                </div>
            ) : (
                <div>
                    <CategoryList />
                    <h3>{categoryId ? `Productos de la categoría ${categoryName}` : 'Todos los productos'}</h3>
                    <ul>
                        {products.map(product => (
                            <li key={product.id}>
                                <h4>{product.name}</h4>
                                <p>{product.description}</p>
                                <p>Price: ${product.price}</p>
                                {product.image && <img src={`${product.image}`} alt={product.name} className="product-image" />}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Home;
