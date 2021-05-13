import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";
import logo from "../../img/logo.png";
import Swal from "sweetalert2";

export const Register = () => {
	const [newUser, setNewUser] = useState({
		name: "",
		username: "",
		email: "",
		password: ""
	});
	const { actions } = useContext(Context);

	const regAlert = () => {
		Swal.fire({
			icon: "success",
			title: "Creación de Cuenta",
			text: "Cuenta fue registrada exitosamente.",
			showConfirmButton: true
		}).then(() => {
			window.location = "/logUserIn";
		});
	};

	const handleChange = e => {
		const { name, value } = e.target;
		setNewUser(newUser => ({
			...newUser,
			[name]: value
		}));
	};

	const createNewUser = event => {
		event.preventDefault();
		actions.userRegistration(newUser);
	};

	return (
		<div className="container">
			<div className="login-form">
				<form onSubmit={createNewUser}>
					<h2 className="text-center">Crear Cuenta</h2>
					<img src={logo} alt="logo" className="img-thumbnail mx-auto d-block rounded my-3" />
					<div className="form-group">
						<div className="input-group">
							<input
								type="text"
								className="form-control"
								name="name"
								onChange={handleChange}
								placeholder="Nombre Completo"
								required="required"
							/>
						</div>
					</div>
					<div className="form-group">
						<div className="input-group">
							<input
								type="text"
								className="form-control"
								name="username"
								onChange={handleChange}
								placeholder="Usuario"
								required="required"
							/>
						</div>
					</div>
					<div className="form-group">
						<div className="input-group">
							<input
								type="email"
								className="form-control"
								name="email"
								onChange={handleChange}
								placeholder="Email"
								required="required"
							/>
						</div>
					</div>
					<div className="form-group">
						<div className="input-group">
							<input
								type="password"
								className="form-control"
								name="password"
								onChange={handleChange}
								placeholder="Contraseña"
								required="required"
							/>
						</div>
					</div>
					<div className="form-group">
						<button
							className="btn btn-login login-btn btn-block"
							onClick={() => {
								createNewUser;
								regAlert();
							}}>
							Crear Cuenta
						</button>
					</div>

					<div className="or-seperator">
						<i>o</i>
					</div>
					<p className="text-center">Crear cuenta con red sociales</p>

					<div className="text-center social-btn">
						<FacebookLogin
							appId="1167779733658455"
							callback={actions.responseFacebook}
							render={renderProps => (
								<button className="social-btn btn-primary" onClick={renderProps.onClick}>
									<i className="fab fa-facebook-f" /> Facebook
								</button>
							)}
						/>{" "}
						<GoogleLogin
							clientId="253456588353-u3j0pe2o5mhoj8s93og3o2tt0qfhai7k.apps.googleusercontent.com"
							render={renderProps => (
								<button
									className="social-btn btn-danger"
									onClick={renderProps.onClick}
									//disabled={renderProps.disabled}
								>
									<i className="fab fa-google" /> Google
								</button>
							)}
							buttonText="Login"
							onSuccess={actions.responseGoogle}
							onFailure={actions.responseGoogle}
							cookiePolicy={"single_host_origin"}
						/>
					</div>
				</form>
				<p className="text-center text-muted small">
					Tienes una cuenta?{" "}
					<Link to="/logUserIn">
						<a>Ingresa aqui!</a>
					</Link>
				</p>
			</div>
		</div>
	);
};
