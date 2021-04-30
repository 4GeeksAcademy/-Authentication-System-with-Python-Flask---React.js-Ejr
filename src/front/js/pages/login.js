import React from "react";
// import { Link } from "react-router-dom";

export const Login = () => {
	return (
		<div className="container col-xl-10 col-xxl-8 px-4 py-5">
			<div className="row align-items-center g-5 py-5">
				<div className="col-lg-7 text-center text-lg-start">
					<h1 className="display-4 fw-bold lh-1 mb-3">Vertically centered hero sign-up form</h1>
					<p className="col-lg-10 fs-4 text-white">
						Below is an example form built entirely with Bootstraps form controls. Each required form group
						has a validation state that can be triggered by attempting to submit the form without completing
						it.
					</p>
				</div>
				<div className="col-10 mx-auto col-lg-5">
					<form className="p-5 border rounded-3 bg-light">
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
						</div>
						<button className="w-100 btn btn-lg btn-primary" type="submit">
							Sign up
						</button>
						<hr className="my-4" />
						<small className="text-muted">Iniciar secion</small>
					</form>
				</div>
			</div>
		</div>
	);
};
