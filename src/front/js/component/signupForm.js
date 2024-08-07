import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";

export const SignupForm = () => {
    const { store, actions } = useContext(Context);

    const [user, setUser] = useState({
        email: "",
        name: "",
        password: "",
        confim_password: "",
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        console.log(e.target.value)

    };
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // actions.login(user);
        actions.register(user);
        navigate("/");
    };

    return (
        <div className="text-center mt-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-5">
                        <div className="card">
                            <h2 className="card-title text-center">Register</h2>
                            <div className="card-body py-md-4">
                                <form _lpchecked="1" onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <input type="text"
                                            className="form-control"
                                            id="name"
                                            name="name"
                                            placeholder="name"
                                            value={user.name}
                                            onChange={handleChange}
                                            required />
                                    </div>
                                    <div className="form-group">
                                        <input type="email"
                                            className="form-control"
                                            id="email"
                                            name="email"
                                            placeholder="Email"
                                            value={user.email}
                                            onChange={handleChange}
                                            required />
                                    </div>


                                    <div className="form-group">
                                        <input type="password"
                                            className="form-control"
                                            id="password"
                                            name="password"
                                            placeholder="Password"
                                            value={user.password}
                                            onChange={handleChange}
                                            required />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="confim_password"
                                            name="confim_password"
                                            placeholder="Confirm password"
                                            value={user.confim_password}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="d-flex flex-row align-items-center justify-content-between">
                                        <Link to={"/login"}>Login</Link>
                                        <button className="btn btn-primary" type="submit">Create Account</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};