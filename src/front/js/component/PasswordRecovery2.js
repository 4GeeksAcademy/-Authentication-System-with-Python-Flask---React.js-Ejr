import React from "react";
import { withRouter } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const PasswordRecovery2 = () => {
	return (
		<div className="container">
			<div className="transBox" />
			<div className="row">
				<div className="col-2" />
				<div className="col-8">
					{/* Card  */}
					<div className="whiteBox shadow-lg p-3">
						<h2 className="text-center my-5">
							<i className="fas fa-user-lock" style={{ marginRight: "10px" }} />
							Reestablecer contraseña
						</h2>
						<div className="px-5">
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
								<Link to="/home">
									<Button
										variant="primary"
										size="lg"
										type="submit"
										block
										style={{ marginTop: "50px", marginBottom: "50px" }}>
										Cambiar contraseña
									</Button>
								</Link>
							</Form>
						</div>
					</div>
					{/* Card  */}
				</div>
				<div className="col-2" />
			</div>
			<div className="transBox" />
		</div>
	);
};

export default withRouter(PasswordRecovery2);
