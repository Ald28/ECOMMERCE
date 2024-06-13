import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Carousel from './Carousel';
import '../assets/styles/Home.css'; // Asegúrate de que la ruta sea correcta

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
        <div className="container-fluid p-0">
            <Carousel />
            <div className="container mt-4">
                {!isAuthenticated ? (
                    <div className="text-center mb-4">
                        <Link to="/register" className="btn btn-primary mr-2">Registro</Link>
                        <Link to="/login" className="btn btn-secondary">Login</Link>
                    </div>
                ) : (
                    <div>
                        <h3 className="mt-4">{categoryId ? `Productos de la categoría ${categoryName}` : 'Todos los productos'}</h3>
                        <div className="row">
                            {products.map(product => (
                                <div key={product.id} className="col-md-4 mb-4">
                                    <div className="card h-100 shadow-sm">
                                        {product.image && <img src={`${product.image}`} alt={product.name} className="card-img-top img-fluid product-image" />}
                                        <div className="card-body d-flex flex-column">
                                            <h5 className="card-title">{product.name}</h5>
                                            <p className="card-text">{product.description}</p>
                                            <p className="card-text mt-auto"><strong>Price: ${product.price}</strong></p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
