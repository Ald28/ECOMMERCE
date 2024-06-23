// ProductosPorCategoria.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import DetalleProducto from './DetalleProducto'; // Importa el componente DetalleProducto

const ProductosPorCategoria = () => {
  const { categoryId } = useParams(); // Obtener el parámetro de la URL
  const [productos, setProductos] = useState([]);
  const [categoria, setCategoria] = useState('');
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    axios.get(`http://localhost:8000/api/categorias/${categoryId}/productos/`)
      .then(response => {
        console.log(response.data); // Verifica los datos recibidos
        setCategoria(response.data.categoria); // Guarda el nombre de la categoría
        setProductos(response.data.productos); // Guarda los productos
      })
      .catch(error => {
        console.error(`Hubo un error al obtener los productos de la categoría ${categoryId}!`, error);
        setError(error); // Guarda el error para mostrarlo o manejarlo
      });
  }, [categoryId]);

  if (error) {
    return <div>Error al cargar los productos. Intenta nuevamente más tarde.</div>;
  }

  return (
    <div className="container">
      <h2 className='text-left'>Categoría: {categoria}</h2>
      <div className="row mt-4">
        {productos.map(producto => (
          <div key={producto.id} className="col-md-3 mb-4">
            <div className="card">
              <img 
                src={`http://localhost:8000${producto.imagen}`} 
                className="card-img-top" 
                alt={producto.nombre} />
              <div className="card-body">
                <h5 className="card-title">{producto.nombre}</h5>
                <p className="card-text">${producto.precio}</p>
                <Link to={`/productos/${producto.id}`} className="btn btn-primary">Ver detalle</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductosPorCategoria;

