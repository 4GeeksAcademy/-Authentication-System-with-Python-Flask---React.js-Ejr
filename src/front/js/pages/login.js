import React, { useState } from 'react';
import '../../styles/login.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await login(username, password);
    if (result) {
      console.log('Inicio de sesión exitoso:', result);

    } else {
      console.error('Inicio de sesión fallido');

    }
  };

  console.log('Username:', username, 'Password:', password);


return (
  <form className="login-container" onSubmit={handleSubmit}>
    <h4 className='iniciosesion'>Iniciar Sesión</h4>
    <div className="username">
      <label>Nombre Usuario:</label>
      <input
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

export default LoginPage;
