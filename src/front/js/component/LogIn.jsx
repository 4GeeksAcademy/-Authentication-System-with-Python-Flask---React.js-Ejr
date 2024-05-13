import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Context } from '../store/appContext';

export const LogIn = () => {
    const { store, actions } = useContext(Context);
    const [login, setLogin] = useState({
        "email": '',
        "password": ''
    });

    function handlerChangeLogin(eve) {
        eve.preventDefault();
        const { name, value } = eve.target;

        setLogin(prev => ({
            ...prev,
            [name]: value
        }));
    }

    function handlerLogin(eve) {
        eve.preventDefault();
        if (login.email !== '' && login.password !== '') {
            /* actions.loginIn(login) */
        }
    }

    return (
        <div className='row d-flex flex-row'>
            <div className='col-5'>
                <h1>Log In</h1>
                <form onSubmit={handlerLogin}>
                    <input
                        name='email'
                        value={login.email}
                        onChange={handlerChangeLogin}
                        type="text"
                        placeholder='Ingrese email'
                    />
                    <input
                        name='password'
                        value={login.password}
                        onChange={handlerChangeLogin}
                        type='password'
                        placeholder='Ingrese password'
                    />
                    <button onClick={handlerLogin}>Login In</button>
                </form>
            </div>
            <div className='col-7 d-flex justify-content-center align-items-center'>
                <img
                    src="https://www.ceac.es/sites/default/files/2020-08/estudiar-online-ceac.jpg.webp"
                    alt="imgLogInEducation"
                    className='img-fluid'
                    style={{ height: "100vh", width: 'auto' }}
                />
            </div>
        </div>
    );
};
