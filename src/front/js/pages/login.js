import React, { useState, useContext } from 'react';
import '../../styles/login.css';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const credentials = { email: email, password: password };
        const result = await actions.login(credentials);
        if (result.token) {
            console.log("Inicio de sesión correcto");
            navigate("/");
        } else {
            console.log("Error al iniciar sesión");
        }
    };

    const handleForgotPassword = () => {
        // Aquí podrías redirigir a una página de restablecimiento de contraseña
        navigate('/reset-password'); // Suponiendo que tengas una ruta configurada para reset-password
    };

    return (
        <div className='centrar'>
            <form className="login-container" onSubmit={handleLogin}>
                <h4>Iniciar Sesión</h4>
                <div className="username">
                    <label>Correo electrónico:</label>
                    <input
                        className="inputname"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="password">
                    <label>Contraseña:</label>
                    <input
                        className="inputpassword"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="loginbutton">Login</button>
                <div>
                    <p onClick={handleForgotPassword} className="forgot-password-link">
                        ¿Olvidaste tu contraseña?
                    </p>
                </div>
            </form>
        </div>
    );
};

