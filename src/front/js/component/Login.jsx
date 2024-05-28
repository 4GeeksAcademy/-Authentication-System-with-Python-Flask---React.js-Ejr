import React, { useContext, useEffect, useState } from 'react';
import styles from "./Login.module.css"; // Asegúrate de tener este archivo de estilos o ajusta el nombre según necesites
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const Login = () => {
    const { actions, store } = useContext(Context);
    const navigate = useNavigate();
    

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        await actions.loginUserV2(email, password);
        await actions.loadUserData();

        // Verificar el estado después de que se haya actualizado
        const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));
        const dataRole = localStorage.getItem('dataRole');


        if (isAuthenticated && dataRole) {
            if (dataRole === "athlete") {
                navigate("/Userpage");
            }else if (dataRole === "coach") {
                navigate("/PrivatePageUser"); 
            }else if (dataRole === "admin") {
                navigate("/PrivatePageUser"); 
            }else if (dataRole === "master") {
                navigate("/ModulePage"); 
            }else {
                navigate("/");
            }
        }
    };

    useEffect(() => {
        const isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated"));
        const dataRole = localStorage.getItem("dataRole");

        if (isAuthenticated && dataRole) {
            if (dataRole === "athlete") {
                navigate("/Userpage");
            } else if (dataRole === "coach" || dataRole === "admin") {
                navigate("/PrivatePageUser");
            } else if (dataRole === "master") {
                navigate("/ModulePage");
            } else {
                navigate("/");
            }
        }
    }, [navigate]);


    const renderLoginResponse = () => { // Función para renderizar la respuesta del inicio de sesión
        if (store.isAuthenticatedMessage != null) { // Verifica si hay una respuesta de inicio de sesión
            if (store.isAuthenticatedMessage == false) { // Verifica si hay un error en el inicio de sesión
                return (
                    <div className="alert alert-danger" role="alert"> {/* Muestra el mensaje de error */}
                        <p>{store.loginError}</p>
                    </div>
                );
            } else { // Si no hay error, muestra un mensaje de éxito
                return (
                    <div className="alert alert-success" role="alert">
                        <p>Correct password</p>
                    </div>
                );
            }
        }
    };

    return (
        <div className={styles.loginform}>
            <h2>Inicia sesión</h2>
            <div>
                {renderLoginResponse()} {/* Renderiza la respuesta del inicio de sesión */}
            </div>
            <form onSubmit={handleLogin}>
                <label className="labels">
                    Email:
                    <input type="email" name="email" className="inputs" value={email.trim()} onChange={e => setEmail(e.target.value)} required />
                </label>
                <label className="labels">
                    Contraseña:
                    <input type="password" name="password" value={password.trim()} onChange={e => setPassword(e.target.value)} required />
                </label>
                <button type="submit" className={styles.submitButtonLogin}>Iniciar sesión</button>
                <Link to="/PasswordResetRequest">¿Olvidaste la contraseña?</Link>
                <div className="rememberMe">
                    <input type="checkbox" />
                    <span>Recuérdame</span>
                    <p>¿Es tu primera vez aquí? <Link to="/Singup">Regístrate ahora.</Link></p>
                </div>
            </form>
        </div>
    );
};

export default Login;
