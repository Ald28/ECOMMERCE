import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de que Bootstrap está importado

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/products/')
            .then(response => setProducts(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="container">
            <h2 className="my-4">All Products</h2>
            <div className="row">
                {products.map(product => (
                    <div key={product.id} className="col-md-4">
                        <div className="card mb-4 shadow-sm">
                            {product.image && <img src={`http://localhost:8000${product.image}`} alt={product.name} className="card-img-top" style={{ width: '100%', height: '15vw', objectFit: 'cover' }} />}
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.description}</p>
                                <p className="card-text">${product.price}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
