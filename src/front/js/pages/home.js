import React from "react";
import { Link } from "react-router-dom";
import encuentraImagen from "/src/front/img/encuentra.png";
import "../../styles/home.css";

export const Home = () => {
    return (
        <div className="text-center mt-5">
            <h1>HOME</h1>
            <div className="column-container">
                <h4 className="mt-5 mb-5">Descripción llamativa de lo que puedes hacer con nuestro juego</h4>
                <Link to="/lista-tesoros">
                    <img src={encuentraImagen} alt="Encuentra tu tesoro" className="image" />
                </Link>

                <Link to="/formulario-tesoro">
                    <button className="btn btn-success">Hide your treasure</button>
                </Link>
            </div>
        </div>
    );
};
