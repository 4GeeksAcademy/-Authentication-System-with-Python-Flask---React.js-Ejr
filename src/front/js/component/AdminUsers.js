import React, { useEffect, useContext } from 'react';
import { Context } from '../store/appContext';

const AdminUsers = () => {
  const { store, actions } = useContext(Context);


  const handleDeleteUser = (userId) => {
    actions.deleteUser(userId);
    window.location.reload()
  };



  return (
    <>
      <div className='admin-user-content'>
        <h2 className='text-center'>Lista de usuarios:</h2>
        <div className='d-flex content-infos'>
          {store.users.map(user => (
            <div key={user.id} className="infos-users">
              <button onClick={() => handleDeleteUser(user.id)}>&#10008;</button>
              <p>ID usuario: <span>{user.id}</span> </p>
              <p>Nombre de usuario: <span>{user.username}</span></p>
              <p>Correo electrónico: <span>{user.email}</span></p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AdminUsers;
