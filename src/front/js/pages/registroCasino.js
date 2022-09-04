import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';


function RegistroCasino() {

    const { store, actions } = useContext(Context);
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const registroCasino = (event) => {
        event.preventDefault();
        actions.registroCasino(nombre, telefono, direccion, email, password);
        navigate('/loginCasino');
    };


    return (
        <div className='container mt-5 border border-5 border-success mt-5 mb-5 shadow-lg p-3 mb-5 bg-white rounded'>
            <h1 className='text-success'>Registro de casino</h1>
            <form onSubmit={registroCasino} className='row g-3 needs-validation'>
            <div className='form-group col-md-5 mt-5'>
                    <input
                        value={nombre}
                        type='nombre'
                        className='form-control'
                        placeholder='Nombre del casino'
                        onChange={event => setNombre(event.target.value)}
                        required
                    />
                </div>
                <div className='form-group col-md-5 mt-5'>
                    <input
                        value={telefono}
                        type='telefono'
                        className='form-control'
                        placeholder='Teléfono de contacto del casino'
                        onChange={event => setTelefono(event.target.value)}
                        required
                    />
                </div>
                <div className='form-group col-md-5 mt-5'>
                    <input
                        value={direccion}
                        type='direccion'
                        className='form-control'
                        placeholder='Dirección de casino'
                        onChange={event => setDireccion(event.target.value)}
                        required
                    />
                </div>
                <div className='form-group col-md-5 mt-5'>
                    <input
                        value={email}
                        type='email'
                        className='form-control'
                        placeholder='Email de contacto del casino'
                        onChange={event => setEmail(event.target.value)}
                        required
                    />
                </div>
                <div className='form-group col-md-5 mt-5'>
                    <input
                        value={password}
                        type='password'
                        className='form-control'
                        placeholder='Contraseña'
                        onChange={event => setPassword(event.target.value)}
                        required
                    />
                </div>
                <div className='mt-5 mb-3'>
                    <button type='submit' className=' btn btn-success'>
                        Registrarse
                    </button>
                </div>
            </form>
        </div>
    );
}

export default RegistroCasino