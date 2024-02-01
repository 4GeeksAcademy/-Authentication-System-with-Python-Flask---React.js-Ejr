import React, { useState, useContext } from 'react';
import { Context } from "../store/appContext";

const SignUp = () => {
  const { actions, store } = useContext(Context); // Agrega store al contexto

  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Llama a la acción del contexto para crear una cuenta
      await actions.createAccount(email, nombre, password);

      // Limpiar inputs
      setEmail('');
      setNombre('');
      setPassword('');
      setRepeatPassword('');

      // Accede al mensaje del estado global y muestra el mensaje si existe
      if (store.message) {
        console.log("Mensaje del estado global:", store.message);
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  return (
    <div className='CrearCuenta m-5'>
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

      {store.message && <p className='error'>{store.message}</p>}

      <div className='link'>
        <a>Ya tienes una cuenta? <a className='linkIngresar' href="/login">Ingresa Aquí</a> </a>
      </div>
    </div>
  );
};

export default SignUp;

