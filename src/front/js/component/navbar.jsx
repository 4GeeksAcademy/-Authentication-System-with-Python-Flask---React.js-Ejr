import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";
import Searchbar from "./searchbar.jsx";


export const Navbar = () => {
    return (
        <nav className="navbar navbar-light bg-light navbar-shadow py-4">
            <div className="container d-flex justify-content-between align-items-center">
                <Link to="/home" className="custom-link d-flex align-items-center">
                    <span className="navbar-brand mb-0 h1 custom-font">ShareTrips</span>
                </Link>
                <div className="d-flex align-items-center">

                </div>
                <div className="ml-auto d-flex align-items-center">
                    <button className="btn custom-button rounded-pill" data-bs-toggle="modal" data-bs-target="#loginModal">
                        <i className="bi bi-person-circle"></i> Iniciar Sesión
                    </button>
                </div>
            </div>
        </nav>
    );
};
