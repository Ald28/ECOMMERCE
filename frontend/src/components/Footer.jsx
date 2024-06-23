import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer" style={{ backgroundColor: "#55a687" }}>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h4>Contacto</h4>
            <p>Dirección: 123 Calle Principal, Ciudad</p>
            <p>Teléfono: +123456789</p>
            <p>Email: info@example.com</p>
          </div>
          <div className="col-md-6">
            <h4>Enlaces útiles</h4>
            <ul>
              <li>
                <a href="#">Inicio</a>
              </li>
              <li>
                <a href="#">Productos</a>
              </li>
              <li>
                <a href="#">Servicios</a>
              </li>
              <li>
                <a href="#">Acerca de nosotros</a>
              </li>
              <li>
                <a href="#">Contacto</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
