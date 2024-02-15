import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Navigate, useNavigate } from "react-router-dom";

export const Recovery = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const [emailInput, setEmailInput] = useState("")
    const [emailError, setEmailError] = useState("")
    const [recoveryMessage, setRecoveryMessage] = useState("")
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Para comprobar que el mail este en el formato correcto
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(emailInput)) {
            // El mail esta mal escrito
            setEmailError("Formato de correo electronico inválido.");
            return;
        }
        const resp = await actions.sendPasswordRecoveryRequest(emailInput);

        if (!resp.ok) {
            setError("Error al enviar la solicitud de recuperación de contraseña.");
        } else {
            setRecoveryMessage("Se ha enviado un correo electrónico con instrucciones para restablecer tu contraseña.");
        }
    }

    return (
        <div className="container">
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="emailInput" className="form-label">Ingresa la dirección de tu correo electronico, te enviaremos un mail para que recuperes tu contraseña</label>
                        <input type="email" className="form-control" id="emailInput" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} required />
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