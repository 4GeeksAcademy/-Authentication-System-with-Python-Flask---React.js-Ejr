import React from "react";
import "../../styles/login.css";

export const userRegister = () => {
	return (
		<div className="my-5">
			<h3 className="auth__title">Registro</h3>
			<form>
				<input
					className="auth__input"
					type="text"
					placeholder="Nombre"
					name="nombre"
				/>
				<input
					className="auth__input"
					type="text"
					placeholder="Email"
					name="email"
				/>
				<input
					className="auth__input"
					type="password"
					placeholder="Contraseña"
					name="password"
				/>
				<input
					className="auth__input"
					type="password2"
					placeholder="Confirma tu Contraseña"
					name="password"
				/>
				<input
					className="auth__input"
					type="text"
					placeholder="Salario"
					name="sueldo"
				/>
				<input
					className="auth__input"
					type="text"
					placeholder="Salario Complementario"
					name="complemento"
				/>
				<input
					className="auth__input"
					type="text"
					placeholder="Capacidad de ahorro"
					name="ahorro"
				/>
				<input
					className="auth__input"
					type="text"
					placeholder="Deudas"
					name="deudas"
				/>

				<button
					className="btn btn-formulario btn-block mb-5"
					type="submit"
					disabled={true}
				>
					Registrarse
				</button>
			</form>
		</div>
	);
};
