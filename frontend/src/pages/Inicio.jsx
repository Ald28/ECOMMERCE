import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Carousel from "../components/Carousel";
import "../assets/styles/Inicio.css";

const Inicio = () => {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/categorias/")
      .then((response) => {
        console.log(response.data); // Verifica la estructura de datos recibida
        setCategorias(response.data);
      })
      .catch((error) => {
        console.error("Hubo un error al obtener las categorías!", error);
      });
  }, []);

  return (
    <div className="">
      <Carousel />
      <div className="container">
        <div className="mt-5">
          <h2>Categorías</h2>
          <div className="row mt-5">
            {categorias.map((categoria) => (
              <div key={categoria.id} className="col-md-4 mb-4">
                <div className="category-card">
                  <Link to={`/categorias/${categoria.id}`}>
                    {categoria.imagen ? (
                      <img
                        src={`${categoria.imagen}`}
                        alt={categoria.nombre}
                        className="category-image"
                      />
                    ) : (
                      <div className="card-img-placeholder">
                        Imagen no disponible
                      </div>
                    )}
                    <div className="category-name">{categoria.nombre}</div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;

