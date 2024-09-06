import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const { actions } = useContext(Context);
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const { token } = useParams(); 
    const navigate = useNavigate();

    useEffect(() => {
        
        if (!token) {
            setError("Token inválido");
        }
    }, [token]);

    const handleResetPassword = async (e) => {
        e.preventDefault(); 

        if (!password1 || !password2) {
            setError("Ambos campos son requeridos");
            return;
        }

        if (password1.trim() !== password2.trim()) {
            setError("Las contraseñas no coinciden");
            return;
        }

        const success = await actions.resetPassword(token, password1, password2);
        if (success) {
            setSuccess("Contraseña restablecida exitosamente");
            setError(null);
            navigate('/login');
        } else {
            setError("Error al restablecer la contraseña");
            setSuccess(null);
        }
    };

    return (
        <div>
            <h4>Restablecer Contraseña</h4>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleResetPassword}>
                <div>
                    <input
                        type="password"
                        placeholder="Nueva contraseña"
                        value={password1}
                        onChange={(e) => setPassword1(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Confirmar nueva contraseña"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                        required
                    />
                </div>
                 <button onClick={handleResetPassword}>Restablecer Contraseña</button>
            </form>
        </div>
    );
};

export default ResetPassword;
