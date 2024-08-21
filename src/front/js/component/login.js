import React, { useState } from 'react';
import './login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    
    console.log('Username:', username, 'Password:', password);
  };

  return (
    <form className="login-container" onSubmit={handleSubmit}>
      <h4 className='iniciosesion'>Iniciar Sesión</h4>
      <div className="username">
        <label>Nombre Usuario:</label>
        <input
        className="inputname"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className='input-username'
        />
      </div>
      <div className="password">
        <label className='contraseñalabel'>Contraseña:</label>
        <input
        className="inputpassword"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className='input-password'
        />
      </div>
      <button type="submit" className="loginbutton">Login</button>
      <div>
        <p className='contraseña'>
          ¿Olvidaste tu contraseña?
        </p>
      </div>
    </form>
  );
};

export default Login;
