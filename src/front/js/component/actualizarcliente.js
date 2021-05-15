import React from "react";
import logo from "../../img/logo.png";

export const Actualizarcliente = () => {
	return (
		<div className="container">
			<form>
				<h2 className="text-center">Actualizar Datos</h2>
				<img src={logo} alt="logo" className="img-thumbnail mx-auto d-block rounded my-3" />
				<div className="form-group">
					<div className="input-group">
						<input
							type="text"
							className="form-control"
							name="name"
							placeholder="Nombre Completo"
							required="required"
						/>
					</div>
				</div>
				<div className="form-group">
					<div className="input-group">
						<input
							type="text"
							className="form-control"
							name="username"
							placeholder="Usuario"
							required="required"
						/>
					</div>
				</div>
				<div className="form-group">
					<div className="input-group">
						<input
							type="email"
							className="form-control"
							name="email"
							placeholder="Email"
							required="required"
						/>
					</div>
				</div>
				<div className="form-group">
					<div className="input-group">
						<input
							type="password"
							className="form-control"
							name="password"
							placeholder="Contraseña"
							required="required"
						/>
					</div>
				</div>
				<div className="form-group">
					<button
						className="btn btn-login login-btn btn-block"
						onClick={() => {
							createNewUser;
							regAlert();
						}}>
						Actualizar
					</button>
				</div>
			</form>
		</div>
	);
};
