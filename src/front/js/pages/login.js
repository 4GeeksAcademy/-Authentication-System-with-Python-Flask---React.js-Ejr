import React from "react";
// import { Link } from "react-router-dom";

export const Login = () => {
	return (
		<div className="container col-xl-10 col-xxl-8 px-4 py-5">
			<div className="row align-items-center g-5 py-5">
				<div className="col-lg-7 text-center text-lg-start">
					<h1 className="display-4 fw-bold lh-1 mb-3 text-white">Vertically centered hero sign-up form</h1>
					<p className="col-lg-10 fs-4 text-white">
						Below is an example form built entirely with Bootstraps form controls. Each required form group
						has a validation state that can be triggered by attempting to submit the form without completing
						it.
					</p>
				</div>
				<div className="col-10 mx-auto col-lg-5">
					<form className="p-5 border rounded-3 bg-light">
						<img
							src="https://www.global-retail.com/wp-content/uploads/2017/11/Global_Market.png"
							width="250px"
						/>
						<h2 className="text-center py-5">Bienvenidos</h2>
						<div className="form-floating mb-3">
							<input
								type="email"
								className="form-control"
								id="floatingInput"
								placeholder="Email address"
							/>
						</div>
						<div className="form-floating mb-3">
							<input
								type="password"
								className="form-control"
								id="floatingPassword"
								placeholder="Password"
							/>
						</div>
						<div className="checkbox mb-3">
							<label>
								<input type="checkbox" value="remember-me" /> Remember me
							</label>
							<div className="my-3">
								<span>
									¿No tienes una cuenta? <a href="#">Registrate</a>
								</span>{" "}
								<br />
								<span>
									<a href="#">Recuperar contraseña</a>
								</span>
							</div>
						</div>
						<button className="w-100 btn btn-lg btn-primary" type="submit">
							Sign up
						</button>
						<hr className="my-4" />
						<small className="text-muted">Iniciar secion</small>
						<div className="row my-2">
							<div className="col">
								<button className="btn btn-outline-primary w-100">
									<div className="row">
										<div className="col-2">
											<i className="bi bi-facebook" />
										</div>
										<div className="col-10 text-center">Facebook</div>
									</div>
								</button>
							</div>
							<div className="col">
								<button className="btn btn-outline-danger w-100">
									<div className="row">
										<div className="col-2">
											<i className="bi bi-google" />
										</div>
										<div className="col-10 text-center">Google</div>
									</div>
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
