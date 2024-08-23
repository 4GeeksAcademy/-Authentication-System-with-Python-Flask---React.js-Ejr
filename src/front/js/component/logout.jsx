import React from 'react';
import { useNavigate } from 'react-router-dom'; // Si estás usando react-router-dom para la navegación

const LogoutLink = () => {
  const navigate = useNavigate(); // Hook para redirigir al usuario

  const handleLogout = () => {
    // Elimina el token de autenticación del almacenamiento local
    localStorage.removeItem('token');

    // Redirigir al usuario a la página de inicio de sesión o inicio
    navigate('/login'); // Ajusta esta ruta según tu configuración de rutas
  };

  return (
    <p>
      <a
        href="#"
        className="link-primary"
        onClick={(e) => {
          e.preventDefault(); // Evita la recarga de la página
          handleLogout(); // Llama a la función de cerrar sesión
        }}
      >
        Cerrar Sesión
      </a>
    </p>
  );
};

export default LogoutLink;
