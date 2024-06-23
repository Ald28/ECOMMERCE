import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/Login.css';

const IniciarSesion = ({ onLogin }) => {
    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/iniciar_sesion/', {
            correo: correo,
            password: password
        })
        .then(response => {
            console.log(response.data);
            alert('Inicio de sesión exitoso');
            onLogin(); // Llamar a la función de inicio de sesión pasada como prop
            navigate('/Inicio'); // Redirigir a la página de inicio
        })
        .catch(error => {
            console.error(error);
            alert('Error al iniciar sesión');
        });
    };

    return (
        <div className="d-flex justify-content-center align-items-center py-4">
                    <div className="login-box p-4 rounded shadow text-center">
            <h2 className="mb-4">Inicio de Sesión</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo Electrónico</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Correo electrónico"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
            </form>
            <div className="mt-3">
                <button onClick={() => navigate('/Registrarse')} className="btn btn-link">¿No tienes una cuenta? Regístrate aquí</button>
            </div>
        </div>
        </div>

    );
};

export default IniciarSesion;
