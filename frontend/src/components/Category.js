import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Category = () => {
    const { id } = useParams();
    const [categoria, setCategoria] = useState(null);
    const [productos, setProducto] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/categorias/${id}/`)
            .then(response => setCategoria(response.data))
            .catch(error => console.error(error));

        axios.get(`http://localhost:8000/api/productos/?categoria=${id}`)
            .then(response => setProducto(response.data))
            .catch(error => console.error(error));
    }, [id]);

    return (
        <div className="container">
            {categoria && <h2 className="my-4 text-center">{categoria.nombre}</h2>}
            <div className="row">
                {productos.map(product => (
                    <div key={productos.id} className="col-md-4">
                        <div className="card mb-4 shadow-sm">
                            {producto.image && (
                                <img
                                    src={`http://localhost:8000${product.image}`}
                                    alt={product.name}
                                    className="card-img-top"
                                    style={{ width: '100%', height: '15vw', objectFit: 'cover' }}
                                />
                            )}
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.description}</p>
                                <p className="card-text"><strong>${product.price}</strong></p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Category;
