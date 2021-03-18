import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

function MyVerticallyCenteredModal(props) {
	return (
		<Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
			<Modal.Header closeButton style={{ paddingRight: "40px", paddingLeft: "40px" }}>
				<Modal.Title id="contained-modal-title-vcenter">Inicia Sesión</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form style={{ paddingRight: "30px", paddingLeft: "20px", marginTop: "50px" }}>
					<Form.Group controlId="formBasicEmail">
						{/* <Form.Label>Email address</Form.Label> */}
						<Form.Control type="email" placeholder="Ingresa tu correo electrónico" />
					</Form.Group>
					<Form.Group controlId="formBasicPassword">
						{/* <Form.Label>Password</Form.Label> */}
						<Form.Control type="password" placeholder="Ingresa tu contraseña" />
					</Form.Group>
					<Button variant="primary" size="lg" type="submit" block style={{ marginTop: "70px" }}>
						Ingresar
					</Button>
					<Form.Text
						className="text-muted"
						style={{ textAlign: "center", marginTop: "20px", marginBottom: "60px" }}>
						¿Olvidaste tu contraseña?
						<Link to="/passwordrecovery">
							<a> Recuperala aquí </a>
						</Link>
					</Form.Text>
				</Form>
			</Modal.Body>
		</Modal>
	);
}

export function LoginModal() {
	const [modalShow, setModalShow] = React.useState(false);

	return (
		<>
			<Button
				variant="outline-primary "
				className="no-outline mr-2"
				style={{ borderRadius: "1.75rem" }}
				onClick={() => setModalShow(true)}>
				Ingresa
			</Button>

			<MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
		</>
	);
}

export function LoginModalA() {
	const [modalShow, setModalShow] = React.useState(false);

	return (
		<>
			<Button variant="outline-light " className="no-outline float-right mt-5">
				Ingresa
			</Button>

			<MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
		</>
	);
}
