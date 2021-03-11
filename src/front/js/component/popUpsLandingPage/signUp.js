import React from "react";

export const SignUp = () => {
	return (
		<div>
			<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#staticBackdrop">
				Registrase
			</button>

			<div
				className="modal fade"
				id="staticBackdrop"
				data-backdrop="static"
				data-keyboard="false"
				aria-labelledby="staticBackdropLabel"
				aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="staticBackdropLabel">
								Registrase
							</h5>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							Welcome to PlanificApp
							<hr />
							<div>
								<i className="fas fa-user userIcon" />
							</div>
							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<span className="input-group-text">First and last name</span>
								</div>
								<input type="text" aria-label="First name" className="form-control" />
								<input type="text" aria-label="Last name" className="form-control" />
							</div>
							<div className="input-group mb-3">
								<div className="input-group-prepend" />
								<input
									type="text"
									className="form-control"
									placeholder="Email"
									aria-label="Email"
									aria-describedby="basic-addon1"
								/>
							</div>
							<div className="input-group mb-3">
								<div className="input-group-prepend" />
								<input
									type="text"
									className="form-control"
									placeholder="contraseña"
									aria-label="contraseña"
									aria-describedby="basic-addon1"
								/>
							</div>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" data-dismiss="modal">
								Cerrar
							</button>
							<button type="button" className="btn btn-primary">
								Registrarse
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
