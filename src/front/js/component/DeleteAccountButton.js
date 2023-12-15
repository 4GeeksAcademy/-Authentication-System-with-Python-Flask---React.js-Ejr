import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const deleteToken = () => ({ type: 'DELETE_TOKEN' });
const setLoggedOut = () => ({ type: 'SET_LOGGED_OUT' });

const DeleteAccountButton = () => {
 const history = useHistory();
 const dispatch = useDispatch();
 const whoIsLogged = useSelector((state) => state.whoIsLogged);

 const handleDeleteAccount = () => {

  dispatch(deleteToken());

  const confirm = window.confirm('¿Estás seguro de que quieres eliminar tu cuenta?');

n
  if (confirm) {

   dispatch(setLoggedOut());

  
   setTimeout(() => {
    history.push('/');
   }, 0);
  }
 };

 return (
  <button onClick={handleDeleteAccount}>
   Delete Account
  </button>
 );
};

export default DeleteAccountButton;