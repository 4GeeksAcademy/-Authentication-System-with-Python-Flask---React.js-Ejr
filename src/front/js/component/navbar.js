import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoGame from "/src/front/img/logoSinFondo.png";
import podio from "/src/front/img/podio.png";
import ubic from "/src/front/img/ubic.png";
import diamante from "/src/front/img/diamante.png";
import { useContext } from "react";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ username: null, photo: null });
    const { store, actions } = useContext(Context);

    const handleLogout = () => {
        localStorage.removeItem("jwt-token");
        setUser({ username: null, photo: null });
        navigate("/");
    };

    useEffect(() => {
        const token = localStorage.getItem("jwt-token");
        if (token) {
            const fetchUserData = async () => {
                try {
                    const response = await fetch(`${process.env.BACKEND_URL}/api/current-user`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    const data = await response.json();
                    if (data.username) {
                        setUser({ username: data.username, photo: data.photo });
                    } else {
                        setUser({ username: null, photo: null });
                    }
                } catch (error) {
                    console.error(error);
                    setUser({ username: null, photo: null });
                }
            };
            fetchUserData();
        }
    }, [localStorage.getItem("jwt-token"), store.infoUpdated]);

    return (
        <nav className="navbar-custom navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid row">
                <div className="logo-name-navbar col-1">
                    <Link to="/">
                        <img src={logoGame} alt="logo" className="imageLogo" />
                    </Link>
                </div>
                <div className="boton-toggler col-auto ms-auto" style={{ marginRight: '5%' }}>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"><i className="fa-solid fa-bars"></i></span>
                    </button>
                </div>
                <div className="collapse navbar-collapse col-10" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/treasures" className="navbar-brand h1" title="TREASURES">
                                <div className="div-bar"><div className="div-icono mt-2"><img src={diamante} alt="logo" className="icon1 me-2" /></div><div className="div-texto ms-2 mt-2 me-4"><span className="link-text">Treasures List</span></div></div>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/hide" className="navbar-brand h1" title="HIDE YOUR TREASURE">
                                <div className="div-bar"><div className="div-icono mt-2"><img src={ubic} alt="logo" className="icon2 me-2" /></div><div className="div-texto ms-2 mt-2 me-4"><span className="link-text">Hide Treasure</span></div></div>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/rankings" className="navbar-brand h1" title="RANKINGS">
                                <div className="div-bar"><div className="div-icono mt-3"><img src={podio} alt="logo" className="icon3 me-2" /></div><div className="div-texto ms-2 mt-3 me-4"><span className="link-text">Rankings</span></div></div>
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        {user.username ? (
                            <li className="nav-item dropdown">
                                <button className="btn btn-link text-light dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                    {user.photo ? <img src={user.photo} alt={user.username} className="user-image me-2" style={{ width: "35px", height: "35px", borderRadius: "50%" }} /> : null}
                                    {user.username}
                                </button>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <li><Link className="dropdown-item" to="/profile">My Profile</Link></li>
                                    <li><button className="dropdown-item logout" onClick={handleLogout}>Logout</button></li>
                                </ul>
                            </li>
                        ) : (
                            <li className="nav-item d-flex align-items-center">
                                <Link to="/register" className="nav-link">
                                    <button className="btn btn-warning boton-navbar">Create your account</button>
                                </Link>
                                <Link to="/login" className="nav-link btn-link text-warning boton-navbar">Login</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};
