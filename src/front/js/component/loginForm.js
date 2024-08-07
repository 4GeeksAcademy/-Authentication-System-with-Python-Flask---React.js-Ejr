import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/home.css";

export const LoginForm = () => {
    const { store, actions } = useContext(Context);

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        console.log(e.target.value);
    };

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await actions.login(user);
        if (success) {
            await actions.getUserProfile();
            navigate("/");
        }
    };

    return (
        <div className="text-center mt-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-5">
                        <div className="card">
                            <h2 className="card-title text-center">Login</h2>
                            <div className="card-body py-md-4">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            placeholder="Email"
                                            value={user.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="password"
                                            name="password"
                                            placeholder="Password"
                                            value={user.password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="d-flex flex-row align-items-center justify-content-between">
                                        <Link to={"/signup"}>Register</Link>
                                        <button type="submit" className="btn btn-primary">Login</button>
                                    </div>
                                    {store.authError && (
                                        <div className="alert alert-danger mt-3">
                                            {store.authError}
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};