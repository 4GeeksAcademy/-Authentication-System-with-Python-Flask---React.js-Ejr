import React from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import "../../styles/register.scss";

export function Register() {
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
									<Form>
										<Form.Group as={Row} controlId="formHorizontalText">
											<Col sm={12}>
												<Form.Control type="text" placeholder="Nombre" />
											</Col>
										</Form.Group>

										<Form.Group as={Row} controlId="formHorizontalText">
											<Col sm={12}>
												<Form.Control type="text" placeholder="Usuario" />
											</Col>
										</Form.Group>

										<Form.Group as={Row} controlId="formHorizontalEmail">
											<Col sm={12}>
												<Form.Control type="email" placeholder="Correo" />
											</Col>
										</Form.Group>

										<Form.Group as={Row} controlId="formHorizontalText">
											<Col sm={12}>
												<Form.Control type="text" placeholder="Puesto" />
											</Col>
										</Form.Group>

										<Form.Group as={Row} controlId="formHorizontalPassword">
											<Col sm={12}>
												<Form.Control type="password" placeholder="Contraseña" />
											</Col>
										</Form.Group>

										<Form.Group as={Row} controlId="formHorizontalText">
											<Col sm={12}>
												<Form.Control type="text" placeholder="Teléfono" />
											</Col>
										</Form.Group>

										<Form.Group as={Row} controlId="formHorizontalText">
											<Col sm={12}>
												<Form.Control type="text" placeholder="Dirección" />
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
