import React, { useContext, useState } from 'react';
import { Context } from "../store/appContext";
import UpdateProfileUser from "../component/UpdateProfileUser.js";

const UserPrivate = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState(store.user?.email)
  const [username, setUsername] = useState(store.user?.username)
  const [firstName, setFirstName] = useState(store.user?.firstname)
  const [lastName, setLastName] = useState(store.user?.lastname)
  const [address, setAddress] = useState(store.user?.address)
  const [passport, setPassport] = useState(store.user?.pasaporte)
  const [paymentMethod, setPaymentMethod] = useState(store.user?.payment_method)



  const updateUser = async () => {
    try {
      const updatedData = {
        'email': email,
        'username': username,
        'firstname': firstName,
        'lastname': lastName,
        'address': address,
        'payment_method': paymentMethod,
        'pasaporte': passport
      }
      const updatedUser = await actions.updateUserProfile(store.user.id, updatedData);

      if (updatedUser) {
        console.log("User profile updated successfully");
      } else {
        console.log("Failed to update user profile");
      }
    } catch (error) {
      console.log("Error updating User private:", error);
    }
  }




  return (
    <div className="profil-content">
      <UpdateProfileUser label="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} />
      <UpdateProfileUser label="Nombre de usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
      <UpdateProfileUser label="Nombre" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
      <UpdateProfileUser label="Apellido" value={lastName} onChange={(e) => setLastName(e.target.value)} />
      <UpdateProfileUser label="Pasaporte" value={passport} onChange={(e) => setPassport(e.target.value)} />
      <UpdateProfileUser label="Dirección" value={address} onChange={(e) => setAddress(e.target.value)} />
      <UpdateProfileUser label="Método de pago" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} />
      <button onClick={() => updateUser()}>Guardar cambios</button>
    </div>
  );
};

export default UserPrivate;
