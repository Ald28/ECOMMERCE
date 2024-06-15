import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/ProductDetail.css';
import { useCart } from '../context/CartContext';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/products/${id}/`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the product details!', error);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, price: parseFloat(product.price), quantity });
    }
  };

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="product-detail row">
        <div className="col-md-6 d-flex justify-content-center">
          <img src={product.image} alt={product.name} className="img-fluid" />
        </div>
        <div className="product-info col-md-6">
          <h2>{product.name}</h2>
          <h4>{product.description}</h4>
          <h3 className="price text-danger">${product.price}</h3>
          <div className="quantity-control">
            <button className="btn btn-secondary" onClick={decreaseQuantity}>-</button>
            <span className="quantity">{quantity}</span>
            <button className="btn btn-secondary" onClick={increaseQuantity}>+</button>
          </div>
          <button
            className="btn btn-primary mt-3"
            onClick={handleAddToCart}
          >
            Añadir al Carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
