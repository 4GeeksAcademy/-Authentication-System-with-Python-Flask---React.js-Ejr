// src/component/ResetPassword.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import '../../styles/ResetPasswordRequest.css';  // Ajusta la ruta según la ubicación real del archivo

const ResetPassword = () => {
  const location = useLocation();
	//almacenamos en variable queryParams la busqueda realizada que se encuentra en el url
	const queryParams = new URLSearchParams(location.search);
	//extraemos el token del queryPArams
	const token = queryParams.get('token');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password1 !== password2) {
      setMessage('Las contraseñas no coinciden.');
      return;
    }

    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/resetpassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ password: password1 }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Contraseña restablecida con éxito.');
      } else {
        setMessage(data.message || 'Error al restablecer la contraseña.');
      }
    } catch (error) {
      setMessage('Error en la solicitud.');
    }
  };

  return (
    <div>
      <h1>Restablecer Contraseña</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nueva Contraseña:
          <input
            type="password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            required
          />
        </label>
        <label>
          Confirmar Contraseña:
          <input
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
        </label>
        <button type="submit">Restablecer Contraseña</button>
      </form>
      {message &&<div>
        <p>{message}</p>
        <button className='btn' onClick={()=>navigate('/login')}>
          Login
        </button>
        </div>}
    </div>
  );
};

export default ResetPassword;
