import React from 'react';
import { useAppContext } from '../store/appcontext';
import { useHistory } from 'react-router-dom'

const LogoutButton = () => {
 const { actions } = useAppContext();

 const handleLogout = () => {

  const confirm = window.confirm('¿Estás seguro de que quieres cerrar sesión?');

  
  if (confirm) {
   actions.logout();
  }
 };

 return (
  <button onClick={handleLogout}>
   Cerrar Sesión
  </button>
 );
};

export default LogoutButton;