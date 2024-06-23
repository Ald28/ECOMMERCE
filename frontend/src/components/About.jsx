import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/About.css';

const About = () => {
  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Sobre Nosotros</h2>

      {/* Sección Nuestra Historia */}
      <div className="row mb-5">
        <div className="col-md-6 mb-4 mb-md-0">
          <img src="/images/u0.png" className="img-fluid rounded shadow" alt="Nuestro equipo" />
        </div>
        <div className="col-md-6 d-flex align-items-center">
          <div>
            <h3>Nuestra Historia</h3>
            <p className="text-muted">OfficeHub fue fundada en 2021 con la misión de proporcionar productos de alta calidad a precios competitivos. Desde nuestros humildes comienzos, hemos crecido hasta convertirnos en uno de los principales proveedores de suministros de oficina y escolares en línea.</p>
            <p className="text-muted">Estamos comprometidos con la satisfacción del cliente y trabajamos arduamente para asegurarnos de que cada cliente tenga una experiencia de compra satisfactoria.</p>
          </div>
        </div>
      </div>

      {/* Sección Nuestra Misión */}
      <div className="row mb-5">
        <div className="col-md-6 order-md-2 mb-4 mb-md-0 d-flex align-items-center">
          <div>
            <h3>Nuestra Misión</h3>
            <p className="text-muted">En OfficeHub, nuestra misión es facilitar a nuestros clientes el acceso a todo lo que necesitan para su oficina o escuela, desde material de arte hasta cuadernos y lápices. Nos esforzamos por ofrecer una experiencia de compra en línea sin complicaciones y un servicio al cliente excepcional.</p>
          </div>
        </div>
        <div className="col-md-6 order-md-1">
          <img src="/images/u1.png" className="img-fluid rounded shadow" alt="Nuestra misión" />
        </div>
      </div>

      {/* Sección Nuestros Valores */}
      <div className="row mb-5">
        <div className="col-md-6 mb-4 mb-md-0">
          <img src="/images/u2.png" className="img-fluid rounded shadow" alt="Nuestros valores" />
        </div>
        <div className="col-md-6 d-flex align-items-center">
          <div>
            <h3>Nuestros Valores</h3>
            <ul className="list-unstyled">
              <li><strong>Calidad:</strong> Nos comprometemos a ofrecer productos de la más alta calidad.</li>
              <li><strong>Innovación:</strong> Siempre buscamos formas de mejorar nuestros productos y servicios.</li>
              <li><strong>Integridad:</strong> Actuamos con honestidad y transparencia en todas nuestras operaciones.</li>
              <li><strong>Satisfacción del Cliente:</strong> Nuestra prioridad número uno es la satisfacción de nuestros clientes.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
