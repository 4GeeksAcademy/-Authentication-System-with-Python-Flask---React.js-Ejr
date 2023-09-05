import React, { useState } from 'react';
import '../../styles/LoginForm.css';

function LoginForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [remember, setRemember] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRememberChange = (e) => {
    setRemember(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('URL_DEL_SERVIDOR', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      if (response.ok) {
      
        setLoginError('');
        alert('Inicio de sesión exitoso');
      } else {
        setLoginError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      setLoginError('Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo más tarde.');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <div className='Login-container'>
        <form onSubmit={handleSubmit}>
          <div className='input-box'>
            <label htmlFor="username">Nombre de Usuario o Correo Electrónico</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className='input-box'>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className='check-box'>
            <div id='checkboxx'>
              <input
                type="checkbox"
                id="remember"
                name="remember"
                checked={remember}
                onChange={handleRememberChange}
              />
              <label htmlFor="remember">Recordarme</label>
            </div>
            <button className='login-button' type="submit">Iniciar Sesión</button>
          </div>
          <div className='lost-password-container'>
            <a className='lost-password' href="#">¿Olvidaste tu contraseña?</a>
          </div>
          {loginError && <div className="error-message">{loginError}</div>}
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
