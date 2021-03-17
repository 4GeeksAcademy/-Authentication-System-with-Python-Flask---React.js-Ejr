import React from "react";
import { withRouter } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

export const PasswordRecovery2 = () => {
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
							<div style={{ paddingLeft: "30px", paddingRight: "30px" }}>
								<h4>Ingresa una nueva contraseña para tu cuenta</h4>
								<br />
								<Form>
									<Form.Group controlId="formBasicEmail">
										<Form.Label>
											<strong>Correo Electrónico</strong>
										</Form.Label>

										<Form.Control type="email" placeholder="" />
									</Form.Group>
									<Form.Group controlId="formBasicPassword">
										<Form.Label>
											<strong>Nueva Password</strong>
										</Form.Label>
										<Form.Control type="password" placeholder="" />
									</Form.Group>
									<Form.Group controlId="formBasicPassword2">
										<Form.Label>
											<strong>Confirmar Password</strong>
										</Form.Label>
										<Form.Control type="password" placeholder="" />
									</Form.Group>
									<Button
										variant="primary"
										size="lg"
										type="submit"
										block
										style={{ marginTop: "20px", marginBottom: "40px" }}>
										Continuar
									</Button>
								</Form>
							</div>
						</>
					</div>
				</div>
				<div className="col-2"></div>
			</div>
		</div>
	);
};

export default withRouter(PasswordRecovery2);
