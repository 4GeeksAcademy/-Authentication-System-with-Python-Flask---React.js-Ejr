import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';


function RegistroEmpresa() {

    const { store, actions } = useContext(Context);
    const [nombre, setNombre] = useState('');
    const [telefono, setTelefono] = useState('');
    const [direccion, setDireccion] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const registroEmpresa = (event) => {
        event.preventDefault();
        actions.registroEmpresa(nombre, telefono, direccion, email, password);
        navigate('/loginEmpresa');
    };


    return (
        <div className='container mt-5 border border-5 border-success mt-5 mb-5 shadow-lg p-3 mb-5 bg-white rounded'>
            <h1 className='text-success'>Registro de empresa</h1>
            <form onSubmit={registroEmpresa} className='row g-3 needs-validation'>
            <div className='form-group col-md-5 mt-5'>
                    <input
                        value={nombre}
                        type='nombre'
                        className='form-control'
                        placeholder='Nombre empresa'
                        onChange={event => setNombre(event.target.value)}
                        required
                    />
                </div>
                <div className='form-group col-md-5 mt-5'>
                    <input
                        value={telefono}
                        type='telefono'
                        className='form-control'
                        placeholder='Teléfono'
                        onChange={event => setTelefono(event.target.value)}
                        required
                    />
                </div>
                <div className='form-group col-md-5 mt-5'>
                    <input
                        value={direccion}
                        type='direccion'
                        className='form-control'
                        placeholder='Dirección de empresa'
                        onChange={event => setDireccion(event.target.value)}
                        required
                    />
                </div>
                <div className='form-group col-md-5 mt-5'>
                    <input
                        value={email}
                        type='email'
                        className='form-control'
                        placeholder='Email'
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

export default RegistroEmpresa;