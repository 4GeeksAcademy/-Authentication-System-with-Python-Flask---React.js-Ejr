import React, { useContext } from 'react';
import { Context } from "../store/appContext";
import UpdateProfileUser from "../component/UpdateProfileUser.js";

const UserPrivate = () => {
  const { store, actions } = useContext(Context);
  const { email, username, firstname, lastname, pasaporte, address, payment_method } = store.user;

  const handleUpdateField = async (fieldName, fieldValue) => {
    try {
      const updatedData = { [fieldName]: fieldValue };
      const updatedUser = await actions.updateUserProfile(store.user.id, updatedData);

      if (updatedUser) {
        console.log("User profile updated successfully");
      } else {
        console.log("Failed to update user profile");
      }
    } catch (error) {
      console.log("Error updating User private:", error);
    }
  };

  return (
    <div className="profil-content">
      <UpdateProfileUser label="Correo electrónico" value={email} onSave={(value) => handleUpdateField("email", value)} />
      <UpdateProfileUser label="Nombre de usuario" value={username} onSave={(value) => handleUpdateField("username", value)} />
      <UpdateProfileUser label="Nombre" value={firstname} onSave={(value) => handleUpdateField("firstname", value)} />
      <UpdateProfileUser label="Apellido" value={lastname} onSave={(value) => handleUpdateField("lastname", value)} />
      <UpdateProfileUser label="Pasaporte" value={pasaporte} onSave={(value) => handleUpdateField("pasaporte", value)} />
      <UpdateProfileUser label="Dirección" value={address} onSave={(value) => handleUpdateField("address", value)} />
      <UpdateProfileUser label="Método de pago" value={payment_method} onSave={(value) => handleUpdateField("payment_method", value)} />
    </div>
  );
};

export default UserPrivate;
