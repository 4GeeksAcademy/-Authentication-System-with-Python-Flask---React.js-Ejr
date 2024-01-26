import React, { useState } from 'react';

const CrearCuenta = () => {
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar si las contraseñas coinciden
    if (password !== repeatPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    // Limpiar el error si no hay problema
    setError(null);

    try {
      const response = await fetch('URL_DEL_BACKEND', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          nombre,
          password,
        }),
      });

      if (!response.ok) {
        const responseData = await response.json();
        if (response.status === 409) { // 409: Conflict, ya existe el recurso
          setError('Este correo electrónico ya está registrado. Por favor, utiliza otro.');
        } else if (responseData.error) {
          setError(responseData.error);
        } else {
          setError('Error en la solicitud al servidor');
        }
        return;
      }

      // Éxito en la creación de la cuenta
      const data = await response.json();
      console.log(data);

    } catch (error) {
      console.error('Error al enviar los datos:', error);
      setError('Error al enviar los datos. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className='CrearCuenta'>
      <h1 className='mb-3'>Crear Cuenta</h1>
      <a>Bienvenido! Ingresa tus datos y comienza a disfrutar de increíbles películas y series </a>
      <form onSubmit={handleSubmit}>

        <div id="is-relative">
          <label>
            <span id="icon">
              <i className="fa-regular fa-user"></i>
            </span>
            <input className="form-control inputCuenta" placeholder="Nombre" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          </label>
        </div>

        <br />

        <div id="is-relative">
          <label>
            <span id="icon">
              <i className="fa-regular fa-envelope"></i>
            </span>
            <input className="form-control inputCuenta" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
        </div>

        <br />

        <div id="is-relative">
          <label>
            <span id="icon">
              <i className="fa-regular fa-eye"></i>
            </span>
            <input className="form-control inputCuenta" placeholder="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
        </div>

        <br />

        <div id="is-relative">
          <label>
            <span id="icon">
              <i className="fa-regular fa-eye"></i>
            </span>
            <input className="form-control inputCuenta" placeholder="Repetir contraseña" type="password" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)} />
          </label>
        </div>

        <br />

        <button type="submit" className="btn btnCrearCuenta"> Crear Cuenta </button>
      </form>

      {error && <p className='error'>{error}</p>}

      <div className='link'>
        <a>Ya tienes una cuenta? <a className='linkIngresar' href="/ingresar">Ingresa Aquí</a> </a>
      </div>
    </div>
  );
};

export default CrearCuenta;

