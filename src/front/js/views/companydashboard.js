import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const CompanyDashboard = () => {
	return (
		<>
			<h1>Estos son tus proyectos ya publicados:</h1>
			<br />
			<h1>Formulario para subir un proyecto:</h1>
			<div className="container my-5">
				<form>
					<div class="form-group">
						<label>Nombre del Proyecto</label>
						<input
							type="text"
							class="form-control"
							id="InputNombre"
							aria-describedby="emailHelp"
							placeholder="Ingresa tu nombre"
						/>
						<label>Direccion</label>
						<input
							type="text"
							class="form-control"
							id="Rut"
							aria-describedby="emailHelp"
							placeholder="Ingresa tu rut"
						/>
						<label>Mt2</label>
						<input
							type="telephone"
							class="form-control"
							id="InputTelefono"
							aria-describedby="emailHelp"
							placeholder="Ingresa tu telefono"
						/>
						<label>Precio</label>
						<input
							type="email"
							class="form-control"
							id="InputEmail1"
							aria-describedby="emailHelp"
							placeholder="Ingresa tu email"
						/>
					</div>
					<div class="form-group">
						<label>Foto</label>
						<input
							type="password"
							class="form-control"
							id="InputPassword1"
							placeholder="Ingresa tu contraseña"
						/>
					</div>

					<Link to="/user_profile_setup">
						<button type="submit" className="btn btn-primary">
							Publicar
						</button>
					</Link>
				</form>
			</div>
		</>
	);
};
