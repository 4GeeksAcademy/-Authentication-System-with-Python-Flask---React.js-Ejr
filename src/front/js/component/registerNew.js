import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import "../../styles/registerNew.scss";

export const RegisterNew = () => {
	const { actions, store } = useContext(Context);
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
		// ... submit to API or trigger function
		user.usertype = store.isClient;
		actions.userRegistration(user);
		store.isClient === 1 ? actions.isSellerOrClient(1) : actions.isSellerOrClient(0);
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
											required
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
											required
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
											required
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
											required
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
											required
											onChange={handleChange}
										/>
										<span className="focus-input100" />
									</div>

									<div className="container-login100-form-btn  mt-4">
										<div className="wrap-login100-form-btn">
											<div className="login100-form-bgbtn" />
											<button type="submit" className="login100-form-btn" onClick={handleSubmit}>
												Registrarse
											</button>
										</div>
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
											required
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
											required
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
											required
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
											required
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
											required
											onChange={handleChange}
										/>
										<span className="focus-input100" />
									</div>

									<div className="container-login100-form-btn  mt-4">
										<div className="wrap-login100-form-btn">
											<div className="login100-form-bgbtn" />
											<button type="submit" className="login100-form-btn" onClick={handleSubmit}>
												Registrarse
											</button>
										</div>
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
	);
};
