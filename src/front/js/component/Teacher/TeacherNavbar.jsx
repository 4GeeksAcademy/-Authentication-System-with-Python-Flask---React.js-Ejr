import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../store/appContext'

export const TeacherNavbar = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate()
    function handleHomeView() {
        localStorage.removeItem('jwt-token')
        localStorage.removeItem('userToLogin');
        navigate('/SignOut')
    }

    function handleHome() {
        navigate('/')
    }

    const userToLogin = JSON.parse(localStorage.getItem("userToLogin"))

    return (
        <div>
            {
                (store.spinner)
                    ? <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                        <div className="text-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <p>Loading...</p>
                        </div>
                    </div>
                    : <nav className="navbar navbar-light bg-white">
                        <div className="container-fluid">
                        <div className='col-3'>
                                <img src="https://res.cloudinary.com/dfoegvmld/image/upload/v1717377021/i6uvyydr1sapaurgp3r5.png"
                                    alt="logo_alta_elearning" className='w-75' onClick={handleHome} style={{cursor: 'pointer'}}/>
                            </div>
                            <div className="col d-flex justify-content-end">
                                {
                                    (!store.user)
                                        ? <p className="text-center">Loading...</p>
                                        : (store.user[`access_to_${store.currentRole}`]).map((item, index) => (
                                            <span className='mx-2' key={index}>
                                                {
                                                    (item.email === userToLogin.email)
                                                        ? <span>Welcome,
                                                            <strong> {item.name.toUpperCase()}</strong>
                                                            <strong> {item.lastName.toUpperCase()}</strong>
                                                        </span>
                                                        : <div></div>
                                                }
                                            </span>
                                        ))
                                }
                            </div>
                            <button className="btn btn-outline-danger m-1 mx-2" onClick={handleHomeView}>
                                Sign Out
                            </button>
                            <div className='border border-warning rounded-pill px-3 py-1'>
                                <span className='text-warning'>{store.currentRole}</span>
                            </div>
                        </div>

                    </nav>
            }
        </div>
    )
}
