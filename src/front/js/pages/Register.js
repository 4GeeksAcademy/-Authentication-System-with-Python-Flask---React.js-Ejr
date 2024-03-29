import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

const Register = () => {
    const [accountType, setAccountType] = useState("user");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        if (password !== repeatPassword) {
            setError("Las contraseñas no coinciden");
            return; 
        }

        setError(""); 
        const resp = await fetch(process.env.BACKEND_URL + "/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ accountType, email, password })
        });

        if (!resp.ok) throw Error("There was a problem in the signup request");

        const data = await resp.json();
        navigate("/login");
        return data;
    };

    return (
        <div className="auth-container mt-5">
            <div className="container form-body">
                <h2 className="title">Create an account</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="accountType">Account Type</label>
                        <select
                            id="accountType"
                            className="accountType"
                            value={accountType}
                            onChange={(e) => setAccountType(e.target.value)}
                        >
                            <option value="user">User</option>
                            <option value="company">Company</option>
                        </select>
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            className="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-input-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                className="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>
                    </div>
                    <div className="input-group">
                        <label htmlFor="repeatPassword">Repeat Password</label>
                        <div className="password-input-container">
                            <input
                                type={showRepeatPassword ? "text" : "password"}
                                id="repeatPassword"
                                className="password"
                                placeholder="Repeat your password"
                                value={repeatPassword}
                                onChange={(e) => setRepeatPassword(e.target.value)}
                            />
                            <div className="password-toggle-icon" onClick={() => setShowRepeatPassword(!showRepeatPassword)}>
                                {showRepeatPassword ? <FaEyeSlash /> : <FaEye />}
                            </div>
                        </div>
                    </div>
                    {error && <div className="error-message mb-4">{error}</div>}
                    <button type="submit" className="btn btn-success">Register</button>
                    <p className="mt-3 text-center">
                        Already have an account? <a href="/login">Login here</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
