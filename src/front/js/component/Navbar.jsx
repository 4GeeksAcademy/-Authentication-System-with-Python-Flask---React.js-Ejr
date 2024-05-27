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
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid container-max-width">
                <Link to="/" className="navbar-brand">PlayPal</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">Rooms</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/games" className="nav-link">Games</Link>
                        </li>
                        {token ? (
                            <>
                                <li className="nav-item">
                                    <Link to="/profile" className="nav-link">Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <button onClick={handleLogout} className="btn nav-link">Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link to="/login" className="nav-link">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/signup" className="btn btn-primary nav-link">Create account</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};
