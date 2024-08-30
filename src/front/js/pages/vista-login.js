import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Login } from "../component/login.jsx"
import "../../styles/registro-login.css"

const VistaLogin = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Verificar si el token existe en el localStorage
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/perfil");
        }
    }, [navigate]);

    return (
        <div className="container-fluid vh-100 d-flex align-items-center justify-content-center row">
           
                <div className="col-md-6 d-flex align-items-center justify-content-center rectangle-10">

                    <Login />

                </div>
           

        </div>
    );
};
export default VistaLogin;