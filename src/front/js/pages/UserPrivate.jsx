import React, { useContext, useState } from 'react';
import { Context } from "../store/appContext";

const UserPrivate = () => {
  const { store, actions } = useContext(Context);
  const [isEditingAll, setIsEditingAll] = useState(false);
  const [userData, setUserData] = useState({
    email: store.user?.email || '',
    username: store.user?.username || '',
    firstName: store.user?.firstname || '',
    lastName: store.user?.lastname || '',
    prefixTelephone: store.user?.prefix_telephone || '',
    telephone: store.user?.telephone || '',
    address: store.user?.address || '',
    passport: store.user?.pasaporte || '',
    paymentMethod: store.user?.payment_method || '',
  });


  const handleEditAllClick = () => {
    setIsEditingAll(!isEditingAll); // Inversez la valeur actuelle de isEditingAll
  };

  const handleChange = (field, value) => {
    setUserData({
      ...userData,
      [field]: value,
    });
  };

  const updateUser = async () => {
    try {
      const updatedUser = await actions.updateUserProfile(store.user.id, userData);

      if (updatedUser) {
        console.log("User profile updated successfully");
        setIsEditingAll(false);
      } else {
        console.log("Failed to update user profile");
      }
    } catch (error) {
      console.log("Error updating User private:", error);
    }
  };

  const handleCancelChanges = () => {
    setUserData({
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
  };


  return (
    <div className="profil-content container text-center">
      <div className="row">
        <div className="col">
          <label>Correo electrónico:</label>
          {isEditingAll ? (
            <div>
              <textarea
                rows="1"
                cols="38"
                maxLength="300"
                style={{ resize: "none" }}
                value={userData.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
          ) : (
            <div>
              <p>{userData.email}</p>
            </div>
          )}
        </div>
        <div className="col">
          <label>Nombre de usuario:</label>
          {isEditingAll ? (
            <div>
              <textarea
                value={userData.username}
                onChange={(e) => handleChange("username", e.target.value)}
                rows="1"
                cols="38"
                maxLength="300"
                style={{ resize: "none" }}
              />
            </div>
          ) : (
            <div>
              <p>{userData.username}</p>
            </div>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label>Nombre:</label>
          {isEditingAll ? (
            <div>
              <textarea
                value={userData.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                rows="1"
                cols="38"
                maxLength="300"
                style={{ resize: "none" }}
              />
            </div>
          ) : (
            <div>
              <p>{userData.firstName}</p>
            </div>
          )}
        </div>
        <div className="col">
          <label>Apellido:</label>
          {isEditingAll ? (
            <div>
              <textarea
                value={userData.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                rows="1"
                cols="38"
                maxLength="300"
                style={{ resize: "none" }}
              />
            </div>
          ) : (
            <div>
              <p>{userData.lastName}</p>
            </div>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label>Prefijo telefónico:</label>
          {isEditingAll ? (
            <div>
              <textarea
                value={userData.prefixTelephone}
                onChange={(e) => handleChange("prefixTelephone", e.target.value)}
                rows="1"
                cols="38"
                maxLength="300"
                style={{ resize: "none" }}
              />
            </div>
          ) : (
            <div>
              <p>{userData.prefixTelephone}</p>
            </div>
          )}
        </div>
        <div className="col">
          <label>Número de teléfono:</label>
          {isEditingAll ? (
            <div>
              <textarea
                value={userData.telephone}
                onChange={(e) => handleChange("telephone", e.target.value)}
                rows="1"
                cols="38"
                maxLength="300"
                style={{ resize: "none" }}
              />
            </div>
          ) : (
            <div>
              <p>{userData.telephone}</p>
            </div>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label>Pasaporte:</label>
          {isEditingAll ? (
            <div>
              <textarea
                value={userData.passport}
                onChange={(e) => handleChange("passport", e.target.value)}
                rows="1"
                cols="38"
                maxLength="300"
                style={{ resize: "none" }}
              />
            </div>
          ) : (
            <div>
              <p>{userData.passport}</p>
            </div>
          )}
        </div>
        <div className="col">
          <label>Dirección:</label>
          {isEditingAll ? (
            <div>
              <textarea
                value={userData.address}
                onChange={(e) => handleChange("address", e.target.value)}
                rows="1"
                cols="38"
                maxLength="300"
                style={{ resize: "none" }}
              />
            </div>
          ) : (
            <div>
              <p>{userData.address}</p>
            </div>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label>Método de pago:</label>
          {isEditingAll ? (
            <div>
              <textarea
                value={userData.paymentMethod}
                onChange={(e) => handleChange("paymentMethod", e.target.value)}
                rows="1"
                cols="38"
                maxLength="300"
                style={{ resize: "none" }}
              />
            </div>
          ) : (
            <div>
              <p>{userData.paymentMethod}</p>
            </div>
          )}
        </div>
      </div>
      <div className='btn-profil'>
        {isEditingAll ? (
          <button className='btn-guardar' onClick={() => updateUser()}>Guardar cambios</button>
        ) : (
          <button className='btn-modif' onClick={() => handleEditAllClick()}>Modificar</button>
        )}
        <button className='btn-up-cancel' onClick={() => handleCancelChanges()}>Cancelar</button>
      </div>
    </div>
  );

};

export default UserPrivate;