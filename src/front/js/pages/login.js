import React from "react";
import { Link } from "react-router-dom";
import { Container, Form, Col, Button, Row, Card, Image, Accordion } from "react-bootstrap";

export const Login1 = () => {
	return (
		<Container style={{ width: "20rem" }} className="c1 mb-5">
			<Col xs={6} md={4}>
				<Image src="holder.js/171x180" rounded />
			</Col>
			<Col as={Row}>
				<h1>Bienvenidos</h1>
				<Form bg="white">
					<Form.Group as={Row} controlId="formHorizontalEmail">
						<Col sm={10}>
							<Form.Control type="email" placeholder="Correo Electronico" />
						</Col>
					</Form.Group>

					<Form.Group as={Row} controlId="formHorizontalPassword">
						<Col sm={10}>
							<Form.Control type="password" placeholder="Contraseña" />
							<Form.Check label="Recuerdarme" />
							<Link to={"/forgot"}>
								<Accordion.Toggle as={Button} variant="link" eventKey="0">
									Olvide Contraseña
								</Accordion.Toggle>
							</Link>
							<Link to={"/register"}>
								<Accordion.Toggle as={Button} variant="link" eventKey="0">
									Registrarse
								</Accordion.Toggle>
							</Link>
							<Button type="submit" size="lg" block>
								Ingresar
							</Button>
						</Col>
					</Form.Group>
					<Form.Group as={Row} controlId="formHorizontalCheck">
						<Col sm={{ span: 10, offset: 2 }} />
					</Form.Group>
					<Form.Group as={Row}>
						<Col sm={{ span: 10, offset: 2 }} />
					</Form.Group>
					<h4>Logearse con:</h4>
					<Form.Group as={Row}>
						<Col className="b1" sm={{ span: 10, offset: 2 }} xs="auto">
							<Button type="submit" variant="outline-danger" size="sm" block>
								Google
							</Button>{" "}
							<Button type="submit" variant="outline-primary" size="sm" block>
								Facebook
							</Button>
						</Col>
					</Form.Group>
				</Form>
			</Col>
		</Container>
	);
};
