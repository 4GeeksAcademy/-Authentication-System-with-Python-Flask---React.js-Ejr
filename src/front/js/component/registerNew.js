import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useHistory } from "react-router-dom";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";
import "../../styles/registerNew.scss";
import Swal from "sweetalert2";

export const RegisterNew = () => {
	const { actions } = useContext(Context);
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
		actions.userRegistration(user);
		registerSuccess();
	};

	const responseFacebook = response => {
		console.log(response);
	};
	const componentClicked = () => {
		alert("clicked");
	};

	const responseGoogle = response => {
		console.log(response);
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
							<a className="nav-link active" href="#buyer-sleft" data-toggle="tab">
								Comprador
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#seller-sleft" data-toggle="tab">
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

									<div className="text-right p-t-8 p-b-31">
										<a href="#">Olvido su contraseña?</a>
									</div>

									<div className="container-login100-form-btn">
										<div className="wrap-login100-form-btn">
											<div className="login100-form-bgbtn" />
											<button className="login100-form-btn" onClick={handleSubmit}>
												Registrarse
											</button>
										</div>
									</div>

									<div className="txt1 text-center p-t-40 p-b-20">
										<span>O registrese usando</span>
									</div>

									<div className="flex-c-m">
										<a href="#" className="login100-social-item bg1">
											<i className="fa fa-facebook" />
										</a>

										<a href="#" className="login100-social-item bg3">
											<i className="fa fa-google" />
										</a>
									</div>

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

									<div className="text-right p-t-8 p-b-31">
										<a href="#">Olvido su contraseña?</a>
									</div>

									<div className="container-login100-form-btn">
										<div className="wrap-login100-form-btn">
											<div className="login100-form-bgbtn" />
											<button className="login100-form-btn" onClick={handleSubmit}>
												Registrarse
											</button>
										</div>
									</div>

									<div className="txt1 text-center p-t-40 p-b-20">
										<span>O registrese usando</span>
									</div>

									{/* <div className="flex-c-m">
										<a href="#" className="login100-social-item bg1">
											<FacebookLogin
												className="fa fa-facebook"
												appId="1088597931155576"
												autoLoad={true}
												fields="name,email,picture"
												onClick={componentClicked}
												callback={responseFacebook}
											/>
										</a>

										<a href="#" className="login100-social-item bg3">
											<GoogleLogin
												className="fa fa-google"
												clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
												buttonText="Login"
												onSuccess={responseGoogle}
												onFailure={responseGoogle}
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
