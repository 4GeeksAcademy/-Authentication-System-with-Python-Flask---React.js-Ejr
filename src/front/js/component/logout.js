import React from "react";
import { Link, useNavigate } from "react-router-dom";


export const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/landing")
    };

    return (
        <Link to="/landing" className="dropdown-item" onClick={handleLogout}>Cerrar sesión</Link>
    );
}