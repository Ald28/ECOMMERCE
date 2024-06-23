import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/Register.css';

const Registrarse = ({ onLogin }) => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/registro/', {
            nombre,
            apellido,
            correo,
            contrasena
        })
        .then(response => {
            console.log(response.data);
            alert('Usuario registrado exitosamente');
            onLogin();
            navigate('/Inicio');
        })
        .catch(error => {
            console.error('Error registrando usuario:', error);
            alert('Error registrando usuario: ' + error.message); // Mostrar el mensaje de error específico
        });
    };

    return (
        <div className="register-container py-4">
            <div className="register-box">
                <h2 className="mb-4">Registro</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nombre"
                            placeholder="Nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="apellido" className="form-label">Apellido</label>
                        <input
                            type="text"
                            className="form-control"
                            id="apellido"
                            placeholder="Apellido"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="correo" className="form-label">Correo Electrónico</label>
                        <input
                            type="email"
                            className="form-control"
                            id="correo"
                            placeholder="Correo Electrónico"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="contrasena" className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            id="contrasena"
                            placeholder="Contraseña"
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Registrarse</button>
                </form>
                <div className="mt-3">
                    <button onClick={() => navigate('/IniciarSesion')} className="btn btn-link">¿Ya tienes una cuenta? Inicia sesión aquí</button>
                </div>
            </div>
        </div>
    );
};

export default Registrarse;
