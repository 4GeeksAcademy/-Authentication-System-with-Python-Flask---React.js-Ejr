import React from 'react';
import { Redirect } from 'react-router-dom';
import Private from '../component/private';
import { Context } from "../store/appContext";

const PrivateView = () => {
    const { actions } = useContext(Context);

    return (
        <div>
            <h1>VISTA PRIVADA, HAS INICIADO SESIÓN</h1>
            <Private />
        </div>
    );
};

export default PrivateView;
