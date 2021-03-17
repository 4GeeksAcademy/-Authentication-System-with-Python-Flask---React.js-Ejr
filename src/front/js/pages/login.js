import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import "../../styles/register.scss";

export function Login() {
	const { store, actions } = useContext(Context);
	const [name_User, setName_User] = useState("");
	const [password_User_Details, setPassword_User_Details] = useState("");

	const handleSubmit = e => {
		e.preventDefault();
		if (name_User === "" || password_User_Details === "") {
			alert("Existen campos vacios");
		} else {
			const data = {
				name_User: name_User,
				password_User_Details: password_User_Details,
				active_User: "Activo"
			};
			actions.insertLogindata(data);
		}
	};

	return (
		<>
			<Row className="vh-100 align-items-center">
				<Col md={{ span: 6, offset: 3 }}>
					<Card bg="light" variant="light">
						<Card.Body>
							<i className="fas fa-user d-flex justify-content-center" />
							<Card.Title as="h3" className="text-center">
								Inicio Sesión
							</Card.Title>
							<Row>
								<Col md={{ span: 6, offset: 3 }}>
									<Form onSubmit={e => handleSubmit(e)}>
										<Form.Group as={Row} controlId="formHorizontalText">
											<Col sm={12}>
												<Form.Control
													type="text"
													placeholder="Usuario"
													onChange={e => setName_User(e.target.value)}
												/>
											</Col>
										</Form.Group>

										<Form.Group as={Row} controlId="formHorizontalPassword">
											<Col sm={12}>
												<Form.Control
													type="password"
													placeholder="Contraseña"
													onChange={e => setPassword_User_Details(e.target.value)}
												/>
											</Col>
										</Form.Group>

										<Form.Group as={Row}>
											<Col sm={{ span: 9, offset: 3 }}>
												<Button variant="light" type="submit">
													Olvidó la Contraseña?
												</Button>
											</Col>
										</Form.Group>

										<Form.Group as={Row}>
											<Col sm={{ span: 8, offset: 4 }}>
												<Button variant="secondary" type="submit">
													Iniciar Sesión
												</Button>
											</Col>
										</Form.Group>
									</Form>
								</Col>
							</Row>

							<Row>
								<Col sm={{ span: 5, offset: 1 }}>
									<Button variant="light">Volver</Button>
								</Col>
								<Col sm={{ span: 4, offset: 2 }}>
									<Button variant="light">Registrar nuevo Usuario</Button>
								</Col>
							</Row>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	);
}
