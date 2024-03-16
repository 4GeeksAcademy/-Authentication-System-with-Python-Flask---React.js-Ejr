import React, { useContext, useState } from "react";
import "../../styles/login.css";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Login = () => {
    const { actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [formError, setFormError] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();

        // Verificar si algún campo está vacío
        if (email === "" || password === "") {
            setFormError(true);
            return;
        }

        // Resetear el estado de error del formulario
        setFormError(false);

        actions.login(email, password);
    };

    return (
        <form onSubmit={handleLogin}>
            <div>
                <h1>Login</h1>
                <p>
                    Don’t have an account? <Link to="/signup">Create now</Link>
                </p>
            </div>

            <div className={`mb-3 ${formError && email === "" ? "error" : ""}`}>
                <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                </label>
                <input
                    placeholder="email@email.com"
                    type="email"
                    className={`form-control ${formError && email === '' ? 'error' : ''}`}
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={(e) => setEmail(e.target.value)}
                />
                {formError && email === "" && (
                    <div className="error-message">Email is required</div>
                )}
            </div>

            <div className={`mb-3 ${formError && password === "" ? "error" : ""}`}>
                <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                </label>
                <div className="input-group">
                    <input
                        placeholder="**********"
                        type="password"
                        className={`form-control ${formError && email === '' ? 'error' : ''}`}
                        id="exampleInputPassword1"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="input-group-text">
                        <i className="fa fa-eye"></i>
                    </div>
                </div>
                {formError && password === "" && (
                    <div className="error-message">Password is required</div>
                )}
            </div>

            <div className="mb-3 row form-check">
                <div className="col-auto">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">
                        {" "}
                        Remember me
                    </label>

                    <Link className="form-check-label forgotPassword" to="/forgot">
                        Forgot Password?
                    </Link>
                </div>
            </div>

            <div className="d-grid gap-2">
                <button type="submit" className="btn btn-success">
                    Login
                </button>
            </div>
        </form>
    );
};

export default Login;
