import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext'

export const TeacherNavbar = () => {
    const { store, actions } = useContext(Context)
    const navigate = useNavigate()
    function handleHomeView() {
        localStorage.removeItem('jwt-token')
        navigate('/SignOut')
    }

    console.log(store.user.Access_to_Teacher, store.user)
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
                    : <nav className="navbar navbar-light bg-light">
                        <div className="container-fluid">
                            <a className="navbar-brand">Atlas Learning</a>
                            <div className="navbar-brand">
                                {
                                    (store.user == '')
                                        ? <p className="text-center">Loading...</p>
                                        : store.user.Access_to_Teacher.map((item, index) => (
                                            <span key={index}>{item.name}</span>
                                        ))
                                }
                            </div>
                            <button onClick={handleHomeView} className="btn btn-outline-danger m-1">Sign Out</button>
                        </div>
                    </nav>
            }
        </div>
    )
}
