// import { useHistory } from 'react-router-dom';

import React, { useContext } from 'react';
import { Context } from '../store/appContext';

const Private = () => {
    const { actions, store } = useContext(Context); 
    
    const handleLogout = () => {
        actions.LogOut(); // Llama a la función LogOut del flux.js para cerrar sesión
    };

    return (
        <div>
            <h1>VISTA PRIVADA, HAS INICIADO SESIÓN</h1>
            <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
    );
};

export default Private;
