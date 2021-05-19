import React, { useContext } from "react";
import { Context } from "../store/appContext";
import logo from "../../img/newAppLogo.jpeg";

export const Actualizarcliente = () => {
	const { store } = useContext(Context);
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
							value={store.appAuth.fullName}
						/>
					</div>
				</div>
				<div className="form-group">
					<div className="input-group">
						<input
							type="text"
							className="form-control"
							name="phonenumber"
							placeholder="Numero telefonico"
							required="required"
							value={store.appAuth.phonenumber}
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
							value={store.appAuth.username}
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
							value={store.appAuth.email}
						/>
					</div>
				</div>
				<div className="form-group">
					<button
						className="btn btn-custom"
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
