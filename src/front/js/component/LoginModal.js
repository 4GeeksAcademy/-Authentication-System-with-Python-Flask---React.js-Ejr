import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const LoginModal = props => {

	const {store, actions} = useContext(Context);
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isOpen, setOpen] = useState(true);

	function handleLogIn(e) {
		e.preventDefault();
		let looged = actions.login(email, password);

		if (looged) {
			navigate("/demo");
		} else {

		}
	}

	function closeModal() {
		setOpen(false);
	}

	return (
		<div className="modal" tabIndex="-1" role="dialog" style={{ display: isOpen ? "inline-block" : "none", cursor: "pointer" }}>
			<div className="modal-dialog" role="document">

				<div className="modal-content">

					<div className="modal-header bg-100 d-flex flex-column px-5">
						<div className="d-flex flex-row justify-content-end w-100">
							<i className="fa-solid fa-xmark" onClick={closeModal}></i>
						</div>
						<h4 className="modal-title">Inicia sesión</h4>
						<h6>¿Aún no eres miembro? Regístrate.</h6>
					</div>

					<div className="modal-body w-100 px-5">
						<form className="d-flex flex-column justify-content-center align-items-center w-100 row gy-3" onSubmit={handleLogIn}>
							<div className="form-group d-flex flex-column justify-content-center align-items-center w-100">
								<label className="d-flex justify-content-start w-100">Correo electrónico</label>
								<input
									className="w-100 rounded-3"
									type="text"
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>

							<div className="form-group d-flex flex-column justify-content-center align-items-center w-100">
								<label className="d-flex justify-content-start w-100">Contraseña</label>
								<input
									className="w-100 rounded-3"
									type="password"
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
	
							<div className="form-group d-flex flex-row justify-content-start w-100">
								<input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
								<label className="form-check-label" for="flexCheckDefault">
								Mantener sesión iniciada
								</label>
							</div>
							<button type="submit" className="btn-300 to-be-hoved form-control">
								¡ENTRA!
							</button>
						</form>
					</div>

				</div>
			</div>
		</div>
	);
};
/**
 * Define the data-types for
 * your component's properties
 **/
// LoginModal.propTypes = {
// 	history: PropTypes.object,
// 	onClose: PropTypes.func,
// 	show: PropTypes.bool,
// 	id: PropTypes.number
// };

// /**
//  * Define the default values for
//  * your component's properties
//  **/
// LoginModal.defaultProps = {
// 	show: false,
// 	onClose: null
// };