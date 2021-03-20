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
							<h2 style={{ textAlign: "center", marginBottom: "40px" }}>
								<i className="fas fa-user-lock" style={{ marginRight: "10px" }} />
								Reestablecer contraseña
							</h2>
							<div style={{ paddingLeft: "50px", paddingRight: "50px" }}>
								<h4>
									Para recuperar tu contraseña favor ingresa tu correo electrónico registrado y te
									enviaremos la clave por email
								</h4>
								<br />
								<Form>
									<Form.Group controlId="formBasicEmail">
										{/* <Form.Label>Correo Electrónico</Form.Label> */}
										<Form.Control type="email" placeholder="Ingresa tu correo electrónico" />
									</Form.Group>
									<Button
										variant="primary"
										size="lg"
										type="submit"
										block
										style={{ marginTop: "20px", marginBottom: "40px" }}>
										Ingresar
									</Button>
								</Form>
							</div>
						</>
					</div>
				</div>
				<div className="col-2" />
			</div>
		</div>
	);
};

export default withRouter(PasswordRecovery);
