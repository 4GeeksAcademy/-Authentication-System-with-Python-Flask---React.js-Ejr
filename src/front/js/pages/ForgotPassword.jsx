import React, { useState } from 'react';

const ForgotPassword = () => {
  const [inputValue, setInputValue] = useState('');

  function handleRedirect() {
    // Redireccionar a la página anterior
    window.history.back();
  }

  function handleChange(event) {
    setInputValue(event.target.value);
  }

  return (
    <div className='container-password'>
      <div className='content'>
        <div className='title'>¿Has olvidado tu contraseña?</div>
        <div className='subtitle'>Restablecer la contraseña en dos pasos rápidos</div>
        <div className='custom-input'>
          <input
            type="text"
            id="emailOrPhone"
            value={inputValue}
            onChange={handleChange}
          />
          <label htmlFor="emailOrPhone" className={inputValue ? 'input-label has-value' : 'input-label'}>
            Email o teléfono:
          </label>
        </div>
        <button type="button" className='reset-button'>Restablecer la contraseña</button>
        <button type="button" onClick={handleRedirect} className='back-button'>Volver</button>
      </div>
    </div>
  );
};

export default ForgotPassword;
