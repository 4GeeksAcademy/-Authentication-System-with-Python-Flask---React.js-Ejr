import React, { useContext } from "react";
import { Context } from "../store/appContext"
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import nutriLogo from '../../../../public/images/nutri-logo-icon-b.png'
import '../../styles/navbar.css'
import { Actions } from "@cloudinary/url-gen/index";


export const Navbar = () => {
    let location = useLocation();
    const { actions, store } = useContext(Context)
    let id = 0;
console.log(store.auth, store.currentUser)
    if (location.pathname !== "/login" && location.pathname !== "/register") {

        return (
            <>
                <nav className="navbar-container navbar navbar-expand-lg navbar-light bg-light fixed-top">
                    <div className="container-fluid">
                        <Link to="/">
                            <div className="logo-container">
                                <img src={nutriLogo} />
                                <span translate="no">
                                    Nutri4Well
                                </span>
                            </div>
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <i className="bi bi-list"></i>
                        </button>
                        {store.auth?
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            
                            <ul className="navbar-nav ms-auto mb-lg-0 text-lg-end">
                                <li className="nav-item my-lg-auto nav-text-item">
                                    <Link to="/professionals" className="link">
                                        <button type="button nav-text-btn ">
                                            <i className="bi bi-lungs"></i>
                                            <span className="i-name">Profesionales</span>
                                        </button>
                                    </Link>
                                </li>
                                <li className="nav-item my-lg-auto nav-text-item">
                                    <Link to="/products" className="link">
                                        <button type="button nav-text-btn">
                                            <i className="bi bi-basket2"></i>
                                            <span className="i-name">Productos</span>
                                        </button>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/wishlist/users/1" className="link">
                                        <button type="button nav-text-btn">
                                            <i className="bi bi-suit-heart-fill"></i>
                                            <span className="i-name">Favoritos</span>
                                        </button>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/cart" className="link">
                                        <button type="button">
                                            <i className="bi bi-cart4"></i>
                                            <span className="i-name">Carrito</span>
                                        </button>
                                    </Link>
                                </li>
                                <li className="nav-item dropdown user-list">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <button type="button">
                                            <i className="bi bi-person"></i>
                                            <span className="i-name">Usuario</span>
                                        </button>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end dropdown-user-menu" aria-labelledby="navbarDropdown">
                                        <Link to={`/user/${id}`} className="link">
                                            <li><button type="button">Perfil</button></li>
                                        </Link>
                                        <Link to={`/agenda/${id}`} className="link">
                                            <li><button type="button">Agendas</button></li>
                                        </Link>
                                        <Link to="/login" className="link">
                                            <li><button type="button" onClick={() => actions.logout()}>Cerrar Sesión</button></li>
                                        </Link>
                                    </ul>
                                </li>
                                <li className="nav-item dropdown user-list">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <button type="button notification-btn">
                                            <i className="bi bi-bell">
                                                <span className="favs-counter badge me-1 p-0 bg-secondary rounded-circle text-light">0</span>
                                            </i>
                                            <span className="i-name">Notificaciones</span>
                                        </button>
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end dropdown-user-menu" aria-labelledby="navbarDropdown">
                                        <li className="fav-li-item link d-flex">
                                            <button type="button">Notificación 1</button>
                                            <button /* onClick={() => actions.deleteFavorite(item.name)} */ className="dropdown-item text-center" type="button">
                                                <i className="bi bi-trash3 fs-5"></i>
                                            </button>
                                        </li>
                                        {/* {store.favorites && store.favorites.length > 0 && store.favorites.map((item, index) => (
                                            <li key={index} className="fav-li-item">
                                                <a className="dropdown-item" href="#">
                                                    ({item.type}) {item.name}
                                                </a>
                                                <button onClick={() => actions.deleteFavorite(item.name)} className="dropdown-item text-center" type="button">
                                                    <i className="bi bi-trash3"></i>
                                                    </button>
                                                    </li>
                                                    ))} */}
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        :
                        <div className="links-container d-flex fw-bold">
                         <Link className="home-to-register mx-5" to='register'>Registrarme</Link>
                         <Link className="home-to-login" to='login'>Iniciar sesión</Link>
                        </div> 
                        }
                    </div>
                </nav>
            </>
        );
    } else {

        return null;
    }
};
