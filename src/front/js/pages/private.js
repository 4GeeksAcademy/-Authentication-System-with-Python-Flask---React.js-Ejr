import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Private = () => {
    const navigate = useNavigate();

    const goToHomeAndReload = () => {
        navigate('/');  // Navega a Home
        window.location.reload(); // Fuerza la recarga de la página
    };

    return (
        <div>
            <h1>Ya estás Logueado</h1>
            <button onClick={goToHomeAndReload}>Ir a Home</button>
        </div>
    );
}