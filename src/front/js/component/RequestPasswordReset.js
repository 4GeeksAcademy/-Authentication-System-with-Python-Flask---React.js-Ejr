import React, { useState } from 'react';
import '../../styles/ResetPasswordRequest.css';  // Ajusta la ruta según la ubicación real del archivo


const ResetPasswordRequest = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/send-reset-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Correo de restablecimiento enviado con éxito.');
      } else {
        setMessage(data.message || 'Error al enviar el correo.');
      }
    } catch (error) {
      setMessage('Error en la solicitud.');
    }
  };

  return (
    <div className='reset-password-request-container'>
      <h3 className='tittle'>Restablecer Contraseña</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Correo Electrónico:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit">Enviar Correo</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPasswordRequest;
