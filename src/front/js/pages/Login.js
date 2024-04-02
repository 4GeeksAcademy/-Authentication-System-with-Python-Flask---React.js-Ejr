import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import login from '/src/front/img/login.webp';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const sendLogin = async (email, password) => {
        try {
            const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "email": email, "password": password }),
            });

            if (!resp.ok) {
                throw new Error("Problema al iniciar sesión");
            }

            const data = await resp.json();
            localStorage.setItem("jwt-token", data.token);
            navigate("/");
        } catch (error) {
            console.error(error);
            setError("Contraseña incorrecta");
        }
    };

    return (
        <div className="login-div" style={{
            backgroundImage: `url(${login})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div className="login-page">
                <div className="auth-container-login">
                    <div className="container form-body">
                        <h2 className="title-login">Login</h2>
                        <div className="input-group">
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="text"
                                id="email"
                                className="email"
                                placeholder="Enter e-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Your password</label>
                            <div className="password-input-container">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    className="password"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                        </div>
                        {error && <div className="error-message mb-4">{error}</div>}
                        <button type="button" className="btn btn-primary" onClick={() => sendLogin(email, password)}>
                            Login
                        </button>
                        <p className="mt-3 text-center">Don't have an account? <Link to="/registro" className="btn-link">Create account</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
