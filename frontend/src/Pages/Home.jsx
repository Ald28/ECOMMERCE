import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from '../components/Carousel/Carousel';
import '../assets/styles/Home.css';

const Home = ({ isAuthenticated }) => {
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const { categoryId } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

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

  const handleAddToCart = (product) => {
    addToCart({ ...product, price: parseFloat(product.price) });
    navigate('/cart');
  };

  return (
    <div className="container">
      <Carousel />
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
                <div className="card product-card">
                  <div className="card-header">
                    {product.discount && <span className="badge badge-pill badge-danger">Oferta</span>}
                  </div>
                  <img src={product.image} alt={product.name} className="card-img-top product-img" onClick={() => navigate(`/product/${product.id}`)} />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    {product.discount ? (
                      <p className="card-text text-danger">
                        S/ {product.discounted_price} <span className="original-price">S/ {product.price}</span>
                      </p>
                    ) : (
                      <p className="card-text">S/ {product.price}</p>
                    )}
                  </div>
                  <div className="card-footer">
                    <button onClick={() => handleAddToCart(product)} className="btn btn-success">
                      <i className="bi bi-cart-plus"></i> 
                      <svg xmlns="http://www.w3.org/2000/svg" width="1.13em" height="1em" viewBox="0 0 576 512"><path fill="currentColor" d="M0 24C0 10.7 10.7 0 24 0h45.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5l-51.6-271c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24m128 440a48 48 0 1 1 96 0a48 48 0 1 1-96 0m336-48a48 48 0 1 1 0 96a48 48 0 1 1 0-96"/></svg>
                      Añadir al Carrito
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
