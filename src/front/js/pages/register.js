import React from "react";
import { Link } from "react-router-dom";
import { Container, Form, Col, Button, Row, Card } from "react-bootstrap";

export const Register1 = () => {
	return (
		<Container style={{ width: "20rem" }} className="c1 mb-5">
			<Col>
				<h1>Registro</h1>
				<Form bg="white">
					<Form.Group as={Row} controlId="formHorizontalName">
						<Col sm={10}>
							<Form.Control type="name" placeholder="Nombre" />
						</Col>
					</Form.Group>
					<Form.Group as={Row} controlId="formHorizontalEmail">
						<Col sm={10}>
							<Form.Control type="email" placeholder="Correo Electronico" />
						</Col>
					</Form.Group>
					<Form.Group as={Row} controlId="formHorizontalPassword">
						<Col sm={10}>
							<Form.Control type="password" placeholder="Contraseña" />
						</Col>
					</Form.Group>
					<Form.Group as={Row} controlId="formHorizontalPassword">
						<Col sm={10}>
							<Form.Control type="password" placeholder="Reingrese su Contraseña" />
							<Form.Text className="text-muted">No comparta su contraseña</Form.Text>
						</Col>
					</Form.Group>
					<Form.Group as={Row}>
						<Col sm={{ span: 10, offset: 2 }}>
							<Button type="submit" size="lg">
								Registrar
							</Button>
						</Col>
					</Form.Group>
				</Form>
			</Col>
		</Container>
	);
};
