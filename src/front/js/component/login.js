import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import logo from "../../img/logo.jpeg";
import "../../styles/registerNew.scss";
export const Login = () => {
	const { actions, store } = useContext(Context);

	const [user, setUser] = useState({
		username: "",
		password: "",
		usertype: null
	});

	const handleChange = e => {
		setUser({
			...user,
			// Trimming any whitespace
			[e.target.name]: e.target.value.trim()
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		// ... submit to API or something
		user.usertype = parseInt(store.isSeller);
		actions.userLogIn(user);
	};
	return (
		<div className="container my-4">
			<section>
				<div className="wrap-login100 p-l-55 p-r-55 p-t-35 p-b-54 mx-auto d-block">
					<form onSubmit={handleChange} className="login100-form">
						<span className="login100-form-title p-b-30">
							{store.isSeller === 1 ? "Iniciar sesión Vendedor" : "Iniciar sesión Comprador"}{" "}
						</span>
						<div className="wrap-input100  m-b-23">
							<span className="label-input100 fas fa-envelope"> Usuario</span>
							<input
								className="input100"
								type="text"
								name="username"
								placeholder="Ingrese su usuario"
								required
								onChange={handleChange}
							/>
							<span className="focus-input100" />
						</div>
						<div className="wrap-input100  m-b-23">
							<span className="label-input100 fas fa-envelope"> Contraseña</span>
							<input
								className="input100"
								type="text"
								name="password"
								placeholder="Ingrese su Contraseña"
								required
								onChange={handleChange}
							/>
							<span className="focus-input100" />
						</div>
						<div className="container-login100-form-btn">
							<div className="wrap-login100-form-btn">
								<div className="login100-form-bgbtn" />
								<button type="submit" onClick={handleSubmit} className="login100-form-btn">
									Ingresar
								</button>
							</div>
						</div>
						<div className="text-right p-t-8 p-b-31">
							<Link to="/recoverLogIn">
								<a>Olvido su contraseña?</a>
							</Link>
						</div>
					</form>
				</div>
			</section>
		</div>
	);
};
