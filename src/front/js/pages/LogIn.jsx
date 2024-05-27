import React, { useState, useContext } from 'react';
import { Context } from "../store/appContext";
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"; // Importación de los iconos
import '../../styles/LogIn.css';

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
        <div className="container-fluid row align-items-center login-page">
            <div className="py-1 col-xl-5 justify-content-center align-items-center">
                <div className="pb-1 rounded-1 col-12 row d-flex login-form">
                    <div className="px-1 col-12 row justify-content-center d-flex">
                        <div className="bg-white bg-opacity-10 col-8 justify-content-center d-flex">
                            <p className="text-center text-white fs-2 fw-medium font-family-Inter col-12 m-0 px-3 py-2">Find Pals to Play Today!</p>
                        </div>
                        <div className="bg-white bg-opacity-10 col-7 justify-content-center d-flex">
                            <p className="text-center text-white fs-6 fw-normal font-family-Inter col-12 m-0 px-3 py-2">Please sign in or create an account to start</p>
                        </div>
                    </div>
                    <form className="p-1 col-12 row justify-content-center align-items-center d-flex" onSubmit={handleSubmit}>
                        <div className="col-8 row d-flex">
                            <div className="col-12 row d-flex mb-3">
                                <label className="text-white fs-6 fw-normal font-family-Inter col-12 m-0 px-3 py-2" htmlFor="email">Email Address</label>
                                <div className="rounded-1 col-12 align-items-center">
                                    <div className="px-1 py-1 bg-dark rounded-1 border border-1 border-primary col-12 align-items-center d-flex">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="form-control bg-dark text-white border-0"
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 row d-flex mb-3">
                                <label className="text-white fs-6 fw-normal font-family-Inter col-12 m-0 px-3 py-2" htmlFor="password">Password</label>
                                <div className="rounded-1 col-12 align-items-center">
                                    <div className="px-1 py-1 bg-dark rounded-1 border border-1 border-primary col-12 align-items-center d-flex">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            name="password"
                                            className="form-control bg-dark text-white border-0"
                                            onChange={handleInputChange}
                                            required
                                        />
                                        <span className="password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                                            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white bg-opacity-10 col-12 align-items-center">
                                <button type="submit" className="btn btn-primary w-100">
                                    Login
                                </button>
                            </div>
                        </div>
                        <div className="bg-white bg-opacity-10 col-8 justify-content-center d-flex mt-3">
                            <p className="col-12 m-0 px-3 py-2">
                                <span className="text-white fs-6 fw-normal font-family-Inter">Don’t have an account? </span>
                                <Link to="/signup" className="text-white fs-6 fw-normal font-family-Inter text-decoration-underline">create a new account</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
            <div className="position-relative col-xl-7 row d-none d-xl-block">
                <img className="position-absolute rounded-3 shadow border border-1 border-white border-opacity-75 col-7" src="../img/login-frame.png" alt="placeholder" />
            </div>
        </div>
    );
};
