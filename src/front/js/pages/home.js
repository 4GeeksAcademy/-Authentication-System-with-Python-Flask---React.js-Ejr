import React, { useState } from "react";
import "../../styles/signUp.css";

export const Home = () => {
	const [showModal, setShowModal] = useState(false);
	const [inputValues, setInputValues] = useState({
		input1: "",
		input2: "",
		input3: ""
	});
	const handleClose = () => setShowModal(false);
	const handleShow = () => setShowModal(true);

	const handleSubmit = () => {
	/* Aquí podemos realizar cualquier acción con los datos ingresados
		 Por ejemplo, enviarlos a través de una solicitud HTTP o realizar alguna lógica de procesamiento */
		console.log("Datos enviados:", inputValues);
		// Luego, cierra el modal
		handleClose();
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setInputValues(prevState => ({
			...prevState,
			[name]: value
		}));
	};

	return (
		<div>
			<div>
				<button className="button-sign-up" onClick={handleShow}>Sign Up</button>

				{showModal && (
					<div className="modal">
						<div className="modal-content">
							<span className="close" onClick={handleClose}>&times;</span>
							<p className="modal-p">Sing Up</p>
							<input
								type="text"
								name="input1"
								value={inputValues.input1}
								onChange={handleChange}
								placeholder="Nombre Completo"
							/>
							<input
								type="email"
								name="input2"
								value={inputValues.input2}
								onChange={handleChange}
								placeholder="Email"
							/>
							<input
								type="password"
								name="input3"
								value={inputValues.input3}
								onChange={handleChange}
								placeholder="Contraseña"
							/>
							<button className="button-input close-button" onClick={handleClose}>Cerrar</button>
							<button 
								className="button-input submit" 
								onClick={()=>{handleSubmit();
											handleClose();}}>
									Enviar</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};
