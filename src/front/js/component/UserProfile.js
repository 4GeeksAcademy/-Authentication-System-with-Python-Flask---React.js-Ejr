import React, { useState, useContext, useEffect } from "react";
import "../../styles/UserProfile.css";
import { Context } from "../store/appContext";

const UserProfile = () => {

    const { store, actions } = useContext(Context);
    useEffect(() => {
        console.log(store)
        if (store.profile) {
            setUsername(store.profile.username);
            setEmail(store.profile.email);
            setAddress(store.profile.address);
            setCity(store.profile.city);
            setCountry(store.profile.country);
            setEventStyle(store.profile.eventStyle);
        }
        
    }, [store.profile])
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [eventStyle, setEventStyle] = useState("");

    const handleFileChange = (e) => {
        // setUserData({
        //     ...userData,
        //     avatar: URL.createObjectURL(e.target.files[0]),
        // });
    };

    const handleSubmit = (e) => {
        const profile = {
            avatar: null,
            username: username,
            email: email,
            address: address,
            city: city,
            country: country,
            eventStyle: eventStyle
        }
        console.log("Datos del usuario actualizados:", profile);
        actions.updateUserProfile(profile);
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
                    <div>
                        <h2>Actualiza tu información</h2>
                        <input
                            type="file"
                            id="avatar"
                            name="avatar"
                            className="file-input"
                            onChange={handleFileChange}
                        />
                        <label htmlFor="avatar">Elige una foto de perfil</label>
                        {/* {userData.avatar && (
                            <div>
                                <img
                                    src={userData.avatar}
                                    alt="Avatar"
                                    className="avatar-preview"
                                />
                            </div>
                        )} */}
                        <input
                            type="text"
                            name="username"
                            placeholder="Nombre"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {/* <input
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
                        /> */}
                        <input
                            type="text"
                            name="address"
                            placeholder="Dirección"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <input
                            type="text"
                            name="city"
                            placeholder="Ciudad"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <input
                            type="text"
                            name="country"
                            placeholder="País"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                        <input
                            type="text"
                            name="eventStyle"
                            placeholder="Estilo del Evento"
                            value={eventStyle}
                            onChange={(e) => setEventStyle(e.target.value)}
                        />
                        <button onClick= {handleSubmit}>Guardar Cambios</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
