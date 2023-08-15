import React, { useContext, useEffect } from 'react';
import { Context } from '../store/appContext';

const AdminBusiness = () => {
  const { store, actions } = useContext(Context)


  const handleDeleteBusiness = (businessId) => {
    actions.deleteBusiness(businessId);
    window.location.reload()
  };
  return (
    <div className='admin-business-content'>
      <h2 className='text-center'>Lista de empresas:</h2>
      <div className='d-flex content-infos'>
        {store.business_users.map(business => (
          <div key={business.id} className="infos-users">
            <button onClick={() => handleDeleteBusiness(business.id)}>&#10008;</button>
            <p>ID empresa: <span>{business.id}</span> </p>
            <p>Nombre de empresa: <span>{business.business_name}</span></p>
            <p>Correo electrónico: <span>{business.email}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBusiness;