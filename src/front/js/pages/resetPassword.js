import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

export const ResetPassword = () => {
    const { actions } = useContext(Context);
    const { token } = useParams();

    const [passwordInput, setPasswordInput] = useState("")
    const [confirmInput, setConfirmInput] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmationError, setConfirmationError] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [showError, setError] = useState("")

    const checkNewPassword = async (e) => {
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

        try {
            const resp = await actions.resetPassword(token, passwordInput);

            if (!resp.success) {
                throw new Error("Error al resetear la contraseña.");
            } else {
                setShowModal(true);
            }
        } catch (error) {
            setError(error.message);
        }


    }

    return (
        <div className="container">
            <div>
                <form onSubmit={checkNewPassword}>
                    <div className="mb-3">
                        <label htmlFor="passwordInput" class="form-label">Contraseña</label>
                        <input type="password" className="form-control" id="passwordInput" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} required />
                        {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
                    </div>
                    <div class="mb-3">
                        <label htmlFor="confirmInput" class="form-label">Confirmar contraseña</label>
                        <input type="password" className="form-control" id="confirmInput" value={confirmInput} onChange={(e) => setConfirmInput(e.target.value)} required />
                        {confirmationError && <p style={{ color: 'red' }}>{confirmationError}</p>}
                    </div>
                    <button type="submit">Reestablecer</button>
                </form>
            </div>
            {showError && <p style={{ color: 'red' }}>{showError}</p>}
            {showModal && (
                <div className="modal">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <p>Su contraseña se ha reestablecido correctamente.</p>
                            </div>
                            <div className="modal-footer">
                                <Link to="/login">
                                    <button type="button" className="btn btn-primary">Aceptar</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )

}