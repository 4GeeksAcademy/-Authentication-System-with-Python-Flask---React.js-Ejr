import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/navbar.css";
import logo from '../../img/logoSinFondo.png';

export const Navbar = () => {
	//localStorage, almacenar datos en el navegador del usuario de manera persistente, después de que el navegador se cierra o la página se recarga
    // Leer el estado de autenticación y la imagen de perfil desde localStorage
    const identificación = localStorage.getItem('identificación') === 'true'; //Verifica si el usuario está autenticado.
    const usuarioImage = localStorage.getItem('usuarioImage'); //Obtiene la URL de la imagen del perfil del usuario.

    return (
        <nav className="navbar mb-3">
            <Link to="/" className="navbar-brand">
                <img src={logo} alt="Logo Elearning" className="logo"/>
            </Link>
            {identificación ? ( //es true, se muestra el dropdown con la imagen del perfil y las opciones del menú.
                <div className="dropdown">
                    <button
                        className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={usuarioImage} alt="User Profile" className="imgPerfil"/>
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                        <li><Link className="dropdown-item" to="/favorites">Favoritos</Link></li>
                        <li><Link className="dropdown-item" to="/courses">Cursos</Link></li>
                        <li><Link className="dropdown-item" to="/logout">Salir</Link></li>
                    </ul>
                </div>
            ) : ( //Si no está autenticado, se muestran los botones de "Iniciar sesión" y "Registrarse".
                <div className="navbar-buttons">
                    <Link to="/login" className="btn btn-secondary">
                        Iniciar sesión
                    </Link>
                    <Link to="/signup" className="btn btn-secondary">
                        Registrarse
                    </Link>
                </div>
            )}
        </nav>
    );
};


//navbar-brand es una clase específica que se utiliza para identificar el elemento que contiene el logotipo o nombre de la aplicación en una barra de navegación
