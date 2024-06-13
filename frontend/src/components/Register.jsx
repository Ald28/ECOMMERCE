import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de que Bootstrap está importado
import '../assets/styles/Register.css'; // Asegúrate de crear este archivo y agregar los estilos a continuación

const Register = ({ onLogin }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/register/', {
            first_name: firstName,
            last_name: lastName,
            email,
            password
        })
        .then(response => {
            console.log(response.data);
            alert('User registered successfully');
            onLogin();  // Llama a onLogin después del registro exitoso
            navigate('/home');  // Redirige al home después del registro
        })
        .catch(error => {
            console.error(error);
            alert('Error registering user');
        });
    };

    return (
        <div className="register-container">
            <div className="register-box">
            <img src="./images/logoOfficeHub.png" alt="Logo" style={{ height: '70px' }} />
                <h2 className="mb-4">Registro</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="firstName"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="lastName"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
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
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
                <div className="mt-3">
                    <button onClick={() => navigate('/login')} className="btn btn-link">Already have an account? Login here</button>
                </div>
            </div>
        </div>
    );
};

export default Register;
