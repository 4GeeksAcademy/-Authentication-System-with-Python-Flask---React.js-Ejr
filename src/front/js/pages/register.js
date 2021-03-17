import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import "../../styles/register.scss";

export function Register() {
	const { store, actions } = useContext(Context);
	const [id_Document_User, setId_Document_User] = useState("");
	const [name_User, setName_User] = useState("");
	const [email_User_Details, setEmail_Provider_Details] = useState("");
	const [password_User_Details, setPassword_User_Details] = useState("");
	const [cargo_User_Details, setCargo_User_Details] = useState("");
	const [phone_User_Details, setPhone_User_Details] = useState("");
	const [address_Details, setaddress_Details] = useState("");

	const handleSubmit = e => {
		e.preventDefault();
		if (
			id_Document_User === "" ||
			name_User === "" ||
			email_User_Details === "" ||
			password_User_Details === "" ||
			cargo_User_Details === "" ||
			phone_User_Details === "" ||
			address_Details === ""
		) {
			alert("Existen campos vacios");
		} else {
			const data = {
				id_Document_User: id_Document_User,
				name_User: name_User,
				email_User_Details: email_User_Details,
				password_User_Details: password_User_Details,
				cargo_User_Details: cargo_User_Details,
				phone_User_Details: phone_User_Details,
				address_Details: address_Details,
				active_User: "Activo"
			};
			actions.insertUserdata(data);
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
								Nuevo Usuario
							</Card.Title>
							<Row>
								<Col md={{ span: 6, offset: 3 }}>
									<Form onSubmit={e => handleSubmit(e)}>
										<Form.Group as={Row} controlId="formHorizontalText">
											<Col sm={12}>
												<Form.Control
													type="text"
													placeholder="Documento ID"
													onChange={e => setId_Document_User(e.target.value)}
												/>
											</Col>
										</Form.Group>

										<Form.Group as={Row} controlId="formHorizontalText">
											<Col sm={12}>
												<Form.Control
													type="text"
													placeholder="Usuario"
													onChange={e => setName_User(e.target.value)}
												/>
											</Col>
										</Form.Group>

										<Form.Group as={Row} controlId="formHorizontalEmail">
											<Col sm={12}>
												<Form.Control
													type="email"
													placeholder="Correo"
													onChange={e => setEmail_Provider_Details(e.target.value)}
												/>
											</Col>
										</Form.Group>

										<Form.Group as={Row} controlId="formHorizontalText">
											<Col sm={12}>
												<Form.Control
													type="text"
													placeholder="Puesto"
													onChange={e => setCargo_User_Details(e.target.value)}
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

										<Form.Group as={Row} controlId="formHorizontalText">
											<Col sm={12}>
												<Form.Control
													type="text"
													placeholder="Teléfono"
													onChange={e => setPhone_User_Details(e.target.value)}
												/>
											</Col>
										</Form.Group>

										<Form.Group as={Row} controlId="formHorizontalText">
											<Col sm={12}>
												<Form.Control
													type="text"
													placeholder="Dirección"
													onChange={e => setaddress_Details(e.target.value)}
												/>
											</Col>
										</Form.Group>

										<Form.Group as={Row}>
											<Col sm={{ span: 8, offset: 4 }}>
												<Button variant="secondary" type="submit">
													Crear Usuario
												</Button>
											</Col>
										</Form.Group>
									</Form>
								</Col>
							</Row>
							<Row>
								<Col sm={{ span: 11, offset: 1 }}>
									<Button variant="light">Volver</Button>
								</Col>
							</Row>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	);
}
