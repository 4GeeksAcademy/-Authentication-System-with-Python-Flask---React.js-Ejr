import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Si estás usando react-router-dom para la navegación
import { Context } from '../store/appContext';

const LogoutLink = () => {
  const { store, actions } = useContext(Context)
  const navigate = useNavigate(); // Hook para redirigir al usuario

  const handleLogout = () => {
    // Elimina el token de autenticación del almacenamiento local
    localStorage.removeItem('token');
    store.token = "";
    navigate("/")


    // Recargar la página después del logout
    // window.location.reload(); // Esto recargará la página completamente
  };

  return (
    <div
        className="dropdown-item"
        onClick={(e) => {
          e.preventDefault(); // Evita la recarga de la página por el link
          handleLogout(); // Llama a la función de cerrar sesión
        }}
      >
        Cerrar Sesión
      
    </div>
  );
};

export default LogoutLink;
