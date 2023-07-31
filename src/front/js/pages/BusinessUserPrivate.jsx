import React, { useContext} from 'react';
import { Context } from "../store/appContext";
import UpdateBusinessUserProfile from "../component/UpdateBusinessProfileUser.jsx"

const BusinessUserPrivate = () => {
  const { store, actions } = useContext(Context);
  const { business_name, email, nif, address, payment_method } = store.business_user;

  const handleUpdateField = async (fieldName, fieldValue) => {
    try {
      const updatedData = { [fieldName]: fieldValue };
      const updatedUser = await actions.updateBusinessUserProfile(store.business_user.id, updatedData)

      if (updatedUser) {
        console.log('Business User profile updated successfully');
      } else {
        console.log('Failed to update Business User profile');
      }
    } catch (error) {
      console.log('Error updating Business User private:', error)
    }
  };

  return (
    <div className='businessProfile-content'>
      <UpdateBusinessUserProfile label="Correo electrónico" value={email} onSave={(value) => handleUpdateField("email", value)} />
      <UpdateBusinessUserProfile label="Nombre de usuario" value={business_name} onSave={(value) => handleUpdateField("business_name", value)} />
      <UpdateBusinessUserProfile label="Nif" value={nif} onSave={(value) => handleUpdateField("Nif", value)} />
      <UpdateBusinessUserProfile label="Dirección" value={address} onSave={(value) => handleUpdateField("address", value)} />
      <UpdateBusinessUserProfile label="Método de pago" value={payment_method} onSave={(value) => handleUpdateField("payment_method", value)} />
    </div>
  )
}

export default BusinessUserPrivate