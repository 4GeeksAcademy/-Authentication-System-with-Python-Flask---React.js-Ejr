import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../store/appContext";

// Componente PrivateRouteAlumno que verifica la autenticación y redirige al alumno si no cumple con los requisitos.
// Funciona con react-router-dom versión 6
const PrivateRouteAlumno = ({ vista: VistaAlumno }) => { // 'vista' es el nombre del prop que representa el componente a renderizar VistaAlumno
    const { store } = useContext(Context);

    // Comprueba si el usuario está autenticado y si existe un objeto 'usuarioA' en el estado (store)
    const autenticado = store.autentificacion;
    const soyAlumno = store.usuarioA; // Verifica si el usuario es un alumno

    // Retorna el componente 'VistaAlumno' si el usuario está autenticado y es un alumno, de lo contrario redirige
    return autenticado && soyAlumno ? (
        <VistaAlumno /> // Renderiza el componente 'VistaAlumno' si el usuario está autenticado y es un alumno
    ) : (
        <Navigate to="/login" /> // Si el usuario no está autenticado o no es un alumno, se redirige automáticamente a la página de login (/login)
    );
};

export default PrivateRouteAlumno;
