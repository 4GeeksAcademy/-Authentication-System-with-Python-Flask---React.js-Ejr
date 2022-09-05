import React, { useContext } from "react";
import { Context } from "../store/appContext";
import envio from "../../img/envio-dinero.png";
import "../../styles/home.css";

export const Registro = () => {
	const { store, actions } = useContext(Context);

	return (
	<div className="d-flex justify-content-around my-4">
		<div>
			<img src={envio} alt="envio de dinero al exterior"/>	
		</div>
		<form>
			<div className="mb-3">
				<label for="exampleInputEmail1" className="form-label">Ingresa tu nombre</label>
				<input type="text" className="form-control" id="name"/>
			</div>
			<div className="mb-3">
				<label for="exampleInputEmail1" className="form-label">Correo Electronico</label>
				<input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
			</div>
			<div className="mb-3">
				<label for="exampleInputPassword1" className="form-label">Contraseña</label>
				<input type="password" className="form-control" id="exampleInputPassword1"/>
			</div>
			<div className="mb-3">
				<label for="exampleInputPassword1" className="form-label">Confirma tu contraseña</label>
				<input type="password" className="form-control" id="exampleInputPassword1"/>
			</div>
			
			<button type="submit" className="btn btn-primary">Crear Usuario</button>
		</form>
	</div>
	);
};
