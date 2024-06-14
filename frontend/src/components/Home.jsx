import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Carousel from './Carousel';
import '../assets/styles/ProductCard.css'; 

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
                <div className="card">
                  {product.image && <img src={`${product.image}`} alt={product.name} className="card-img-top img-fluid" />}
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text text-danger"><strong>${product.price}</strong></p>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleAddToCart(product)}
                    >
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
