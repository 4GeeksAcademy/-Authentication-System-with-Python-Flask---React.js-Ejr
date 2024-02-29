import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const result = await actions.loginUser(email, password);
            if (result) {
                navigate("/home");
                setEmail('');
                setPassword('');
            }
          } catch (error) {
            console.error("Error en el inicio de sesión:", error.message);
            setErrorMessage(error.message); 
        }  
    };

    const handleInputChange = () => {
        setErrorMessage('');
    };

    return (
        <div className="container login">
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => {setEmail(e.target.value); handleInputChange(); }}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => {setPassword(e.target.value); handleInputChange(); }}
                        required
                    />
                </div>
                {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
                )}
                <div className="text-center">
                    <button type="submit" className="btn btnLogin">
                        Login
                    </button>
                </div>
            </form>
            <div className="mt-3 text-center link">
                <p>
                     Forgot your password? <Link to="/recovery">Recover it here</Link>
                </p>
                <p>
                    <Link to="/">← Go Back</Link>
                </p>
            </div>
        </div>
    );
};