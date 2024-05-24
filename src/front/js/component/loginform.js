import React,{useContext, useState} from "react";
 import { Context } from "../store/appContext";
 import { useNavigate} from "react-router-dom";
 import { ModalRecuperarContraseña } from "./modalrecuperarcontraseña.js";
 import swal from 'sweetalert';
 import "../../styles/index.css";

 export const LoginForm = () => {
    const {actions} = useContext(Context)
    const [inputEmail, setInputEmail]=useState("")
    const [inputPassword, setInputPassword]=useState("")
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault()
        let isLogged = await actions.login(inputEmail, inputPassword) 
        if (isLogged){
            console.log('Login successful');
            navigate("/"); 
        } else {
            swal ( "Correo o contraseña incorrectos", "Por favor inténtelo de nuevo" ,  "error" )
        }
    };
    return (
        <div className="contactForm">
            <h1 className="title text-center pb-4">Iniciar sesión</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label" style={{ color: 'brown' }}>Correo electrónico</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Ingrese su correo electrónico" onChange={(e) => setInputEmail(e.target.value)} />
                </div>
                <div className="mb-2">
                    <label htmlFor="exampleInputPassword" className="form-label" style={{ color: 'brown' }}>Contraseña</label>
                    <input type="password" className="form-control" id="exampleInputPassword" placeholder="xxxxxxx" onChange={(e) => setInputPassword(e.target.value)} />
                </div>
                <div className="d-flex justify-content-center mb-3">
                    <button type="submit" className="login btn-lg btn-dark mt-3">Iniciar sesión</button>
                </div>
                <div className="d-flex justify-content-center">
                    <ModalRecuperarContraseña />
                </div>
            </form>
        </div>
    )
};