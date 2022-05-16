import React from "react";
import "../../styles/login.css";
import { Link } from "react-router-dom";
export const UserRegister = () => {
	return (
		<div className="container my-5">
			<form>
				<div class="form-group">
					<label>Nombre completo</label>
					<input
						type="text"
						class="form-control"
						id="InputNombre"
						aria-describedby="emailHelp"
						placeholder="Ingresa tu nombre"
					/>
					<label>Rut</label>
					<input
						type="text"
						class="form-control"
						id="Rut"
						aria-describedby="emailHelp"
						placeholder="Ingresa tu rut"
					/>
					<label>Telefono</label>
					<input
						type="telephone"
						class="form-control"
						id="InputTelefono"
						aria-describedby="emailHelp"
						placeholder="Ingresa tu telefono"
					/>
					<label>Email</label>
					<input
						type="email"
						class="form-control"
						id="InputEmail1"
						aria-describedby="emailHelp"
						placeholder="Ingresa tu email"
					/>
					<small id="emailHelp" class="form-text text-muted">
						Nunca compartiremos tu Email con nadie.
					</small>
				</div>
				<div class="form-group">
					<label>Contraseña</label>
					<input
						type="password"
						class="form-control"
						id="InputPassword1"
						placeholder="Ingresa tu contraseña"
					/>
					<label>Confirma tu Contraseña</label>
					<input
						type="password"
						class="form-control"
						id="InputPassword2"
						placeholder="Reingresa tu contraseña"
					/>
				</div>

				<Link to="/user_profile_setup">
					<button type="submit" className="btn btn-primary">
						Sign in
					</button>
				</Link>
			</form>
		</div>
	);
};
