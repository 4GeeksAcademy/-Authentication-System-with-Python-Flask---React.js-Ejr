import React from "react";
import { Link } from "react-router-dom";

export const Recovery = () => {
	return (
		<div>
			<div className="card">
				<h5 className="card-title">Recuperación de contraseña</h5>
				<hr />
				<div>
					<i className="fas fa-user icon" />
				</div>
				<div className="card-body">
					<div className="input-group mb-3 pass">
						<div className="input-group-prepend">
							<span className="input-group-text" id="basic-addon1">
								@
							</span>
						</div>
						<input
							type="text"
							className="form-control"
							placeholder="Email"
							aria-label="Email"
							aria-describedby="basic-addon1"
						/>
					</div>
				</div>
				<Link to="/verifyMessage">
					<div>
						<input className="btn btn-primary submit" type="submit" value="Enviar correo" />
					</div>
				</Link>
			</div>
		</div>
	);
};
