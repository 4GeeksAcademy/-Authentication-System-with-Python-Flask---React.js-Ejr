import React, { useState } from "react";
import "../../styles/UserProfile.css";

const UserProfile = () => {
    const [userData, setUserData] = useState({
        avatar: null,
        firstName: "Dário",
        lastName: "Duarte",
        email: "dario@gmail.com",
        currentPassword: "dario123",
        newPassword: "",
        address: "Calle del Dario, N69",
        city: "Guadalajara",
        country: "España",
        eventStyle: "Latino"
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setUserData({
            ...userData,
            avatar: URL.createObjectURL(e.target.files[0]),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Datos del usuario actualizados:", userData);
    };

    return (
        <div className="profile-body">
            <div className="profile-container">
                <div className="profile-container-left">
                    <div className="p-3 text-center">
                        <h1 className="pt-5">Perfil de Usuario</h1>
                        <p>Aquí puedes actualizar tu información personal. Cambia tu foto de perfil, nombre, apellido, correo electrónico o contraseña según sea necesario.</p>
                    </div>
                </div>
                <div className="profile-container-right text-center pt-2">
                    <form onSubmit={handleSubmit}>
                        <h2>Actualiza tu información</h2>
                        <input
                            type="file"
                            id="avatar"
                            name="avatar"
                            className="file-input"
                            onChange={handleFileChange}
                        />
                        <label htmlFor="avatar">Elige una foto de perfil</label>
                        {userData.avatar && (
                            <div>
                                <img
                                    src={userData.avatar}
                                    alt="Avatar"
                                    className="avatar-preview"
                                />
                            </div>
                        )}
                        <input
                            type="text"
                            name="firstName"
                            placeholder="Nombre"
                            value={userData.firstName}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Apellido"
                            value={userData.lastName}
                            onChange={handleInputChange}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={userData.email}
                            onChange={handleInputChange}
                        />
                        <input
                            type="password"
                            name="currentPassword"
                            placeholder="Contraseña actual"
                            value={userData.currentPassword}
                            onChange={handleInputChange}
                        />
                        <input
                            type="password"
                            name="newPassword"
                            placeholder="Nueva contraseña"
                            value={userData.newPassword}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="address"
                            placeholder="Dirección"
                            value={userData.address}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="city"
                            placeholder="Ciudad"
                            value={userData.city}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="country"
                            placeholder="País"
                            value={userData.country}
                            onChange={handleInputChange}
                        />
                        <input
                            type="text"
                            name="eventStyle"
                            placeholder="Estilo del Evento"
                            value={userData.eventStyle}
                            onChange={handleInputChange}
                        />
                        <button type="submit">Guardar Cambios</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
