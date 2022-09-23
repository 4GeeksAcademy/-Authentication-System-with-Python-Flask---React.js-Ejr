import React, { useContext } from "react";
import { Context } from "../store/appContext";
import dinero from "../../img/dinero.png";
import avatar from "../../img/avatar.png";
import "../../styles/registro.css";
import { Link } from "react-router-dom";
import NavbarRegistro from "../component/navbar-registro"

export const Registro = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
			<div className="d-flex justify-content-around my-4">
				<div id="imagen-comentario" className="d-flex flex-column align-items-center">
					<img id="img-envio" src={dinero} alt="envio de dinero al exterior" style={{width:"500px",height:"500px" }}/>
					<div className="d-flex">
						<img id="avatar" src={avatar} alt="persona que da el dialogo" />
						<div className="speech-bubble">Regístrate gratis con nosotros, compara entre las más conocidas casas de cambio del país y elige la mejor opción para TI.</div>
					</div>
				</div>
				<div>
					<form id="formulario" className="">
						<h3 id="title" className="my-3">Regístrate</h3>
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
							<label id="info-number" for="exampleInputNumber" className="form-label">Número Telefónico</label>
							<input type="text" className="form-control" id="number" placeholder="+56 9" />
						</div>
						<Link to="/home"><button type="submit" id="boton">Crear Usuario</button></Link>

					</form>
				</div>
			</div>
		</>
	);
};
