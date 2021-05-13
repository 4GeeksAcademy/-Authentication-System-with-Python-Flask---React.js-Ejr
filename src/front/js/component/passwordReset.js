import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";
import logo from "../../img/logo.jpeg";
import Swal from "sweetalert2";

export const PasswordReset = () => {
	const { actions } = useContext(Context);
	const history = useHistory();
	const [userToReset, setUserToReset] = useState({
		email: "",
		tempPassword: "",
		newPassword: "",
		repeatPassword: ""
	});

	const resetAlert = () => {
		Swal.fire({
			icon: "success",
			title: "Cambio de contraseña",
			text: "Su contraseña ha sido modificada con existo",
			showConfirmButton: false,
			timer: 2500
		});
		history.push("/logUserIn");
	};

	const handleChange = e => {
		setUserToReset({
			...user,
			// Trimming any whitespace
			[e.target.name]: e.target.value.trim()
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		// ... submit to API or something
		actions.recoverPassword(userToReset);
		resetAlert();
	};

	// reset api
	return (
		<div className="container my-5">
			<section>
				<div className="wrap-login100 p-l-55 p-r-55 p-t-35 p-b-54 mx-auto d-block">
					<form onSubmit={handleChange} className="login100-form">
						<span className="login100-form-title p-b-30">Cambio de Contraseña</span>
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
						<div className="wrap-input100  m-b-23">
							<span className="label-input100 fas fa-envelope"> Contraseña Temporal</span>
							<input
								className="input100"
								type="text"
								name="tempPassword"
								placeholder="Ingrese su Contraseña temporal"
								onChange={handleChange}
							/>
							<span className="focus-input100" />
						</div>
						<div className="wrap-input100  m-b-23">
							<span className="label-input100 fas fa-envelope"> Nueva Contraseña</span>
							<input
								className="input100"
								type="text"
								name="newPassword"
								placeholder="Ingrese la nueva contraseña"
								onChange={handleChange}
							/>
							<span className="focus-input100" />
						</div>
						<div className="wrap-input100  m-b-23">
							<span className="label-input100 fas fa-envelope"> Contraseña</span>
							<input
								className="input100"
								type="text"
								name="repeatPassword"
								placeholder="Ingrese nuevamente la nueva contraseña"
								onChange={handleChange}
							/>
							<span className="focus-input100" />
						</div>
						<div className="container-login100-form-btn">
							<div className="wrap-login100-form-btn">
								<div className="login100-form-bgbtn" />
								<button type="submit" onClick={handleSubmit} className="login100-form-btn">
									Cambiar Contraseña
								</button>
							</div>
						</div>
					</form>
				</div>
			</section>
		</div>
	);
};
