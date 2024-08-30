import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Register } from "../component/register.jsx"
import "../../styles/registro-login.css"

const VistaRegister = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Verificar si el token existe en el localStorage
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/perfil");
        }
    }, [navigate]);
    
    return (
        <div className="container-fluid d-flex align-items-center justify-content-center row mt-5" style={{ minHeight: '100vh' }}>
                <div className="col-md-8 d-flex align-items-center justify-content-center rectangle-10">

                    <Register />

                </div>
            </div>

        // </div>
    );
};
export default VistaRegister;