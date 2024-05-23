import React, { useState, useContext } from 'react';
import { Context } from "../store/appContext";
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"; // Importación de los iconos

export const LogIn = () => {
    const navigate = useNavigate();
    const { actions } = useContext(Context);
    const [logInData, setLogInData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña

    const handleInputChange = (e) => {
        setLogInData({ ...logInData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let success = await actions.submitLogInForm(logInData);
            if (success) {
                navigate('/');
            } else {
                setError('Failed to log in. Please try again.');
            }
        } catch (error) {
            setError('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <div>
            <h1>Log In</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" onChange={handleInputChange} required />

                <label htmlFor="password">Password:</label>
                <div className="password-wrapper">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        onChange={handleInputChange}
                        required
                    />
                    <span className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                    </span>
                </div>

                <button type="submit">Log In</button>
                <Link to="/signup">
                    <button type="button">Sign Up</button>
                </Link>
            </form>
        </div>
    );
};

