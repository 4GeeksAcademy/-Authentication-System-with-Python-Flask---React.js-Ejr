import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

export const LoginModal = props => {

	const {store, actions} = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	function sentFormInfo() {
		actions.logIn(email, password);
	}

	return (
		<div className="modal" tabIndex="-1" role="dialog" style={{ display: "inline-block"}}>
			<div className="modal-dialog" role="document">

				<div className="modal-content px-5">

					<div className="modal-header d-flex flex-column">
						<div className="d-flex flex-row justify-content-end w-100">
							<i className="fa-solid fa-xmark"></i>
						</div>
						<h4 className="modal-title">Inicia sesión</h4>
						<h6>¿Aún no eres miembro? Regístrate.</h6>
						{/* {props.onClose ? (
							<button
								onClick={() => props.onClose()}
								type="button"
								className="close"
								data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						) : (
							""
						)} */}
					</div>

					<div className="modal-body w-100">
						<form className="d-flex flex-column justify-content-center align-items-center w-100 row gy-3">
							<div className="form-group d-flex flex-column justify-content-center align-items-center w-100">
								<label className="d-flex justify-content-start w-100">Correo electrónico</label>
								<input
									className="w-100 rounded-3"
									type="text"
									onChange={e => {setEmail(e.target.value)}}
								/>
							</div>

							<div className="form-group d-flex flex-column justify-content-center align-items-center w-100">
								<label className="d-flex justify-content-start w-100">Contraseña</label>
								<input
									className="w-100 rounded-3"
									type="password"
									onChange={e => {setPassword(e.target.value)}}
								/>
							</div>
	
							<div className="form-group d-flex flex-row justify-content-start w-100">
								<input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
								<label className="form-check-label" for="flexCheckDefault">
								Mantener sesión iniciada
								</label>
							</div>
							<button type="submit" className="btn btn-primary form-control" onClick={() => sentFormInfo()}>
								¡Entra!
							</button>
						</form>
					</div>

					{/* <div className="modal-footer">
						<button
							onClick={() => {
								props.onClose();
							}}
							type="button"
							className="btn btn-primary">
							Oh no!
						</button>
						<button
							onClick={() => {
								handleDelete();
								props.onClose();
							}}
							type="button"
							className="btn btn-secondary"
							data-dismiss="modal">
							Do it!
						</button>
					</div> */}

				</div>
			</div>
		</div>
	);
};
/**
 * Define the data-types for
 * your component's properties
 **/
LoginModal.propTypes = {
	history: PropTypes.object,
	onClose: PropTypes.func,
	show: PropTypes.bool,
	id: PropTypes.number
};

/**
 * Define the default values for
 * your component's properties
 **/
LoginModal.defaultProps = {
	show: false,
	onClose: null
};