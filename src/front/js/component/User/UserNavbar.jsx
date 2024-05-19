import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from "../../store/appContext";

export const UserNavbar = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    function handleHomeView() {
        localStorage.removeItem('jwt-token');
        localStorage.removeItem('userToLogin');
        navigate('/SignOut');
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
                : <nav className="navbar navbar-light bg-light">
                    <div className="container-fluid">
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
                        <div className='border border-black rounded-pill px-3 py-1'>
                            {store.currentRole}
                        </div>
                    </div>

                </nav>
        }
    </div>
    );
};
