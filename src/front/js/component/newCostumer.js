import React from "react";

export const NewCostumer = () => {
	return (
		<div>
			<button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal1">
				Agregar nuevo cliente
			</button>

			<div className="modal fade" id="exampleModal1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title" id="exampleModalLabel">
								Nuevo Cliente
							</h5>
							<div>
								<i className="fas fa-user userIcon" />
							</div>
							<button type="button" className="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body newmodal">
							<div className="input-group mb-3 cedula">
								<div className="input-group-prepend" />
								<input
									type="text"
									className="form-control"
									placeholder="Cedula"
									aria-label="Cedula"
									aria-describedby="basic-addon1"
								/>
							</div>
							<div className="input-group mb-3 nombre">
								<div className="input-group-prepend" />
								<input
									type="text"
									className="form-control"
									placeholder="Nombre"
									aria-label="Nombre"
									aria-describedby="basic-addon1"
								/>
							</div>
							<div className="input-group mb-3 correo">
								<div className="input-group-prepend">
									<span className="input-group-text" id="basic-addon1">
										Correo
									</span>
								</div>
								<input
									type="text"
									className="form-control"
									placeholder="Correo"
									aria-label="Correo"
									aria-describedby="basic-addon1"
								/>
							</div>

							<div className="input-group telefono">
								<div className="input-group-prepend">
									<span className="input-group-text">Telefono</span>
								</div>
								<input type="text" aria-label="First name" className="form-control" />
							</div>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-danger" data-dismiss="modal">
								Eliminar
							</button>
							<button type="button" className="btn btn-secondary" data-dismiss="modal">
								Cancelar
							</button>
							<button type="button" className="btn btn-primary">
								Aceptar
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
