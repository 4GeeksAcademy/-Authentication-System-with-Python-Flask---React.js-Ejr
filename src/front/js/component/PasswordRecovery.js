import React, { useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import emailjs from "emailjs-com";
import { Context } from "../store/appContext";

export const PasswordRecovery = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const handleSubmit = e => {
		e.preventDefault();
		actions.sendEmail({
			email: email
		});
	};
	return (
		<div className="container ">
			<div className="transBox" />
			<div className="row">
				<div className="col-2" />
				<div className="col-8">
					<div className="whiteBox shadow-lg p-3">
						<h2 className="text-center my-5">
							<i className="fas fa-user-lock" style={{ marginRight: "10px" }} />
							Reestablecer contraseña
						</h2>
						<div style={{ paddingLeft: "50px", paddingRight: "50px" }}>
							<h4>
								Para recuperar tu contraseña favor ingresa tu correo electrónico registrado y te
								enviaremos la clave por email
							</h4>
							<br />
							<Form onSubmit={handleSubmit}>
								<Form.Group controlId="formBasicEmail">
									{/* <Form.Label>Correo Electrónico</Form.Label> */}
									<Form.Control
										type="email"
										placeholder="Ingresa tu correo electrónico"
										onChange={e => setEmail(e.target.value)}
									/>
								</Form.Group>
								<Button variant="primary" size="lg" type="submit" block className=" my-5">
									Recuperar
								</Button>
							</Form>
						</div>
						{/* Card  */}
					</div>
				</div>
				<div className="col-2" />
			</div>
			<div className="transBox" />
		</div>
	);
};

export default withRouter(PasswordRecovery);
