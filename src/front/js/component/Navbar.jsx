import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';
import '../../styles/Navbar.css';

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const token = localStorage.getItem('jwt-token'); // Verificar la existencia del token

    const handleLogout = () => {
        actions.logout();
        navigate('/'); // Redirigir al usuario a la página de inicio después de cerrar sesión
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="navbar-logo">PlayPal</Link>
            </div>
            <div className="navbar-right">
                <Link to="/rooms" className="navbar-link">Rooms</Link>
                <Link to="/games" className="navbar-link">Games</Link>
                {token ? (
                    // Renderizar el componente de perfil y el botón de logout cuando el usuario está loggeado
                    <>
                        <Link to="/profile" className="navbar-link">Profile</Link>
                        <button onClick={handleLogout} className="navbar-button">Logout</button>
                    </>
                ) : (
                    // Renderizar los enlaces de login y create account cuando el usuario no está loggeado
                    <>
                        <Link to="/login" className="navbar-link">Login</Link>
                        <Link to="/signup" className="navbar-button">Create account</Link>
                    </>
                )}
            </div>
        </nav>
    );
};
