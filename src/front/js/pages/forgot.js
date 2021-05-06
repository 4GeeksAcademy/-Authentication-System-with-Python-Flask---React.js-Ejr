import React from "react";
import { Link } from "react-router-dom";

export const Forgot1 = () => {
	return (
		<div className="container">
			<div className="d-flex justify-content-center h-100">
				<div className="card">
					<div className="d-flex justify-content-center text-white">
						<h3>Recuperación de contraseña</h3>
					</div>
					<div className="card-body">
						<form>
							<div className="input-group form-group">
								<div className="input-group-prepend">
									<span className="input-group-text">
										<i className="	fa fa-envelope" />
									</span>
								</div>
								<input type="text" className="form-control" placeholder="Ingrese su Email" />
							</div>
							<div className="card-footer">
								<div className="d-flex justify-content-center links">
									Recordaste la contraseña?
									<Link to={"/login"} href="#">
										Ingresar
									</Link>
								</div>
							</div>
							<div className="form-group">
								<input type="Submit" value="Enviar" className="btn float-right login_btn" />
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
