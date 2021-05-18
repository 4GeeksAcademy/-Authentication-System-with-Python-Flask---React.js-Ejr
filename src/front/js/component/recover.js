import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import logo from "../../img/logo.jpeg";
import Swal from "sweetalert2";
import "../../styles/registerNew.scss";

export const PassRecovery = () => {
	const { actions } = useContext(Context);
	const history = useHistory();
	const [resetEmail, setResetEmail] = useState({ email: "" });

	const resetAlert = () =>
		Swal.fire({
			icon: "success",
			title: "Recuperacion de Contraseña",
			text:
				"Si el email o usuario existe en nuestra base de datos, recibira un correo con el link para re-establecer su contaseña.",
			showConfirmButton: true
		});

	const handleChange = e => {
		setResetEmail({
			...resetEmail,
			// Trimming any whitespace
			[e.target.name]: e.target.value.trim()
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		// ... submit to API or something
		actions.recoverPassword(resetEmail);
		resetAlert();
		history.push("/");
	};

	return (
		<div className="container my-5">
			<section>
				<div className="wrap-login100 p-l-55 p-r-55 p-t-35 p-b-54 mx-auto d-block">
					<form onSubmit={handleChange} className="login100-form">
						<span className="login100-form-title p-b-30">Recuperacion de Contraseña</span>
						<div className="wrap-input100  m-b-23">
							<span className="label-input100 fas fa-envelope"> Email</span>
							<input
								className="input100"
								type="text"
								name="email"
								placeholder="Ingrese su Correo electronico"
								onChange={handleChange}
							/>
							<span className="focus-input100" />
						</div>
						<div className="container-login100-form-btn">
							<div className="wrap-login100-form-btn">
								<div className="login100-form-bgbtn" />
								<button className="login100-form-btn" onClick={handleSubmit}>
									Recuperar Contraseña
								</button>
							</div>
						</div>
					</form>
				</div>
			</section>
		</div>
	);
};
