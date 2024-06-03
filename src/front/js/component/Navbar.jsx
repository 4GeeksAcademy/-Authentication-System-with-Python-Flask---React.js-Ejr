import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    function handleHomeView() {
        localStorage.removeItem('jwt-token');
        navigate('/SignOut');
    }

    function handleGoToTrolley() {
        navigate('/Trolley');
    }

    function handleHome() {
        navigate('/')
    }

    const uploadMedia = async (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            await actions.uploadCloudinaryMedia(files);
            console.log("Uploaded media:", store.media);
        }
    }

    const userToLogin = JSON.parse(localStorage.getItem("userToLogin"));
    const accessToAddCourse = Array.isArray(store.courseFavorite) ? store.courseFavorite : [];

    return (
        <div>
            {localStorage.getItem('jwt-token') ? (
                <div>
                    {store.spinner ? (
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                            <div className="text-center">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                <p>Loading...</p>
                            </div>
                        </div>
                    ) : (
                        <nav className="navbar navbar-light bg-white navbar-expand-lg">
                            <div className="container-fluid">
                                <div className="col-3">
                                    <img src="https://res.cloudinary.com/dfoegvmld/image/upload/v1717377021/i6uvyydr1sapaurgp3r5.png"
                                        alt="logo_alta_elearning" className='w-50' onClick={handleHome} style={{ cursor: 'pointer' }} />
                                </div>
                                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarContent">
                                    <div className="col d-flex justify-content-end">
                                        {store.user ? (
                                            store.user[`access_to_${store.currentRole}`]?.map((item, index) => (
                                                item.email === userToLogin.email ? (
                                                    <span className='mx-2' key={index}>
                                                        Welcome, <strong>{item.name.toUpperCase()}</strong> <strong>{item.lastName.toUpperCase()}</strong>
                                                    </span>
                                                ) : null
                                            ))
                                        ) : (
                                            <p className="text-center">No hay</p>
                                        )}
                                    </div>
                                    <Link to={`/${store.currentRole}View`}>
                                        <button
                                            type="button"
                                            className="btnFav text-center mx-2 px-3 py-2"
                                        >
                                            Panel
                                        </button>
                                    </Link>
                                    <div className="dropdown">
                                        <button
                                            type="button"
                                            className="btnFav dropdown-toggle text-center mx-2 px-3 py-2"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                            data-bs-auto-close="true"
                                        >
                                            <i className="fa-solid fa-cart-shopping fa-fade" style={{ color: "#165D95" }}></i>
                                            Trolley <span className={`badge text-bg-${accessToAddCourse.length === 0 ? 'secondary' : 'danger'}`}>{accessToAddCourse.length}</span>
                                        </button>
                                        {
                                            accessToAddCourse.length === 0
                                                ? "No hay Course in Trolley cargados"
                                                : (
                                                    <ul className="dropdown-menu">
                                                        {accessToAddCourse.map((trolley, index) => (
                                                            <li key={index}>{trolley.titleCourse} / {trolley.price} / {trolley.date}</li>
                                                        ))}
                                                        <button onClick={handleGoToTrolley}>More</button>
                                                    </ul>
                                                )
                                        }
                                    </div>
                                    <button
                                        type="button"
                                        className="btnFav text-center mx-2 px-3 py-2"
                                        onClick={handleHomeView}
                                    >
                                        Sign Out
                                    </button>
                                    <div className='border border-warning rounded-pill px-2 py-1 fs-6'>
                                        <span className='text-warning'>{store.currentRole}</span>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    )}
                </div>
            ) : (
                <nav className="navbar navbar-light bg-white">
                    <div className="container-fluid">
                        <div className="col-3">
                            <img src="https://res.cloudinary.com/dfoegvmld/image/upload/v1717377021/i6uvyydr1sapaurgp3r5.png"
                                alt="logo_alta_elearning" className='w-50' onClick={handleHome} style={{ cursor: 'pointer' }} />
                        </div>
                        <div className="d-flex">
                            <Link to='/FormUser'>
                                <button
                                    type="button"
                                    className="btnFav text-center mx-2 px-3 py-2"
                                >
                                    Sign Up
                                </button>
                            </Link>
                            <Link to='/logIn'>
                                <button
                                    type="button"
                                    className="btnFav text-center mx-2 px-3 py-2"
                                >
                                    Log In
                                </button>
                            </Link>
                            <Link to="/trolley">
                                <button
                                    type="button"
                                    className="btnFav text-center mx-2 px-3 py-2"
                                >
                                    <i className="fa-solid fa-cart-shopping fa-fade" style={{ color: "#165D95" }}></i>
                                </button>
                            </Link>
                        </div>
                    </div>
                </nav>

            )}
        </div>
    );
};
