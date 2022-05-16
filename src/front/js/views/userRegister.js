import React from "react";
import "../../styles/login.css";
import { Link } from "react-router-dom";
export const UserRegister = () => {
	return (
		<div className="container my-5">
			<form>
				<div class="form-group">
					<label for="exampleInputEmail1">Nombre completo</label>
					<input
						type="email"
						class="form-control"
						id="exampleInputEmail1"
						aria-describedby="emailHelp"
						placeholder="Ingresa tu nombre"
					/>
					<label for="exampleInputEmail1">Rut</label>
					<input
						type="text"
						class="form-control"
						id="exampleInputEmail1"
						aria-describedby="emailHelp"
						placeholder="Ingresa tu rut"
					/>
					<label for="exampleInputEmail1">Telefono</label>
					<input
						type="telephone"
						class="form-control"
						id="exampleInputEmail1"
						aria-describedby="emailHelp"
						placeholder="Ingresa tu telefono"
					/>
					<label for="exampleInputEmail1">Email</label>
					<input
						type="email"
						class="form-control"
						id="exampleInputEmail1"
						aria-describedby="emailHelp"
						placeholder="Ingresa tu email"
					/>
					<small id="emailHelp" class="form-text text-muted">
						Nunca compartiremos tu Email con nadie.
					</small>
				</div>
				<div class="form-group">
					<label for="exampleInputPassword1">Contraseña</label>
					<input
						type="password"
						class="form-control"
						id="exampleInputPassword1"
						placeholder="Ingresa tu contraseña"
					/>
					<label for="exampleInputPassword1">Confirma tu Contraseña</label>
					<input
						type="password"
						class="form-control"
						id="exampleInputPassword1"
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
