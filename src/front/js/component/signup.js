import React, { useContext, useState } from "react";
import "../../styles/singup.css";
import { useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

const Signup = () => {
    const [isActive, setIsActive] = useState(false);
    const [isPartner, setIsPartner] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        setIsActive(true);
    };

    const handleLoginClick = () => {
        setIsActive(false);
    };

    const handleToggleChange = () => {
        setIsPartner(!isPartner);
    };

    const login = async (email, password) => {
        await actions.login(email, password);
        navigate("/app/exemplo")
    }

    return (
        <div className="singup-body">
            <video autoPlay muted loop id="myVideo">
                <source src="https://videos.pexels.com/video-files/2022395/2022395-hd_1920_1080_30fps.mp4" type="video/mp4" />
            </video>
            <div className={`singup-container ${isActive ? "singup-active" : ""}`} id="container">
                <div className="singup-form-container singup-sign-up">
                    <div className="form">
                        <h1>Crear Cuenta</h1>
                        <input type="text" placeholder="Name" />
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <div className="signup-toggle-wrapper">
                            <button type="submit">Regístrate</button>
                            <label className="switch">
                                <input type="checkbox" checked={isPartner} onChange={handleToggleChange} />
                                <span className="slider round"></span>
                            </label>
                            <span className="toggle-text">{isPartner ? "Partner" : "Usuario"}</span>
                        </div>
                    </div>
                </div>
                <div className="singup-form-container singup-sign-in">
                    <div className="form">
                        <h1>Iniciar sesión</h1>
                        <span>Usa tu correo y contraseña</span>
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <a href="#">¿Has olvidado tu contraseña?</a>
                        <button onClick={() => login(email,password)}>Iniciar sesión</button>
                    </div>
                </div>
                <div className="singup-toggle-container">
                    <div className="singup-toggle">
                        <div className="singup-toggle-panel singup-toggle-left">
                            <h1>¡Bienvenido de nuevo!</h1>
                            <p>Introduzca sus datos personales para utilizar todas las funciones del sitio web</p>
                            <button className="singup-hidden" id="login" onClick={handleLoginClick}>
                            Iniciar sesión
                            </button>
                        </div>
                        <div className="singup-toggle-panel singup-toggle-right">
                            <h1>¡Hola, amigo!</h1>
                            <p>Regístrese con sus datos personales para utilizar todas las funciones del sitio web</p>
                            <button className="singup-hidden" id="register" onClick={handleRegisterClick}>
                            Regístrese
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
