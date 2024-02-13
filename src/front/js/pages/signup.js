import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";

export const Signup = () => {
    const { actions } = useContext(Context);
    
    const [usernameInput, setUsernameInput] = useState("")
    const [emailInput, setEmailInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")
    const [confirmInput, setConfirmInput] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmationError, setConfirmationError] = useState("")
    const [showModal, setShowModal] = useState(false)

    const handleSignup = async (e) => {
        e.preventDefault();

        // Para comprobar si la contraseña tiene 1 caracter especial y 1 mayuscula
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;

        if (!passwordRegex.test(passwordInput)) {
            // La contraseña no cumple con los requisitos
            setPasswordError("La contraseña debe contener al menos 1 mayuscula y 1 caracter especial.");
            return;
        } else {
            // La contraseña si cumple
            setPasswordError("")
        }

        if (passwordInput !== confirmInput) {
            setConfirmationError("Las contraseñas no coinciden.")
            return;
        } else {
            setConfirmationError("")
        }

        // Para comprobar que el mail este en el formato correcto
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(emailInput)) {
            // El mail esta mal escrito
            setEmailError("Formato de correo electronico inválido.");
            return;
        } else {
            // El email es correcto
            setEmailError("");
        }

        const result = await actions.sendSignup(usernameInput, emailInput, passwordInput);

        if (result.token) {
            setShowModal(true);
        }
    }

    return (
        <div className="container">
            <div>
                <form onSubmit={handleSignup}>
                    <div class="mb-3">
                        <label htmlFor="usernameInput" class="form-label">Nombre de usuario</label>
                        <input type="text" class="form-control" id="usernameInput" value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} required />
                    </div>
                    <div class="mb-3">
                        <label htmlFor="emailInput" class="form-label">Correo electronico</label>
                        <input type="email" class="form-control" id="emailInput" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} required />
                        {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                    </div>
                    <div class="mb-3">
                        <label htmlFor="passwordInput" class="form-label">Contraseña</label>
                        <input type="password" class="form-control" id="passwordInput" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} required />
                        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                    </div>
                    <div class="mb-3">
                        <label htmlFor="confirmInput" class="form-label">Confirmar contraseña</label>
                        <input type="password" class="form-control" id="confirmInput" value={confirmInput} onChange={(e) => setConfirmInput(e.target.value)} required />
                        {confirmationError && <p style={{ color: 'red' }}>{confirmationError}</p>}
                    </div>
                    <button type="submit">Crear</button>
                </form>
            </div>
            {showModal && (
                <Modal>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <p>Usuario creado exitosamente.</p>
                            </div>
                            <div className="modal-footer">
                                <Link to="/login">
                                    <button type="button" className="btn btn-primary">Iniciar sesión</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}