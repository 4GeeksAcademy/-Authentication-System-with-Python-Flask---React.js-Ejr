import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Navbar.css';

export const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/" className="navbar-logo">PlayPal</Link>
            </div>
            
                
            
            <div className="navbar-right">
                <Link to="/rooms" className="navbar-link">Rooms</Link>
                <Link to="/games" className="navbar-link">Games</Link>
                <Link to="/login" className="navbar-link">Login</Link>
                <Link to="/signup" className="navbar-button">Create account</Link>
            </div>
        </nav>
    );
};
