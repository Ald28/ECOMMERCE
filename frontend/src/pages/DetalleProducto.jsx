import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const DetalleProducto = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/productos/${productId}/`)
      .then(response => {
        console.log('Producto data:', response.data);
        setProducto(response.data);
      })
      .catch(error => {
        console.error(`Hubo un error al obtener el producto ${productId}!`, error);
        setError(error);
      });
  }, [productId]);

  const handleAddToCart = () => {
    if (producto) {
      addToCart({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: 1 // Ajustar según la lógica de cantidad deseada por defecto
      });
      setIsAddingToCart(true);
      setTimeout(() => {
        setIsAddingToCart(false);
      }, 2000); // Ocultar la alerta después de 2 segundos
    }
  };

  if (error) {
    return <div>Error al cargar el producto. Intenta nuevamente más tarde.</div>;
  }

  if (!producto) {
    return <div>Cargando...</div>;
  }

  const imageUrl = `${producto.imagen}`;

  // Verificar el stock del producto
  if (producto.stock === 0) {
    return (
      <div className="row mt-4">
        <div className="col-md-6 mb-4">
          <img 
            src={imageUrl} 
            className="card-img-top" 
            alt={producto.nombre}/>
        </div>
        <div className="col-md-6 mb-4">
          <h3>{producto.nombre}</h3>
          <p><strong>Precio:</strong> ${producto.precio}</p>
          <p><strong>Descripción:</strong> {producto.descripcion}</p>
          <div className="alert alert-warning" role="alert">
            Este producto está agotado.
          </div>
          <Link to="/carrito" className="btn btn-success ml-2">Ver carrito</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="row mt-4">
      <div className="col-md-6 mb-4">
        <img 
          src={imageUrl} 
          className="card-img-top" 
          alt={producto.nombre}/>
      </div>
      <div className="col-md-6 mb-4">
        <h3>{producto.nombre}</h3>
        <p><strong>Precio:</strong> ${producto.precio}</p>
        <p><strong>Descripción:</strong> {producto.descripcion}</p>
        <button 
          className="btn btn-primary" 
          onClick={handleAddToCart} 
          disabled={producto.stock === 0}
        >
          Añadir al carrito
        </button>
        {isAddingToCart && (
          <div className="alert alert-success mt-2" role="alert">
            Producto agregado al carrito
          </div>
        )}
      </div>
    </div>
  );
};

export default DetalleProducto;
