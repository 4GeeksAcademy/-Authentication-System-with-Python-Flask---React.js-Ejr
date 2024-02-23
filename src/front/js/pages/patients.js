import "../../styles/home.css";
import React from "react";
import { Link } from "react-router-dom";

export const Patients =() => {
    
    return (
        <div className="container">
            <h1>Kever</h1>
            <h3>Matches, Mates, Movies</h3>
            <Link to="/login">
                <button>Conectarse</button>
            </Link>
        </div>
    );
};