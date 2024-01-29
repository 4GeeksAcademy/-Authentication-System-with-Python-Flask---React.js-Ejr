import React, { useState } from 'react';

const Ingresar = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Limpiar el error si no hay problema
    setError(null);

    try {
      const response = await fetch('https://super-duper-yodel-g4qwxg67qv44fv7jj-3001.app.github.dev/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const responseData = await response.json();
        if (responseData.error) {
          setError(responseData.error);
        } else {
          setError('Error en la solicitud al servidor');
        }
        return;
      }

      // Éxito en el inicio de sesión
      const data = await response.json();
      console.log(data);

    } catch (error) {
      console.error('Error al enviar los datos:', error);
      setError('Algunos datos no coinciden. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className='CrearCuenta'>
      <h1 className='mb-3'>Ingresar</h1>
      <a>Bienvenido de nuevo! Ingresa tus datos y vuelve a disfrutar de tus películas y series </a>
      <form onSubmit={handleSubmit}>

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
        
        <button type="submit" className="btn btnCrearCuenta"> Ingresar </button>
      </form>

      {error && <p className='error'> {error}</p>}
      
      <div className='link'>
        <a>Aun no tienes una cuenta? <a className='linkIngresar' href="/CrearCuenta">Registrate</a> </a>
      </div>
    </div>
  );
};

export default Ingresar;
