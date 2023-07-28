import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Moviestar from "../../img/Moviestar.png";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<img id="mo" src={Moviestar} />
		<form>
            <div>
                <label for="username"></label>
                <input className="text-center" type="text" id="username" required placeholder="Usuario"></input>
            </div>
            <br/>
            <div>
                <label for="password"></label>
                <input className="text-center" type="password" id="password" required placeholder="Contraseña"></input>
                <br/>
                <a id="ps" href="#aja">Restablecer Contraseña.</a>
            </div>
			<br/>
            <button type="button" id="login-button">Entrar</button>
            <br/>
            <a id="pd" href="#aja">¿No tienes una cuenta?Registrate</a>
        </form>
		</div>
	);
};
