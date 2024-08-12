import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/login.css";
import { Context } from "../store/appContext";

//PENDIENTE CAMBIAR FUNCIONES Y CONECTAR CON API

export const Login = () =>{
    const { store, actions } = useContext(Context);
    const [dataForm,setDataForm]=useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [visible,setVisible]=useState(false);

    const handleChange = (e) =>{
        const{name,value}=e.target
        setDataForm({...dataForm, [name]: value})
    };

    const handleClick = (e) =>{
        e.preventDefault()
        setVisible(!visible)
    };

    const handleSubmit = (e) =>{ 
        e.preventDefault() //evita que se recargue la página
        /*actions.createContact(dataForm)*/
        setDataForm({
            email: '',
            password: '',
            confirmPassword: ''
        }) 
        console.log(dataForm)
    }

	return(
        <div>
            <form className="container d-flex flex-column align-items-center mt-5 p-3" id="formularioLogin" onSubmit={handleSubmit}>
                <h4 className="mt-2 mb-4">INICIA SESIÓN</h4>
				<label>Email
                    <input className="form-control" name="email" value={dataForm.email} placeholder="Introduce tu email aquí" onChange={handleChange} type="text"></input>
                </label>
			    <label>Password
                    <input className="form-control" name="password" value={dataForm.password} placeholder="" onChange={handleChange} type={visible ? "text" : "password"}></input>
                    <button onClick={handleClick}>
                        {visible? <span class="fa-solid fa-eye-slash"></span>:<span className="fa-solid fa-eye"></span>}
                    </button>
                </label>
				<input className="btn btn-primary mt-3" value="Iniciar sesión" type="submit"/>
			</form>
        </div>
    )
};
