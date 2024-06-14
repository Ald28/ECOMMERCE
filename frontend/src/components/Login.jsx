import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de que Bootstrap está importado
import '../assets/styles/Login.css'; // Asegúrate de crear este archivo y agregar los estilos a continuación

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login/', {
            email,
            password
        })
        .then(response => {
            console.log(response.data);
            alert('Login successful');
            onLogin();  // Llama a onLogin después del login exitoso
            navigate('/home');  // Redirige al home después del login
        })
        .catch(error => {
            console.error(error);
            alert('Error logging in');
        });
    };

    return (
        <div className="login-container">
            <div className="login-box">
            <h2 className="mb-4">Inicio Sesión</h2>
            <img src="./images/logoOfficeHub.png" alt="Logo" style={{ height: '70px' }} /><hr></hr>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Correo: </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
                <div className="mt-3">
                    <button onClick={() => navigate('/register')} className="btn btn-link">¿No tienes una cuenta? Registrar aquí</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
