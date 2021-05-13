import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";
import "../../styles/registerNew.scss";

export const RegisterNew = () => {
	const { actions } = useContext(Context);
	const [user, setUser] = useState({
		name: "",
		username: "",
		email: "",
		password: "",
		phonenumber: "",
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
		actions.userRegistration(user);
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

				<div className="col-md-11">
					<div className="container">
						<div className="tab-content">
							<article className="tab-pane container active" id="buyer-sleft">
								<section>
									<div className="wrap-login100 p-l-55 p-r-55 p-t-35 p-b-54">
										<form className="login100-form">
											<span className="login100-form-title p-b-30">Registro Comprador</span>
											<div className="wrap-input100  m-b-23">
												<span className="label-input100 fas fa-id-badge"> Nombre Completo</span>
												<input
													className="input100"
													type="text"
													name="name"
													placeholder="Ingrese su Nombre Completo"
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
												/>
												<span className="focus-input100" />
											</div>

											<div className="text-right p-t-8 p-b-31">
												<a href="#">Olvido su contraseña?</a>
											</div>

											<div className="container-login100-form-btn">
												<div className="wrap-login100-form-btn">
													<div className="login100-form-bgbtn" />
													<button className="login100-form-btn">Registrarse</button>
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
								<section>
									<div className="wrap-login100 p-l-55 p-r-55 p-t-35 p-b-54">
										<form className="login100-form">
											<span className="login100-form-title p-b-30">Registro Vendedor</span>
											<div className="wrap-input100  m-b-23">
												<span className="label-input100 fas fa-id-badge"> Nombre Completo</span>
												<input
													className="input100"
													type="text"
													name="name"
													placeholder="Ingrese su Nombre Completo"
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
												/>
												<span className="focus-input100" />
											</div>

											<div className="text-right p-t-8 p-b-31">
												<a href="#">Olvido su contraseña?</a>
											</div>

											<div className="container-login100-form-btn">
												<div className="wrap-login100-form-btn">
													<div className="login100-form-bgbtn" />
													<button className="login100-form-btn">Registrarse</button>
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
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
