import React, { useState, useEffect, useContext } from "react";;
import { Context } from "../store/appContext";
import { SignUpModal } from "./SignUpModal";


export const LoginModal = props => {

	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [modalRegisterState, setModalRegisterState] = useState({
		showModal: false,
		showModalUpdate: false,
	});

	const handleLogIn = async (e) => {
		// e.preventDefault()
		
		await actions.login(email, password);
		if (store.auth) {
			props.onClose()
		}
	}

	useEffect(() => {
		return () => {
			setEmail("")
			setPassword("")
		};
	}, []);

	function updateModalRegistrerState() {
		setModalRegisterState({ showModalUpdate: true });
	}

	return (
		<div className="modal" tabIndex="-1" role="dialog" style={{ display: props.show ? "inline-block" : "none", cursor: "pointer" }}>
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-header bg-100 d-flex flex-column px-5">
						<div className="d-flex flex-row justify-content-end w-100">
							<i className="fa-solid fa-xmark" onClick={() => props.onClose()}></i>
						</div>
						<h4 className="modal-title">Inicia sesión</h4>
						{/* <h6>¿Aún no eres miembro? <a className="text-primary" onClick={updateModalRegistrerState}>Regístrate.</a></h6> */}
					</div>

					<div className="modal-body w-100 px-5">
						<form className="d-flex flex-column justify-content-center align-items-center w-100 row gy-3" onSubmit={handleLogIn}>
							<div className="form-group d-flex flex-column justify-content-center align-items-center w-100">
								<label className="d-flex justify-content-start w-100">Correo electrónico</label>
								<input
									value={email}
									className="w-100 rounded-3"
									type="email"
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>

							<div className="form-group d-flex flex-column justify-content-center align-items-center w-100">
								<label className="d-flex justify-content-start w-100">Contraseña</label>
								<input
									value={password}
									className="w-100 rounded-3"
									type="password"
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
							</div>
							<button type="submit" className="btn-300 to-be-hoved form-control w-50">
								¡ENTRA!
							</button>
						</form>
					</div>

				</div>
			</div>
			<SignUpModal show={modalRegisterState.showModalUpdate} onClose={() => setModalRegisterState({ showModalUpdate: false })} />
		</div>
	);
};
