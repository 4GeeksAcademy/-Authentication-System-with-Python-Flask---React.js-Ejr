import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import logo from "../../img/logo.png";
import Swal from "sweetalert2";

export const PassRecovery = () => {
	const { actions } = useContext(Context);
	const [resetEmail, setResetEmail] = useState({ email: "" });

	const resetAlert = () =>
		Swal.fire({
			icon: "success",
			title: "Recuperacion de Contraseña",
			text:
				"Si el email o usuario existe en nuestra base de datos, recibira un correo con el link para re-establecer su contaseña.",
			showConfirmButton: true
		});

	const handleChange = event => {
		event.preventDefault();
		actions.recoverPassword(resetEmail);
	};

	return (
		<div className="container">
			<div className="login-form">
				<form onSubmit={handleChange}>
					<h2 className="text-center">Recuperacion de contraseña</h2>
					<img src={logo} alt="logo" className="img-thumbnail mx-auto d-block rounded my-3" />
					<div className="form-group">
						<div className="input-group">
							<input
								type="email"
								className="form-control"
								name="email"
								placeholder="Correo electronico"
								required="required"
								onChange={event => {
									setResetEmail({ email: event.target.value });
								}}
							/>
						</div>
					</div>
					<div className="form-group">
						<button type="submit" onClick={resetAlert} className="btn btn-login login-btn btn-block">
							Recuperar Contraseña
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
