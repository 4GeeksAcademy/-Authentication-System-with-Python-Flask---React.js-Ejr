import React from "react";
import { withRouter } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

const Login = () => {
	return (
		<div className="container">
			<div className="row">
				<div className="col-3" />
				<div className="col-6">
					<div className="iconBox shadow-lg p-3" style={{ height: "100%" }}>
						<h1 style={{ textAlign: "center", marginBottom: "20px" }}>Ingresa a tu cuenta</h1>
						<Form>
							<Form.Group controlId="formBasicEmail">
								<Form.Label>Correo Electrónico</Form.Label>
								<Form.Control type="email" placeholder="Ingresa tu correo electrónico" />
								<Form.Text className="text-muted">Nunca compartiremos tu email con nadie.</Form.Text>
							</Form.Group>

							<Form.Group controlId="formBasicPassword">
								<Form.Label>Contraseña</Form.Label>
								<Form.Control type="password" placeholder="Ingresa tu contraseña" />
							</Form.Group>
							<Button variant="primary" type="submit" style={{ float: "center" }}>
								Submit
							</Button>
						</Form>
						<h6 style={{ textAlign: "center" }}>
							Si deseas recuperar tu contraseña <a href="#">Haz click aquí</a>
						</h6>
					</div>
				</div>
				<div className="col-3" />
			</div>
		</div>
	);
};

export default withRouter(Login);
