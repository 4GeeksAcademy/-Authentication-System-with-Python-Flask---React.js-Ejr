import React from "react";
import { Link } from "react-router-dom";

export const Register1 = () => {
	return (
		<div className="container">
			<div className="d-flex justify-content-center h-100">
				<div className="card c1">
					<div className="d-flex justify-content-center text-white">
						<h3>Registrarme</h3>
					</div>
					<div className="card-body">
						<form>
							<div className="input-group form-group">
								<div className="input-group-prepend">
									<span className="input-group-text">
										<i className="fas fa-user" />
									</span>
								</div>
								<input type="text" className="form-control" placeholder="Nombre" required />
							</div>
							<div className="input-group form-group">
								<div className="input-group-prepend">
									<span className="input-group-text">
										<i className="fa fa-envelope" />
									</span>
								</div>
								<input type="text" className="form-control" placeholder="Email" required />
							</div>
							<div className="input-group form-group">
								<div className="input-group-prepend">
									<span className="input-group-text">
										<i className="fas fa-key" />
									</span>
								</div>
								<input type="password" className="form-control" placeholder="Contraseña" required />
							</div>
							<div className="input-group form-group">
								<div className="input-group-prepend">
									<span className="input-group-text">
										<i className="fas fa-key" />
									</span>
								</div>
								<input
									type="password"
									className="form-control"
									placeholder="Confirme su contraseña"
									required
								/>
							</div>
							<div className="form-group">
								<input type="Submit" value="Registrar" className="btn float-right login_btn" />
							</div>
							<div className="card-footer">
								<div className="d-flex justify-content-center links">
									Ya tienes cuenta?
									<Link to={"/login"} href="#">
										Ingresar
									</Link>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
