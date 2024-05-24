import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext';
import '../../styles/Navbar.css';

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const token = localStorage.getItem('jwt-token'); 

    const handleLogout = () => {
        actions.logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <p className="navbar-logo">PlayPal</p>
            </div>
            <div className="navbar-right">
                <Link to="/" className="navbar-link">Rooms</Link>
                <Link to="/my-rooms" className="navbar-link">My Rooms</Link>
                <Link to="/games" className="navbar-link">Games</Link>
                {token ? (
                    
                    <>
                        <Link to="/profile" className="navbar-link">Profile</Link>
                        <button onClick={handleLogout} className="navbar-button">Logout</button>
                    </>
                ) : (
                    
                    <>
                        <Link to="/login" className="navbar-link">Login</Link>
                        <Link to="/signup" className="navbar-button">Create account</Link>
                    </>
                )}
            </div>
        </nav>
    );
};
