import React, { useState, useContext, useEffect } from "react";
import "../../styles/UserProfile.css";
import { Context } from "../store/appContext";

const UserProfile = () => {
    const { store, actions } = useContext(Context);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [eventStyle, setEventStyle] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [passwordMessage, setPasswordMessage] = useState(""); // Estado para manejar el mensaje
    const [isError, setIsError] = useState(false); // Estado para manejar el tipo de mensaje (éxito o error)

    useEffect(() => {
        actions.getUserProfile();
        if (store.profile) {
            setUsername(store.profile.username);
            setEmail(store.profile.email);
        }
    }, [store.profile]);

    useEffect(() => {
        if (store.user_profile) {
            setAddress(store.user_profile.address || "");
            setCity(store.user_profile.city || "");
            setCountry(store.user_profile.country || "");
            setEventStyle(store.user_profile.event_style || "");
        }
    }, [store.user_profile]);

    const handleSubmit = () => {
        const profile = {
            avatar: null,
            username: username,
            email: email,
            address: address,
            city: city,
            country: country,
            eventStyle: eventStyle
        };
        actions.updateUserProfile(profile);
    };

    const handleChangePassword = async () => {
        try {
            const response = await actions.changePassword(currentPassword, newPassword);
            if (response.ok) { // Aquí verificamos si la respuesta es correcta
                setPasswordMessage("Password alterada con éxito");
                setIsError(false);
            } else {
                const errorData = await response.json();
                setPasswordMessage(errorData.message || "Error en el cambio de la Password");
                setIsError(true);
            }
        } catch (error) {
            setPasswordMessage("Error en el cambio de la Password");
            setIsError(true);
        } finally {
            // Restablecer los campos de contraseña después del intento
            setCurrentPassword("");
            setNewPassword("");
        }
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
                        <button className="save-button" onClick={handleSubmit}>Guardar Cambios</button>
                        
                        {/* Sección para cambiar la contraseña */}
                        <input
                            type="password"
                            name="currentPassword"
                            placeholder="Contraseña actual"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            name="newPassword"
                            placeholder="Nueva contraseña"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <button onClick={handleChangePassword}>Cambiar Contraseña</button>
                        
                        {/* Mostrar mensaje de éxito o error */}
                        {passwordMessage && (
                            <p className={isError ? "error-message" : "success-message"}>
                                {passwordMessage}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
