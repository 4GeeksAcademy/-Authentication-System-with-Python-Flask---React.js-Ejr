import React, { useContext } from "react";
import { Context } from "../store/appContext";
import usuario from "../../img/usuario.png";
import "../../styles/perfil.css";
import {NavbarRegistro} from "../component/navbar-registro";

export const Perfil = () => {
	const { store, actions } = useContext(Context);

	return (
        <>
        <NavbarRegistro/>
		<div className="d-flex justify-content-around my-4">
			<div className="d-flex flex-column align-items-center">
				<img  id="img-perfil" src={usuario} alt="equipo stark"/>
				<div className="d-flex justify-content-bewteen my-4">
					<div id="favoritos" className="mx-3"><p>Favoritos</p></div>
					<div id="interacciones"><p>Ultimas interacciones</p></div>
				</div>
			</div>
			<form id="formulario" className="">
			<h2 id="title" className="my-3" >Hola, Usuario</h2>
			<div className="mb-3 d-flex mx-4" id="name">
				<label id="info-name" for="exampleInputName" className="form-label">Nombre</label>
				<input type="text" className="form-control" id="data"/>
				<button type="submit" id="boton2">Cambiar</button>
			</div>
			<div className="mb-3 d-flex mx-4">
				<label id="email" for="exampleInputEmail1" className="form-label">Correo Electronico</label>
				<input type="email" className="form-control" id="data" aria-describedby="emailHelp"/>
				<button type="submit" id="boton2">Cambiar</button>
			</div>
			<div className="mb-3 d-flex mx-4">
				<label id="password" for="exampleInputPassword1" className="form-label">Contraseña</label>
				<input type="password" className="form-control" id="data"/>
				<button type="submit" id="boton2">Cambiar</button>
			</div>
			<div className="d-flex mx-4">
				<label id="info-number" for="exampleInputNumber" className="form-label">Numero Telefonico</label>
				<input type="text" className="form-control" id="data" placeholder="+56 9"/>
				<button type="submit" id="boton2">Cambiar</button>
			</div>
			<button type="submit" id="boton">Guardar Cambios</button>
		</form>	
		</div>
        </>
	);
};