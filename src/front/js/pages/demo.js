import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/signUp.css";

import { Context } from "../store/appContext";

export const Demo = () => {
	const { store, actions } = useContext(Context);
    const [dataForm,setDataForm]=useState({
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = (e) =>{
        const{name,value}=e.target
        setDataForm({...dataForm, [name]: value})
    }

    const handleSubmit = (e) =>{ 
        e.preventDefault() //evita que se recargue la página
        actions.createContact(dataForm)
        setDataForm({
            email: '',
            password: '',
            confirmPassword: ''
        }) 
        console.log(dataForm)
    }

    function toggleCheckbox(alumnoCheck, profesorCheck) {
        const alumnoCheckbox = document.getElementById(alumnoCheck);
        const profesorCheckbox = document.getElementById(profesorCheck);

        if (alumnoCheckbox.checked) {
            profesorCheckbox.checked = false;
        }
    }

    //toggleCheckbox(alumnoCheck, profesorCheck)

    return(
        <div>
            <form className="container d-flex flex-column align-items-center mt-5 p-5" id="formularioRegistro">
				<label>Email
                    <input className="form-control" name="email" value={dataForm.email} placeholder="" onChange={handleChange} type="text"></input>
                </label>
			    <label>Password
                    <input className="form-control" name="phone" value={dataForm.password} placeholder="" onChange={handleChange} type="text"></input>
                </label>
                <label>Confirm Password
                    <input className="form-control" name="address" value={dataForm.confirmPassword} placeholder="" onChange={handleChange} type="text"></input>
                </label>
				<div className="p-3">Registrarse como:</div>
  				<div>
					<div class="mb-3 form-check">
    					<input type="checkbox" class="form-check-input" id="alumnoCheck"></input>
    						<label class="form-check-label" for="alumnoCheck">Alumno</label>
  					</div>
					<div class="mb-3 form-check">
    					<input type="checkbox" class="form-check-input" id="profesorCheck"></input>
    						<label class="form-check-label" for="profesorCheck">Profesor</label>
  					</div>
				</div>
				<input className="btn btn-primary" value="Regístrate" type="submit"/>
			</form>
        </div>
    )
};
