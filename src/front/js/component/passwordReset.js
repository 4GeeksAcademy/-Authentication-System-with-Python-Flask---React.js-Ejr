import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import logo from "../../img/logo.jpeg";
import Swal from "sweetalert2";

export const PasswordReset = () => {
	const { actions } = useContext(Context);
	const [userToReset, setUserToReset] = useState({
		email: "",
		tempPassword: "",
		newPassword: "",
		repeatPassword: ""
	});

	const resetAlert = () =>
		Swal.fire({
			icon: "success",
			title: "Cambio de contraseña",
			text: "Su contraseña ha sido modificada con existo",
			showConfirmButton: true
		});

	const passAlert = () =>
		Swal.fire({
			icon: "error",
			title: "Error en nueva contraseña.",
			text: "Las campos de nueva contraseña y repetir contraseña no coinciden.",
			showConfirmButton: true
		});

	const handleChange = e => {
		const { name, value } = e.target;
		setUserToReset(userToReset => ({
			...userToReset,
			[name]: value
		}));
	};

	const submitPasschange = () => {
		handleChange();
		userToReset.newPassword !== userToReset.repeatPassword ? passAlert() : actions.resetPassword(userToReset);
	};

	// reset api
	return (
		<div className="container">
			<div className="login-form">
				<form onSubmit={submitPasschange}>
					<h2 className="text-center">Re-establecer Contraseña</h2>
					<img src={logo} alt="logo" className="img-thumbnail mx-auto d-block rounded my-3" />
					<div className="form-group">
						<div className="input-group">
							<input
								type="email"
								className="form-control"
								name="email"
								placeholder="Email"
								required="required"
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className="form-group">
						<div className="input-group">
							<input
								type="text"
								className="form-control"
								name="tempPassword"
								placeholder="Password Temporal"
								required="required"
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className="form-group">
						<div className="input-group">
							<input
								type="text"
								className="form-control"
								name="newPassword"
								placeholder="Nuevo Password"
								required="required"
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className="form-group">
						<div className="input-group">
							<input
								type="text"
								className="form-control"
								name="repeatPassword"
								placeholder="Repetir Password"
								required="required"
								onChange={handleChange}
							/>
						</div>
					</div>
					<div className="form-group">
						<button type="submit" onClick={resetAlert} className="btn btn-login login-btn btn-block">
							Re-establecer contraseña
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
