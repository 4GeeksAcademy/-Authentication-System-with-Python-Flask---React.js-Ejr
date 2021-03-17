import React from "react";
import { withRouter } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

export const PasswordRecovery = () => {
	return (
		<div className="container">
			<div className="row">
				<div className="col-2" />
				<div className="col-8">
					<div className="iconBox shadow-lg p-3" style={{ height: "100%" }}>
						<>
							<i className="fas fa-user-lock" />
							<h1 style={{ textAlign: "center", marginBottom: "20px" }}>Ingresa a tu cuenta</h1>

							<h5>
								Para recuperar tu contraseña favor ingresa tu correo electrónico registrado y te
								enviaremos la clave por email
							</h5>
							<Form>
								<Form.Group controlId="formBasicEmail">
									{/* <Form.Label>Correo Electrónico</Form.Label> */}
									<Form.Control type="email" placeholder="Ingresa tu correo electrónico" />
								</Form.Group>
								<Button variant="primary" size="lg" type="submit" block style={{ marginTop: "70px" }}>
									Ingresar
								</Button>
							</Form>
						</>
					</div>
				</div>
				<div className="col-2"></div>
			</div>
		</div>
	);
};

export default withRouter(PasswordRecovery);
