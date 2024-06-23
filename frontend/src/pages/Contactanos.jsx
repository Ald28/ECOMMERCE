import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Contactanos = () => {
  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Contáctanos</h2>

      <div className="row">
        <div className="col-md-6">
          <h3>Información de Contacto</h3>
          <ul className="list-unstyled">
            <li><strong>Dirección:</strong> Av. Principal #123, Ciudad, País</li>
            <li><strong>Teléfono:</strong> +123 456 789</li>
            <li><strong>Correo Electrónico:</strong> info@officehub.com</li>
          </ul>

          <h3>Horario de Atención</h3>
          <p>Lunes a Viernes: 9:00 AM - 6:00 PM</p>
          <p>Sábados y Domingos: Cerrado</p>
        </div>

        <div className="col-md-6">
          <form>
            <div className="form-group">
              <label htmlFor="nombre">Nombre:</label>
              <input type="text" className="form-control" id="nombre" placeholder="Ingrese su nombre" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo Electrónico:</label>
              <input type="email" className="form-control" id="email" placeholder="Ingrese su correo electrónico" required />
            </div>

            <div className="form-group">
              <label htmlFor="mensaje">Mensaje:</label>
              <textarea className="form-control" id="mensaje" rows="5" placeholder="Escriba su mensaje aquí" required></textarea>
            </div>

            <button type="submit" className="btn btn-primary">Enviar Mensaje</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contactanos;
