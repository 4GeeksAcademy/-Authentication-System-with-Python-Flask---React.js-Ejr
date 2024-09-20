import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de importar Bootstrap
import "../../styles/navbar.css";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate(); // Usar useNavigate para redirigir
    const [open, setOpen] = useState(false); // Estado para manejar la apertura del menú

    const handleLogout = () => {
        actions.logout();
        setOpen(false); // Ocultar el menú
        navigate("/logoutOk"); // Redirigir a la página de despedida
    };

    const toggleMenu = () => {
        setOpen(prevState => !prevState); // Cambiar el estado del menú
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link to="/" className="navbar-brand">
                        <h1 className="text-light">Bienvenido</h1>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {/* Solo mostrar el botón de menú si el usuario está autenticado */}
                    {store.auth === true && (
                        <button 
                            onClick={toggleMenu} 
                            className="btn btn-light ms-2"
                        >
                            Menu
                        </button>
                    )}
                    <div className={`collapse navbar-collapse ${open ? "show" : ""}`} id="navbarNav">
                        <ul className="navbar-nav ms-auto d-flex align-items-center">
                            {/* El botón de logout ahora está en el menú desplegable */}
                        </ul>
                    </div>
                </div>
            </nav>
            <div className={`menu ${open ? "open" : "closed"}`}>
                {open && (
                    <>
                        <button
                            aria-label="Close"
                            className="close-button"
                            onClick={toggleMenu}
                        >
                            &times;
                        </button>
                        <div className="menu-container">
                            <Link to="/" className="menu-item">Register new User</Link>
                            <Link to="/contact" className="menu-item">Add view</Link>
                            <Link to="/services" className="menu-item">Add view</Link>
                            {/* Botón de logout dentro del menú */}
                            <button onClick={handleLogout} className="menu-item btn btn-danger">Logout</button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
};
