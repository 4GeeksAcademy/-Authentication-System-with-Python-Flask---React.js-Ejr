import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';

export const Navbar = () => {
    let location = useLocation();

   
    if (location.pathname !== "/login" && location.pathname !== "/register") {
        return (
            <nav className="navbar navbar-light bg-light">
                <div className="container">
                    <Link to="/">
                        <span className="navbar-brand mb-0 h1">React Boilerplate</span>
                    </Link>
                    <div className="ml-auto">
                        <Link to="/demo">
                            <button className="btn btn-primary">Check the Context in action</button>
                        </Link>
                    </div>
                </div>
            </nav>
        );
    } else {
       
        return null;
    }
};
