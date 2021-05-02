import React from "react";
import { Link } from "react-router-dom";
import { Container, Form, Col, Button, Row, Card } from "react-bootstrap";

export const Forgot1 = () => {
	return (
		<Container>
			<Col>
				<h1 text="white">Olvido su contraseña</h1>
				<Form bg="white">
					<Form.Group as={Row} controlId="formHorizontalEmail">
						<Col sm={10}>
							<Form.Control type="email" placeholder="Correo Electronico" />
						</Col>
					</Form.Group>
					<Form.Group as={Row}>
						<Col sm={{ span: 10, offset: 2 }}>
							<Button type="submit" size="lg">
								Enviar
							</Button>
						</Col>
					</Form.Group>
				</Form>
			</Col>
		</Container>
	);
};
