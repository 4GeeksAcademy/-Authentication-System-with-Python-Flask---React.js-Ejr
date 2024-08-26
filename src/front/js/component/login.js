import React, { useState, useContext } from 'react';
import './login.css';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate= useNavigate()
    const handleLogin = async (e) => {
      e.preventDefault()
      const credentials = { email: email, password: password };
      const result = await actions.login(credentials);
      if (result.token) {
          console.log("Inicio de sesión correcto");
          navigate("/")
      } else {
          console.log("Error al iniciar sesión");
          
      }
    }
  return (
    <form className="login-container" onSubmit={e=>handleLogin(e)}>
      <h4>Iniciar Sesión</h4>
      <div className="username">
        <label>Nombre Usuario:</label>
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
        <p>
          ¿Olvidaste tu contraseña?
        </p>
      </div>
    </form>
  );
};

export default Login;
