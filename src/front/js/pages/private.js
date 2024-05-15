import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../store/appContext';
import Private from '../component/private';

const Private = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { actions } = useContext(Context);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Realizar cualquier lógica necesaria para la vista privada
        actions.Private(); // Ejemplo de una acción para la vista privada
    };

    return (
        <div>
            <h1>VISTA PRIVADA, HAS INICIADO SESIÓN</h1>            
        </div>
    );
};

export default Private;
