import React, { useState } from "react"; 
import "../../styles/signUp.css";
import { Navigate, useNavigate } from "react-router-dom";

const SignUp = () => {
	const [showModal, setShowModal] = useState(false);
	const [inputValues, setInputValues] = useState({
		name: "",
		email: "",
		password: ""
	});
	const navigate = useNavigate()
	const handleClose = () => setShowModal(false);
	const handleShow = () => setShowModal(true);

	const handleSubmit = (inputValues) => {
        fetch(`${process.env.BACKEND_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputValues)
        })
        .then(res => res.json())
        .then(data => {
				if (data && data.access_token) {handleClose(); navigate /* Ruta para el perfil */}
            console.log("Datos enviados:", inputValues);
        })
        .catch(error => {
            console.error('Error fetching data:', error); // Manejar errores de solicitud fetch
        });
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
								name="name"
								value={inputValues.name}
								onChange={handleChange}
								placeholder="Nombre Completo"
							/>
							<input
								type="text"
								name="email"
								value={inputValues.email}
								onChange={handleChange}
								placeholder="Email"
							/>
							<input
								type="text"
								name="password"
								value={inputValues.password}
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

export default SignUp;
