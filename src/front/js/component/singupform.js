import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate} from "react-router-dom";
import swal from 'sweetalert';
import "../../styles/index.css";

export const SignupForm = () => {
    const [inputEmail, setInputEmail]=useState("")
    const [inputPassword, setInputPassword]=useState("")
	const navigate = useNavigate();
    const {actions } = useContext(Context);

    async function handleSubmit(e) {
        e.preventDefault()
        let isSignup = await actions.signup(inputEmail, inputPassword) 
        if (isSignup === "success"){
            swal ( "Registro con éxito" ,  "Gracias por registrarse en nuestra web!" ,  "success" )
            navigate("/");
        } else if (isSignup === "email_exist") {
            swal ( "Este correo ya se encuentra registrado", "Por favor intentelo con otro correo" ,  "error" )
        } else {
            swal ( "Todos los campos son obligatorios" ,  "Por favor intentelo de nuevo" ,  "error" )
        }
    };
    return (
            <div className="contactForm">
                <h1 className="title text-center pb-4">Crear cuenta</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label" style={{ color: 'brown' }}>Correo electrónico</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Ingrese su correo electrónico" onChange={(e) => setInputEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword" className="form-label" style={{ color: 'brown' }}>Contraseña</label>
                        <input type="password" className="form-control" id="exampleInputPassword" placeholder="xxxxxxx" onChange={(e) => setInputPassword(e.target.value)} />
                    </div>
                    <div className="d-flex justify-content-center mt-5">
                        <button type="submit" className="login btn-lg btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">Regístrate</button>
                    </div>
                </form>
            </div>
    )
};