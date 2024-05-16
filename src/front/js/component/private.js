// import { useHistory } from 'react-router-dom';

import React, { useContext } from 'react';
import { Context } from '../store/appContext';

const Private = () => {
    // const history = useHistory();
    const { actions, store } = useContext(Context);

    // useEffect(() => {
    //     // Verificar si el usuario está autenticado al cargar el componente
    //     if (!store.isLoggedIn) {
    //         // Si el usuario no está autenticado, redirigir al componente de inicio de sesión
    //         history.push('/login');
    //     }
    // }, [history, store.isLoggedIn]);

    // const handleLogout = () => {
    //     // Lógica para cerrar sesión (ejemplo)
    //     actions.logout();
    //     // Redirigir al componente de inicio de sesión después de cerrar sesión
    //     history.push('/private');
    // };

    return (
        <div>
            <h1>VISTA PRIVADA, HAS INICIADO SESIÓN</h1>
            {/* <button onClick={handleLogout}>Cerrar Sesión</button> */}
        </div>
    );
};

export default Private;
