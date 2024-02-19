import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

export const Recovery = () => {
    const { actions } = useContext(Context);
    const [emailInput, setEmailInput] = useState("");
    const [emailError, setEmailError] = useState("");
    const [recoveryMessage, setRecoveryMessage] = useState("");
    const [error, setError] = useState("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!emailRegex.test(emailInput)) {
            setEmailError("Formato de correo electronico inválido.");
            return;
        } else {
            setEmailError("");
        }

        try {
            await actions.sendPasswordRecoveryRequest(emailInput, setRecoveryMessage);
        } catch (error) {
            setError("Error al enviar la solicitud de recuperación de contraseña.");
        }
    }

    const handleEmailChange = (e) => {
        setEmailInput(e.target.value);
        if (!emailRegex.test(e.target.value)) {
            setEmailError("Formato de correo electronico inválido.");
        } else {
            setEmailError("");
        }
    }

    return (
        <div className="container">
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="emailInput" className="form-label">Ingresa la dirección de tu correo electrónico, te enviaremos un mail para que recuperes tu contraseña</label>
                        <input type="email" className="form-control" id="emailInput" value={emailInput} onChange={handleEmailChange} required />
                        {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                    </div>
                    <button type="submit" className="btn btn-primary">Recuperar contraseña</button>
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {recoveryMessage && <p>{recoveryMessage}</p>}
            </div>
        </div>
    );
}

