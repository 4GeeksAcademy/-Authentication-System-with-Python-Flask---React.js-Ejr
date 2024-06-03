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

    function handleHome(){
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
                        <nav className="navbar navbar-light bg-white">
                            <div className="container-fluid">
                                <div className='col-3'>
                                    {/* <div className="container">
                                        <h2 className="text-center my-4">Upload Media</h2>
                                        <div className="row justify-content-center">
                                            <div className="col-md-6">
                                                <input type="file" className="form-control" onChange={uploadMedia} />
                                            </div>
                                        </div>
                                        <div className="row justify-content-center my-4">
                                            <div className="col-md-8">
                                                {store.loading ? (
                                                    <div className="text-center">
                                                        <div className="spinner-border" role="status">
                                                            <span className="sr-only">Loading...</span>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    store.media && (
                                                        store.mediaType === 'image' ? (
                                                            <img src={store.media} className="img-fluid" alt="Uploaded" />
                                                        ) : (
                                                            <video controls className="img-fluid">
                                                                <source src={store.media} type="video/mp4" />
                                                                Your browser does not support the video tag.
                                                            </video>
                                                        )
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div> */}
                                    {/* <a className="navbar-brand">Atlas Learning</a> */}
                                    <img src="https://res.cloudinary.com/dfoegvmld/image/upload/v1717377021/i6uvyydr1sapaurgp3r5.png" 
                                    alt="logo_alta_elearning" className='w-75' onClick={handleHome} style={{cursor: 'pointer'}}/>
                                </div>
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
                                    <button className='btn btn-outline-success m-1 mx-2'>Panel</button>
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
                                <button className="btn btn-outline-danger m-1 mx-2" onClick={handleHomeView}>
                                    Sign Out
                                </button>
                                <div className='border border-warning rounded-pill px-2 py-1 fs-6'>
                                    <span className='text-warning'>{store.currentRole}</span>
                                </div>
                            </div>
                        </nav>
                    )}
                </div>
            ) : (
                <nav className="navbar navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand">Atlas Learning</a>
                        <div className="d-flex">
                            <Link to='/FormUser'>
                                <button className='btn btn-outline-success m-1'>Sign Up</button>
                            </Link>
                            <Link to='/logIn'>
                                <button className="btn btn-outline-success m-1">Log In</button>
                            </Link>
                            <Link to="/trolley">
                                <button className='btn btn-outline-success m-1'>
                                    <i className="fa-solid fa-cart-shopping fa-fade" style={{ color: "#13ec49" }}></i>
                                </button>
                            </Link>
                        </div>
                    </div>
                </nav>
            )}
        </div>
    );
};
