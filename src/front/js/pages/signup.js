import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const SignUp = () => {
	const { store, actions } = useContext(Context);

	return (
        <>
		    <form className="login-form d-flex align-items-center flex-direction-column container justify-content-center  w-50">
                <h3 className="d-block p-1">Registrate!</h3>
                <input name="email" placeholder="Ejemplo@gmail.com" className="w-100 p-2"></input>
                <input name="password"placeholder="Ingresa tu contraseña" className="w-100 p-2"></input>
                <h5>Codigo de invitacion</h5>
                <input name="password"placeholder="Ingresa tu codigo de invitacion" className="w-100 p-2"></input>
                <hr/>
                <button className="p-3 w-50 border-0 bg-pink" >Ingresar</button>
                <h5><Link to ="/catalogue">Regresa al catalogo!</Link></h5>
                
            </form>
        </>
	);
};
