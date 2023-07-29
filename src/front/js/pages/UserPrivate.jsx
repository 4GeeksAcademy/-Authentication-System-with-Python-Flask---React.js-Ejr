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
        actions.setUser(updatedUser.user);
        console.log("User profile updated successfully");
      } else {
        console.log("Failed to update user profile");
      }
    } catch (error) {
      console.log("Error in updating user profile:", error);
    }
  };

  return (
    <div className="profil-content">
      <UpdateProfileUser label="Email" value={email} onSave={(value) => handleUpdateField("email", value)} />
      <UpdateProfileUser label="Username" value={username} onSave={(value) => handleUpdateField("username", value)} />
      <UpdateProfileUser label="Firstname" value={firstname} onSave={(value) => handleUpdateField("firstname", value)} />
      <UpdateProfileUser label="Lastname" value={lastname} onSave={(value) => handleUpdateField("lastname", value)} />
      <UpdateProfileUser label="Pasaporte" value={pasaporte} onSave={(value) => handleUpdateField("pasaporte", value)} />
      <UpdateProfileUser label="Address" value={address} onSave={(value) => handleUpdateField("address", value)} />
      <UpdateProfileUser label="Payment Method" value={payment_method} onSave={(value) => handleUpdateField("payment_method", value)} />
    </div>
  );
};

export default UserPrivate;
