import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Container, Button, Image, Row, Form, FormGroup, Col, Card } from "react-bootstrap";
import { BsEnvelope, BsPeopleCircle, BsFillLockFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/demo.scss";

export const Register = () => {
	const { store, actions } = useContext(Context);

	return (
		<Container>
			<Row className="justify-content-center pt-5 mt-5 mr-1">
				<Col className="col-md-4 formulary">
					<FormGroup className="text-center pb-3">
						<h1 className="text-dark">Registro</h1>
					</FormGroup>
					<Form>
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
						<FormGroup className="mx-sm-4 pb-3 text-center">
							<Button variant="outline-success" type="submit">
								Submit
							</Button>
						</FormGroup>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};
