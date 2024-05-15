import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Context } from '../store/appContext';

import { FaCircleArrowLeft } from "react-icons/fa6";

export const LogIn = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate()
    const [selectedRole, setSelectedRole] = useState('')
    const [active, setActive] = useState(false)
    const [counter, setCounter] = useState(7)
    const [redirectPath, setRedirectPath] = useState('')
    const [login, setLogin] = useState({
        "email": '',
        "password": ''
    });

    function handlerChangeLogin(eve) {
        eve.preventDefault();
        const { name, value } = eve.target;
        if (name === 'isPeople') {
            setSelectedRole(value)
            setActive(true)
        } else {
            setLogin(prev => ({
                ...prev,
                [name]: value
            }));
        }
    }

    async function handlerLogin(e) {
        e.preventDefault();
        if (login.email !== '' && login.password !== '') {
            await actions.loginIn(login, selectedRole);
            if (localStorage.getItem('jwt-token')) {
                setCounter(0)
            }
        } else {
            alert('Ingrese todo los campos')
        }
    }

    function handlerGoToRegister() {
        navigate('/FormUser')
    }

    function handlerChangeActive() {
        setActive(false)
    }

    function handlerHome() {
        navigate('/')
    }


    useEffect(() => {
        if (redirectPath !== '') {
            navigate(redirectPath)
        }
    }, [navigate, redirectPath])

    useEffect(() => {
        const interval = setInterval(() => {
            setCounter(prevCounter => {
                if (prevCounter + 1 === 4) {
                    setRedirectPath(`/${selectedRole}View`)
                    clearInterval(interval)
                }
                return prevCounter + 1;
            });
        }, 500);

        return () => clearInterval(interval)
    }, [setRedirectPath, selectedRole])

    return (
        <div className=' position-relative'>
            <div className=' d-flex justify-content-center position-absolute top-00 start-50 translate-middle-x'>
                <div className={`text-center w-100 ${(counter >= 1 && counter <= 3) ? "alert alert-success" : "d-none"}`} >
                    {"Log In Successfully"}
                </div>

            </div>
            {/* <div className={`d-flex justify-content-center position-absolute top-00 start-50 translate-middle-x ${ (store.error == '') ? 'd-none' : 'd-block'}`}>
                    <div className="text-center w-100 alert alert-danger">
                        {"Se ha presentado un error al Iniciar Session"}
                    </div>

                </div> */}
            <div className='row d-flex flex-row'>
                <div className='col-md-12 col-lg-5 d-flex justify-content-center align-items-start'>
                    <div className='border border-black rounded-3 mx-auto my-5 p-3 w-75'>
                        <div className="d-flex justify-content-center align-items-center">
                            <div className='d-flex justify-content-center align-items-center mx-2 fs-4' onClick={handlerHome} style={{ cursor: "pointer" }}>
                                <FaCircleArrowLeft />
                            </div>
                            <div className='d-flex justify-content-center align-items-center'>
                                <h1>Log In</h1>
                            </div>
                        </div>
                        <form onSubmit={handlerLogin}>


                            {
                                (active)
                                    ? <div>
                                        <div className='col-md my-3'>
                                            <label className='my-2'>Email {store.error}</label>
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

                                        <div className='col-md' style={{ marginTop: '80px' }}>
                                            <button className='btn btn-primary w-100' onClick={handlerLogin}>Login In</button>
                                        </div>
                                        <div className='col-md my-3 text-center'>
                                            <p className='text-decoration-underline' onClick={handlerGoToRegister} style={{ cursor: "pointer" }}>Don't have an account yet? click here to register.</p>
                                        </div>
                                        <div className='col-md my-3 text-center'>
                                            <p className='text-decoration-underline' onClick={handlerChangeActive} style={{ cursor: "pointer" }}>Do you want to change roles?</p>
                                        </div>
                                    </div>
                                    : <div className='d-flex justify-content-center my-5'>
                                        <div className='col-md-8'>
                                            <div className='text-center'>
                                               <label className="form-label fw-bold">Role</label> 
                                            </div>
                                        
                                            <div className="input-group has-validation">
                                                <select className="form-select" name='isPeople' onChange={handlerChangeLogin} value={selectedRole} required>
                                                    <option value="">--Choose--</option>
                                                    <option value='teacher'>Teacher</option>
                                                    <option value='user'>Student</option>
                                                    <option value='manager'>Manager</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                            }

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
        </div>

    );
};
