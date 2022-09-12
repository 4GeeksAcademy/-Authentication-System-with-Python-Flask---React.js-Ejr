import React, { useContext } from "react";
import { Context } from "../store/appContext";
import dinero from "../../img/dinero.png";
import avatar from "../../img/avatar.png";
import "../../styles/registro.css";
import { Link } from "react-router-dom";

export const Registro = () => {
	const { store, actions } = useContext(Context);

	return (
		<div id="fondo" className="d-flex justify-content-around my-4">
			<div className="d-flex flex-column align-items-center">
				<img id="img-envio" src={dinero} alt="envio de dinero al exterior" />
				<div className="d-flex">
					<img id="avatar" src={avatar} alt="persona que da el dialogo" />
					<div class="speech-bubble">Registrate gratis con nosotros y compara entre las mas conocidas casas de cambio / remesas del pais y elige la mejor opción para TI</div>
				</div>
			</div>
			<div>
			<form id="formulario" className="">
				<h3 id="title" className="my-3" >Registrate</h3>
				<div className="mb-3">
					<label id="info-name" for="exampleInputName" className="form-label">Ingresa tu nombre</label>
					<input type="text" className="form-control" id="name" />
				</div>
				<div className="mb-3">
					<label id="email" for="exampleInputEmail1" className="form-label">Correo Electronico</label>
					<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
				</div>
				<div className="mb-3">
					<label id="password" for="exampleInputPassword1" className="form-label">Contraseña</label>
					<input type="password" className="form-control" id="exampleInputPassword1" />
				</div>
				<div className="mb-3">
					<label id="c-password" for="exampleInputPassword1" className="form-label">Confirma tu contraseña</label>
					<input type="password" className="form-control" id="exampleInputPassword1" />
				</div>
				<div className="mb-3">
					<label id="info-number" for="exampleInputNumber" className="form-label">Numero Telefonico</label>
					<input type="text" className="form-control" id="number" placeholder="+56 9" />
				</div>
				
				<button type="submit" id="boton">Crear Usuario</button>
			
				
			</form>
			</div>
		</div>
	);
};
