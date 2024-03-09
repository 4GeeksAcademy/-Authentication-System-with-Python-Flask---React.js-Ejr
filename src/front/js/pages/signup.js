import React, { useState, useContext } from 'react';
import { Context } from '../store/appContext'; // Importa el contexto Flux
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [location, setLocation] = useState('');
    
    const { actions } = useContext(Context); // Obtén las acciones del contexto Flux
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Llama a la acción signup para registrar al usuario
        const success = await actions.signup(email, password, firstName, lastName, phone, location);

        // Si el registro es exitoso, redirige al usuario a la página de inicio de sesión
        if (success) {
            navigate('/login');
        }
    };

    const handleLogin = () => {
        navigate('/login');
    };


  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1>Sign-up</h1>
       
        <div className='mb-3'>
          <label htmlFor='exampleInputEmail1' className='form-label'>Email address</label>
          <input
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            className={`form-control ${email === '' ? 'error' : ''}`}
            id='email'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='exampleInputPassword1' className='form-label'>Password</label>
          <input
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            className={`form-control ${ email === '' ? 'error' : ''}`}
            id='password'
          />
        </div>
        <div className='mb-3 '>
          <label htmlFor='exampleInputEmail1' className='form-label'>First Name</label>
          <input
            type='text'
            onChange={(e) => setFirstName(e.target.value)}
            className={`form-control ${ email === '' ? 'error' : ''}`}
            id='firstName'
          />
        </div>
        <div className='mb-3 '>
          <label htmlFor='exampleInputEmail1' className='form-label'>Last Name</label>
          <input
            type='text'
            onChange={(e) => setLastName(e.target.value)}
            className={`form-control ${email === '' ? 'error' : ''}`}
            id='lastName'
          />
        </div>
        <div className='mb-3 '>
          <label htmlFor='exampleInputEmail1' className='form-label'>Phone</label>
          <input
            type='text'
            onChange={(e) => setPhone(e.target.value)}
            className={`form-control ${ email === '' ? 'error' : ''}`}
            id='Phone'
          />
        </div>
        <div className='mb-3 '>
          <label htmlFor='exampleInputEmail1' className='form-label'>Location</label>
          <input
            type='text'
            onChange={(e) => setLocation(e.target.value)}
            className={`form-control ${ email === '' ? 'error' : ''}`}
            id='location'
          />
        </div>
        <button
          style={{ cursor: 'pointer' }}
          type='submit'
          className='btn btn-success'
        >Create account</button>

        <div className='mb-3 pt-5  mx-auto'>
          <h5
            className='text-center'
            style={{ cursor: 'pointer' }}
            onClick={handleLogin}
          >If you already have an account go to Login
          </h5>
        </div>
      </div>
    </form>
  )
};

export default Signup;
