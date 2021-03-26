import React from "react";
import { withRouter } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const PasswordRecovery = () => {
	return (
		<div className="container ">
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
								<Link to="/passwordrecovery2">
									<Button variant="primary" size="lg" type="submit" block className=" my-5">
										Ingresar
									</Button>
								</Link>
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
