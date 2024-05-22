import React, { useState, useContext } from "react";
import "../../../styles/Landing-styles/signUp.css";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {
	const [showModal, setShowModal] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const { actions } = useContext(Context);
	const navigate = useNavigate();

	const handleClose = () => setShowModal(false);
	const handleShow = () => setShowModal(true);

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};
	const handleConfirmPassword = (event) => {
		setConfirmPassword(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (password !== confirmPassword) {
			alert("Incorrect password");
			return;
		}
		await actions.signUp({ email, password });
		setPassword("");
		setEmail("");
		setConfirmPassword("");
		handleClose();
		navigate("/user-form");

	};

	return (
		<div>
			<div>
				<button className="button-sign-up" onClick={handleShow}>
					Sign Up
				</button>

				{showModal && (
					<div className="modal">
						<div className="modal-content">
							<h2 className="signup-modal-title">Sign Up</h2>
							<form onSubmit={handleSubmit}>
								<label htmlFor="email">
									Email
								</label>
								<input
									type="email"
									name="email"
									value={email}
									onChange={handleEmailChange}
									placeholder="Email"
									required
								/>
								<label htmlFor="password">
									Password
								</label>
								<input
									type="password"
									name="password"
									value={password}
									onChange={handlePasswordChange}
									placeholder="Contraseña"
									required
								/>
								<label htmlFor="confirmPassword">
									Confirm Password
								</label>
								<input
									type="password"
									name="confirmPassword"
									value={confirmPassword}
									onChange={handleConfirmPassword}
									placeholder="Confirmar Contraseña"
									required
								/>
								<button className="button-input singup-submit-button" type="submit">
									Sign Up
								</button>
								<button
									className="button-input singup-close-button"
									onClick={handleClose}
								>
									Close
								</button>
							</form>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};