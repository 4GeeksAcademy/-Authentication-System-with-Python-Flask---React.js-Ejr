import React from "react";
import { Link } from "react-router-dom";
import { Container, Form, Col, Button, Row, Card } from "react-bootstrap";

export const Register1 = () => {
	return (
		<Container>
			<Col>
				<h1 text="white">Registro</h1>
				<Form bg="white">
					<Form.Group as={Row} controlId="formHorizontalEmail">
						<Col sm={10}>
							<Form.Control type="email" placeholder="Correo Electronico" />
						</Col>
					</Form.Group>

					<Form.Group as={Row} controlId="formHorizontalPassword">
						<Col sm={10}>
							<Form.Control type="password" placeholder="Contraseña" />
							<Form.Text className="text-muted">Recuerde que la contraseña es de uso personal</Form.Text>
						</Col>
					</Form.Group>
					<Form.Group as={Row} controlId="formHorizontalPassword">
						<Col sm={10}>
							<Form.Control type="password" placeholder="Reingrese su Contraseña" />
						</Col>
					</Form.Group>
					<Form.Group as={Row}>
						<Col sm={{ span: 10, offset: 2 }}>
							<Button type="submit" size="lg">
								Ingresar
							</Button>
						</Col>
					</Form.Group>

					<Form.Group as={Row}>
						<Col sm={{ span: 10, offset: 2 }}>
							<Button type="submit" variant="outline-danger" size="lg">
								Google
							</Button>
						</Col>
						<Col sm={{ span: 10, offset: 2 }}>
							<Button type="submit" variant="outline-primary" size="lg">
								Facebook
							</Button>
						</Col>
					</Form.Group>
				</Form>
			</Col>
		</Container>
	);
};
