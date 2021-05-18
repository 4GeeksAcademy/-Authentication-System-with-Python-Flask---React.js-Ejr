import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { Link, useHistory } from "react-router-dom";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";
import "../../styles/registerNew.scss";
import Swal from "sweetalert2";

export const RegisterNew = () => {
	const { actions, store } = useContext(Context);
	const history = useHistory();
	const [user, setUser] = useState({
		name: "",
		username: "",
		email: "",
		password: "",
		phonenumber: "",
		usertype: null
	});

	const registerSuccess = () => {
		Swal.fire({
			icon: "success",
			title: "Registro exitoso",
			text: "Redirigiendo a pagina de ingreso",
			showConfirmButton: false,
			timer: 2500
		});
		history.push("/logUserIn");
	};

	const handleChange = e => {
		setUser({
			...user,
			// Trimming any whitespace
			[e.target.name]: e.target.value.trim()
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		// ... submit to API or trigger function
		user.usertype = store.isClient;
		actions.userRegistration(user);
		store.isClient === 1 ? actions.isSellerOrClient(1) : actions.isSellerOrClient(0);
		registerSuccess();
	};

	return (
		<div className="container">
			<div className="row">
				<div className="container">
					<hr />
				</div>
			</div>

			<div className="row">
				<div className="col-md-12">
					<h3>Formulario de Registro</h3>
					<hr />
				</div>
			</div>

			<div className="row">
				<div className="col-md-1">
					<ul className="nav nav-tabs left-tabs sideways-tabs">
						<li className="nav-item">
							<a
								className="nav-link active"
								href="#buyer-sleft"
								data-toggle="tab"
								onClick={() => {
									actions.whosIsRegistering(0);
								}}>
								Comprador
							</a>
						</li>
						<li className="nav-item">
							<a
								className="nav-link"
								href="#seller-sleft"
								data-toggle="tab"
								onClick={() => {
									actions.whosIsRegistering(1);
								}}>
								Vendedor
							</a>
						</li>
					</ul>
				</div>

				<div className="tab-content mt-2">
					<article className="tab-pane container active" id="buyer-sleft">
						<section>
							<div className="wrap-login100 p-l-35 p-r-45 p-t-35 p-b-54  ">
								<form onSubmit={handleChange} className="login100-form">
									<span className="login100-form-title p-b-30">Registro Comprador</span>
									<div className="wrap-input100  m-b-23">
										<span className="label-input100 fas fa-id-badge"> Nombre Completo</span>
										<input
											className="input100"
											type="text"
											name="name"
											placeholder="Ingrese su Nombre Completo"
											onChange={handleChange}
										/>
										<span className="focus-input100" />
									</div>
									<div className="wrap-input100  m-b-23">
										<span className="label-input100 fas  fa-user"> Username</span>
										<input
											className="input100"
											type="text"
											name="username"
											placeholder="Ingrese su Usuario"
											onChange={handleChange}
										/>
										<span className="focus-input100" />
									</div>
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
									<div className="wrap-input100 ">
										<span className="label-input100 fas fa-key"> Password</span>
										<input
											className="input100"
											type="password"
											name="password"
											placeholder="Ingrese su contraseña"
											onChange={handleChange}
										/>
										<span className="focus-input100" />
									</div>
									<div className="wrap-input100  m-b-23">
										<span className="label-input100 fas fa-phone-square"> Numero Telefonico</span>
										<input
											className="input100"
											type="text"
											name="phonenumber"
											placeholder="Ingrese su numero telefonico"
											onChange={handleChange}
										/>
										<span className="focus-input100" />
									</div>

									<div className="container-login100-form-btn  mt-4">
										<div className="wrap-login100-form-btn">
											<div className="login100-form-bgbtn" />
											<button
												type="submit"
												className="login100-form-btn"
												onClick={
													//setUserType("True");
													handleSubmit
												}>
												Registrarse
											</button>
										</div>
									</div>
									{/* 
									<div className="txt1 text-center p-t-40 p-b-20">
										<span>O registrese usando</span>
									</div>

									<div className="flex-c-m">
										<a className="login100-social-item bg1">
											<FacebookLogin
												appId="1167779733658455"
												callback={actions.responseFacebook}
												render={renderProps => (
													<button
														className="fa fa-facebook"
														style={{ color: "white" }}
														onClick={() => {
															console.log(store.appAuth);
														}}
													/>
												)}
											/>
										</a>

										<a className="login100-social-item bg3">
											<GoogleLogin
												clientId="253456588353-u3j0pe2o5mhoj8s93og3o2tt0qfhai7k.apps.googleusercontent.com"
												render={renderProps => (
													<button
														className="fa fa-google"
														style={{ color: "white" }}
														onClick={renderProps.onClick}
														//disabled={renderProps.disabled}
													/>
												)}
												buttonText="Login"
												onSuccess={actions.responseGoogle}
												onFailure={actions.responseGoogle}
												cookiePolicy={"single_host_origin"}
											/>
										</a>
									</div> */}

									<div className="flex-col-c p-t-30">
										<span className="txt1 p-b-17">Ya tiene cuenta?</span>

										<a href="#" className="txt1">
											Ingresar
										</a>
									</div>
								</form>
							</div>
						</section>
					</article>
					<article className="tab-pane container" id="seller-sleft">
						<section className="float-left">
							<div className="wrap-login100 p-l-35 p-r-45 p-t-35 p-b-54">
								<form onSubmit={handleChange} className="login100-form">
									<span className="login100-form-title p-b-30">Registro Vendedor</span>
									<div className="wrap-input100  m-b-23">
										<span className="label-input100 fas fa-id-badge"> Nombre Completo</span>
										<input
											className="input100"
											type="text"
											name="name"
											placeholder="Ingrese su Nombre Completo"
											onChange={handleChange}
										/>
										<span className="focus-input100" />
									</div>
									<div className="wrap-input100  m-b-23">
										<span className="label-input100 fas  fa-user"> Username</span>
										<input
											className="input100"
											type="text"
											name="username"
											placeholder="Ingrese su Usuario"
											onChange={handleChange}
										/>
										<span className="focus-input100" />
									</div>
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
									<div className="wrap-input100 ">
										<span className="label-input100 fas fa-key"> Password</span>
										<input
											className="input100"
											type="password"
											name="password"
											placeholder="Ingrese su contraseña"
											onChange={handleChange}
										/>
										<span className="focus-input100" />
									</div>
									<div className="wrap-input100  m-b-23">
										<span className="label-input100 fas fa-phone-square"> Numero Telefonico</span>
										<input
											className="input100"
											type="text"
											name="phonenumber"
											placeholder="Ingrese su numero telefonico"
											onChange={handleChange}
										/>
										<span className="focus-input100" />
									</div>

									<div className="container-login100-form-btn  mt-4">
										<div className="wrap-login100-form-btn">
											<div className="login100-form-bgbtn" />
											<button className="login100-form-btn" onClick={handleSubmit}>
												Registrarse
											</button>
										</div>
									</div>

									{/* <div className="txt1 text-center p-t-40 p-b-20">
										<span>O registrese usando</span>
									</div>

									<div className="flex-c-m">
										<a className="login100-social-item bg1">
											<FacebookLogin
												appId="1167779733658455"
												callback={actions.responseFacebook}
												render={renderProps => (
													<button
														className="fa fa-facebook"
														style={{ color: "white" }}
														onClick={renderProps.onClick}
													/>
												)}
											/>
										</a>

										<a className="login100-social-item bg3">
											<GoogleLogin
												clientId="253456588353-u3j0pe2o5mhoj8s93og3o2tt0qfhai7k.apps.googleusercontent.com"
												render={renderProps => (
													<button
														className="fa fa-google"
														style={{ color: "white" }}
														onClick={renderProps.onClick}
														//disabled={renderProps.disabled}
													/>
												)}
												buttonText="Login"
												onSuccess={actions.responseGoogle}
												onFailure={actions.responseGoogle}
												cookiePolicy={"single_host_origin"}
											/>
										</a>
									</div> */}

									<div className="flex-col-c p-t-30">
										<span className="txt1 p-b-17">Ya tiene cuenta?</span>

										<a href="#" className="txt1">
											Ingresar
										</a>
									</div>
								</form>
							</div>
						</section>
					</article>
				</div>
			</div>
		</div>
	);
};
