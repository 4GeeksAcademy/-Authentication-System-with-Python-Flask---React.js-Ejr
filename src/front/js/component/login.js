import React, { useState } from 'react';
import './login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí iría la lógica de autenticación
    console.log('Username:', username, 'Password:', password);
  };

  return (
    <form className="login-container" onSubmit={handleSubmit}>
      <h4>Iniciar Sesión</h4>
      <div className="username">
        <label>Nombre Usuario:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="password">
        <label>Contraseña:</label>
        <input
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
