// src/components/About.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importa Bootstrap
import '../../assets/styles/About.css'; // Importa los estilos personalizados

const About = () => {
    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Sobre Nosotros</h2>
            <div className="row mb-4">
                <div className="col-md-6">
                    <img src="/images/u0.png" className="img-fluid rounded" alt="Nuestro equipo" />
                </div>
                <div className="col-md-6">
                    <h3>Nuestra Historia</h3>
                    <p>OfficeHub fue fundada en 2021 con la misión de proporcionar productos de alta calidad a precios competitivos. Desde nuestros humildes comienzos, hemos crecido hasta convertirnos en uno de los principales proveedores de suministros de oficina y escolares en línea.</p>
                    <p>Estamos comprometidos con la satisfacción del cliente y trabajamos arduamente para asegurarnos de que cada cliente tenga una experiencia de compra satisfactoria.</p>
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-md-6">
                    <h3>Nuestra Misión</h3>
                    <p>En OfficeHub, nuestra misión es facilitar a nuestros clientes el acceso a todo lo que necesitan para su oficina o escuela, desde material de arte hasta cuadernos y lápices. Nos esforzamos por ofrecer una experiencia de compra en línea sin complicaciones y un servicio al cliente excepcional.</p>
                </div>
                <div className="col-md-6">
                    <img src="/images/u1.png" className="img-fluid rounded" alt="Nuestra misión" />
                </div>
            </div>
            <div className="row mb-4">
                <div className="col-md-6">
                    <img src="/images/u2.png" className="img-fluid rounded" alt="Nuestros valores" />
                </div>
                <div className="col-md-6">
                    <h3>Nuestros Valores</h3>
                    <ul>
                        <li><strong>Calidad:</strong> Nos comprometemos a ofrecer productos de la más alta calidad.</li>
                        <li><strong>Innovación:</strong> Siempre buscamos formas de mejorar nuestros productos y servicios.</li>
                        <li><strong>Integridad:</strong> Actuamos con honestidad y transparencia en todas nuestras operaciones.</li>
                        <li><strong>Satisfacción del Cliente:</strong> Nuestra prioridad número uno es la satisfacción de nuestros clientes.</li>
                    </ul>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <h3 className="text-center">Contáctanos</h3>
                    <p className="text-center">¿Tienes alguna pregunta o necesitas asistencia? No dudes en ponerte en contacto con nosotros.</p>
                    <p className="text-center"><strong>Email:</strong> soporte@officehub.com</p>
                    <p className="text-center"><strong>Teléfono:</strong> +123 456 7890</p>
                </div>
            </div>
        </div>
    );
};

export default About;
