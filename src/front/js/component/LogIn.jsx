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
            <div className='col-md-12 col-lg-5 d-flex justify-content-center align-items-start'>
                <div className='border border-black rounded-3 mx-auto my-5 p-3 w-75'>
                    <h1 className='text-center my-3'>Log In</h1>
                    <form onSubmit={handlerLogin}>
                        <div className='col-md my-3'>
                            <label className='my-2'>Email</label>
                            <input
                                name='email'
                                value={login.email}
                                onChange={handlerChangeLogin}
                                type="text"
                                placeholder='Ingrese email'
                                className="form-control" 
                            />
                        </div>

                        <div className='col-md my-3'>
                            <label className='my-2'>Password</label>
                            <input
                                name='password'
                                value={login.password}
                                onChange={handlerChangeLogin}
                                type='password'
                                placeholder='Ingrese password'
                                className="form-control" 
                            />
                        </div>

                        <div className='col-md' style={{marginTop: '80px'}}>
                            <button className='btn btn-primary w-100' onClick={handlerLogin}>Login In</button>
                        </div>
                        <div className='col-md my-3 text-center'>
                            <a onClick={handlerLogin}>Don't have an account yet? click here to register.</a>
                        </div>
                        
                    </form>
                </div>
            </div>
            <div className='col-lg-7 d-md-none d-lg-block d-flex justify-content-center align-items-center'>
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
