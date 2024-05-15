import React from 'react';
import { Redirect } from 'react-router-dom';

const PrivateView = () => {
    // Aquí puedes agregar lógica adicional si es necesario para la vista privada
    // Por ejemplo, manejar el estado local del componente

    return (
        <div>
            <h1>VISTA PRIVADA, HAS INICIADO SESIÓN</h1>
            {/* Agregar contenido adicional para la vista privada aquí */}
        </div>
    );
};

export default PrivateView;
