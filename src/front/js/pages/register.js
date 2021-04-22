import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { Container, Button, Image, Row, Form, FormGroup, Col } from "react-bootstrap";
import { BsEnvelope, BsPeopleCircle, BsFillLockFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/demo.scss";

export const Register = () => {
	const [validated, setValidated] = useState(false);

	const handleSubmit = event => {
		const form = event.currentTarget;
		if (form.checkValidity() === false) {
			event.preventDefault();
			event.stopPropagation();
		}

		setValidated(true);
	};

	return (
		<Container>
			<Row className="justify-content-center pt-5 mt-5 mr-1">
				<Col className="col-md-4 formulary">
					<FormGroup className="text-center pb-3">
						<h1 className="text-dark">Registro</h1>
					</FormGroup>
					<Form noValidate validated={validated} onClick={handleSubmit}>
						<Form.Group controlId="formBasicUser">
							<Form.Label>
								{" "}
								<BsPeopleCircle /> Nombre Usuario
							</Form.Label>
							<Form.Control type="text" placeholder="Usuario" required isInvalid />
						</Form.Group>
						<Form.Group controlId="formBasicEmail">
							<Form.Label>
								{" "}
								<BsEnvelope /> Correo Electronico
							</Form.Label>
							<Form.Control type="email" placeholder="Correo" required isInvalid />
							<Form.Text className="text-muted">Nunca compartiremos su correo, con nadie más.</Form.Text>
						</Form.Group>
						<Form.Group controlId="formBasicPassword">
							<Form.Label>
								{" "}
								<BsFillLockFill /> Contraseña
							</Form.Label>
							<Form.Control type="password" placeholder="Contraseña" required isInvalid />
						</Form.Group>
						<Form.Group controlId="formBasicPassword">
							<Form.Label>
								{" "}
								<BsFillLockFill /> Reconfirmar Contraseña
							</Form.Label>
							<Form.Control type="password" placeholder="Contraseña" required isInvalid />
						</Form.Group>
						<Link to="/register1">
							<FormGroup className="mx-sm-4 pb-3 text-center">
								<Button variant="outline-success" type="submit">
									Crear Usuario
								</Button>
							</FormGroup>
						</Link>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};
