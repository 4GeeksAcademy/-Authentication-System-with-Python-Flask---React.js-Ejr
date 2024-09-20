import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { actions } = useContext(Context);
    const [redirectToHome, setRedirectToHome] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSignup = () => {
        actions.signup(email, password);
        // Después de realizar el registro, establece redirectToHome a true
        setRedirectToHome(true);
    };

    // Si redirectToHome es true, redirige al usuario a la página principal
    if (redirectToHome) {
        return <Navigate to="/signupok" replace />;
    }

    return (
        <>
            <div className="container text-center">
                <h1>Registro</h1>
                <br />
                <form>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Contraseña:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSignup}
                    >
                        Registrarse
                    </button>

                    <Link to="/">
                    <button
                        type="button"
                        className="btn btn-primary"
                        style={{margin:"5px"}}
                       
                    >
                        Volver a Inicio
                    </button>
                    </Link>
                </form>
            </div>
        </>
    );
};

export default Signup;