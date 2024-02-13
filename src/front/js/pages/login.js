import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();

    const [userInput, setUserInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        const result = await actions.checkLoginInfo(userInput, passwordInput);

        if (result.token) {
            sessionStorage.setItem("token", result.token);
            navigate("/home")
        }
    }


    return (
        <div className="container">
            <div>
                <form onSubmit={handleLogin}>
                    <div class="mb-3">
                        <label htmlFor="userInput" class="form-label">Nombre de usuario</label>
                        <input type="username" class="form-control" id="userInput" value={userInput} onChange={(e) => setUserInput(e.target.value)} required />
                    </div>
                    <div class="mb-3">
                        <label htmlFor="passwordInput" class="form-label">Contraseña</label>
                        <input type="password" class="form-control" id="passwordInput" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} required />
                    </div>
                    <button type="submit" class="btn btn-primary">Iniciar sesión</button>
                </form>
            </div>
            <Link to="/recovery">
                <p className="text-primary">¿Olvidaste tu contraseña?</p>
            </Link>
            <p>
                ¿No tienes una cuenta?
                <Link to="/signup">
                    <p> Crear cuenta</p>
                </Link>
            </p>
        </div>
    );
}