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

    const handleSubmit = async (e) => {
        e.preventDefault();
        sendLogin(email, password);
    };

    const sendLogin = async (email, password) => {
        try {
            const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ "email": email, "password": password }),
            });

            if (!resp.ok) {
                throw new Error("Login failed");
            }

            const data = await resp.json();
            localStorage.setItem("jwt-token", data.token);
            navigate("/");
        } catch (error) {
            console.error(error);
            setError("Password or email not valid");
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
                        <form onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    id="email"
                                    className="email"
                                    placeholder="Enter email"
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
                                <Link to="/password" className="forget-password">Forget your password?</Link>
                            </div>
                            {error && <div className="error-message mb-4">{error}</div>}
                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>
                        </form>
                        <p className="mt-3 text-center">Don't have an account? <Link to="/register" className="btn-link">Create account</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
