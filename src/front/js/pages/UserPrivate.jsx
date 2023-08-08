import React, { useContext, useState } from 'react';
import { Context } from "../store/appContext";
import UpdateProfileUser from "../component/UpdateProfileUser.js";

const UserPrivate = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState(store.user?.email);
  const [username, setUsername] = useState(store.user?.username);
  const [firstName, setFirstName] = useState(store.user?.firstname);
  const [lastName, setLastName] = useState(store.user?.lastname);
  const [prefixTelephone, setPrefixTelephone] = useState(store.user?.prefix_telephone);
  const [telephone, setTelephone] = useState(store.user?.telephone);
  const [address, setAddress] = useState(store.user?.address);
  const [passport, setPassport] = useState(store.user?.pasaporte);
  const [paymentMethod, setPaymentMethod] = useState(store.user?.payment_method);

  // Copie des données non sauvegardées (modifications en cours)
  const [unsavedData, setUnsavedData] = useState({
    email: store.user?.email,
    username: store.user?.username,
    firstName: store.user?.firstname,
    lastName: store.user?.lastname,
    prefixTelephone: store.user?.prefix_telephone,
    telephone: store.user?.telephone,
    address: store.user?.address,
    passport: store.user?.pasaporte,
    paymentMethod: store.user?.payment_method,
  });

  const handleChange = (field, value) => {
    setUnsavedData({
      ...unsavedData,
      [field]: value,
    });
  };

  const updateUser = async () => {
    try {
      const updatedUser = await actions.updateUserProfile(store.user.id, unsavedData);

      if (updatedUser) {
        console.log("User profile updated successfully");
        // Mettre à jour les états de base pour refléter les modifications sauvegardées
        setEmail(unsavedData.email);
        setUsername(unsavedData.username);
        setFirstName(unsavedData.firstName);
        setLastName(unsavedData.lastName);
        setPrefixTelephone(unsavedData.prefixTelephone);
        setTelephone(unsavedData.telephone);
        setAddress(unsavedData.address);
        setPassport(unsavedData.passport);
        setPaymentMethod(unsavedData.paymentMethod);
      } else {
        console.log("Failed to update user profile");
      }
    } catch (error) {
      console.log("Error updating User private:", error);
    }
  };

  const handleCancelChanges = () => {
    // Rétablir les valeurs d'origine pour annuler les modifications
    setUnsavedData({
      email: store.user?.email,
      username: store.user?.username,
      firstName: store.user?.firstname,
      lastName: store.user?.lastname,
      prefixTelephone: store.business_user?.prefix_telephone,
      telephone: store.business_user?.telephone,
      address: store.user?.address,
      passport: store.user?.pasaporte,
      paymentMethod: store.user?.payment_method,
    });
  };

  return (
    <div className="profil-content">
      <UpdateProfileUser
        label="Correo electrónico"
        value={unsavedData.email}
        onChange={(e) => handleChange("email", e.target.value)}
      />
      <UpdateProfileUser
        label="Nombre de usuario"
        value={unsavedData.username}
        onChange={(e) => handleChange("username", e.target.value)}
      />
      <UpdateProfileUser
        label="Nombre"
        value={unsavedData.firstName}
        onChange={(e) => handleChange("firstName", e.target.value)}
      />
      <UpdateProfileUser
        label="Apellido"
        value={unsavedData.lastName}
        onChange={(e) => handleChange("lastName", e.target.value)}
      />

      <UpdateProfileUser
        label="Prefijo telefónico"
        value={unsavedData.prefixTelephone}
        onChange={(e) => handleChange("Prefijo telefónico", e.target.value)}
      />

      <UpdateProfileUser
        label="Número de teléfono"
        value={unsavedData.telephone}
        onChange={(e) => handleChange("Número de teléfono", e.target.value)}
      />
      <UpdateProfileUser
        label="Pasaporte"
        value={unsavedData.passport}
        onChange={(e) => handleChange("passport", e.target.value)}
      />
      <UpdateProfileUser
        label="Dirección"
        value={unsavedData.address}
        onChange={(e) => handleChange("address", e.target.value)}
      />
      <UpdateProfileUser
        label="Método de pago"
        value={unsavedData.paymentMethod}
        onChange={(e) => handleChange("paymentMethod", e.target.value)}
      />
      <button onClick={() => updateUser()}>Guardar cambios</button>
      <button onClick={() => handleCancelChanges()}>Cancelar</button>
    </div>
  );
};

export default UserPrivate;
