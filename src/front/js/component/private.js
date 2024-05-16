// import { useHistory } from 'react-router-dom';

import React, { useContext } from 'react';
import { Context } from '../store/appContext';

const Private = () => {
    const { actions, store } = useContext(Context); 
    
    const handleLogout = () => {
        actions.LogOut(); // Llama a la función LogOut del flux.js para cerrar sesión
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '30px', marginBottom: '20px' }}>
            <h1 style={{ marginBottom: '20px' }}>Bienvenido, este es tu espacio privado</h1>
            <button onClick={handleLogout}>Cerrar Sesión</button>
        </div>
    );
};

export default Private;
