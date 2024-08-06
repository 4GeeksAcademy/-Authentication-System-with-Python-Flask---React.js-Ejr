import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { store, actions } = useContext(Context);

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/">
                    <span className="navbar-brand mb-0 h1">React Boilerplate</span>
                </Link>
                <div className="ml-auto d-flex gap-2">
                    {store.currentUser ? (
                        <>
                            <Link to="/private">
                                <button className="btn btn-primary">Profile</button>
                            </Link>
                            <button className="btn btn-secondary" onClick={() => actions.logout()}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/signup">
                                <button className="btn btn-primary">Sign up</button>
                            </Link>
                            <Link to="/login">
                                <button className="btn btn-primary">Login</button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};