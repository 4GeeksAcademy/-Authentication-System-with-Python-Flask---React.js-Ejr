import React from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import "../../styles/register.scss";

export function Changepass() {
	return (
		<>
			<Row className="vh-100 align-items-center">
				<Col md={{ span: 6, offset: 3 }}>
					<Card bg="light" variant="light">
						<Card.Body>
							<i className="fas fa-user d-flex justify-content-center" />
							<Card.Title as="h3" className="text-center">
								Cambio de Contraseña
							</Card.Title>
							<Row>
								<Col md={{ span: 6, offset: 3 }}>
									<Form>
										<Form.Group as={Row} controlId="formHorizontalText">
											<Col sm={12}>
												<Form.Control type="text" placeholder="Usuario" />
											</Col>
										</Form.Group>

										<Form.Group as={Row}>
											<Col sm={{ span: 9, offset: 3 }}>
												<Button variant="secondary" type="submit">
													Solicitar cambio de contraseña
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
							</Row>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</>
	);
}
