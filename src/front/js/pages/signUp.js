import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/signUp.css";
import { Context } from "../store/appContext";

//PENDIENTE CAMBIAR FUNCIONES Y CONECTAR CON API

//PENDIENTE CAMBIAR FUNCIONES Y CONECTAR CON API

export const SignUp = () =>{
	const { store, actions } = useContext(Context);
    const [dataForm,setDataForm]=useState({
        email: '',
        password: '',
        confirmPassword: '',
        //is_teacher: false,  // Nuevo campo para registrar como profesor
        
    });
    const [visible,setVisible]=useState(false);
    //const navigate = useNavigate();  // Para redirigir después del registro

    const handleChange = (e) =>{
        const{name,value}=e.target
        setDataForm({...dataForm, [name]: value})
    }

    const handleClick = (e) =>{
        e.preventDefault()
        setVisible(!visible)
    };


    const handleSubmit = (e) =>{ 
        e.preventDefault() 
        actions.createContact(dataForm)
        setDataForm({
            email: '',
            password: '',
            confirmPassword: ''
        }) 
        console.log(dataForm)
    }

    return(
        <div>
            <form className="container d-flex flex-column align-items-center mt-5 p-3" id="formularioRegistro" onSubmit={handleSubmit}>
                <h4 className="mt-2 mb-4">Regístrate y comienza a aprender</h4>
				<label>Email
                    <input className="form-control" name="email" value={dataForm.email} placeholder="Introduce tu email aquí" onChange={handleChange} type="text"></input>
                </label>
			    <label>Password
                <div className="contenedor-password">
                    <input className="form-control" name="password" value={dataForm.password} placeholder="" onChange={handleChange} type={visible ? "text" : "password"}></input>
                    {visible? <span class="fa-solid fa-eye-slash icon" onClick={handleClick}></span>:<span className="fa-solid fa-eye icon" onClick={handleClick}></span>}
                </div>
                </label>
                <label>Confirm Password
                <div className="contenedor-password">
                    <input className="form-control" name="confirmPassword" value={dataForm.confirmPassword} placeholder="" onChange={handleChange} type={visible ? "text" : "password"}></input>
                    {visible? <span class="fa-solid fa-eye-slash icon" onClick={handleClick}></span>:<span className="fa-solid fa-eye icon" onClick={handleClick}></span>}
                </div>
                </label>
				<div className="p-3">Registrarse como:</div>
  				<div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"></input>
                    <label className="form-check-label" for="flexRadioDefault1">
                        Alumno
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked></input>
                    <label className="form-check-label" for="flexRadioDefault2">
                        Profesor
                    </label>
                </div>
				<input className="btn btn-primary mt-3" value="Regístrate" type="submit"/>
			</form>
        </div>
    )
};