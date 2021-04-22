import React, { useContext } from "react";
import { Container, Button, Image, Form, Modal } from "react-bootstrap";
import { BsFillUnlockFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/demo.scss";

export const Register1 = () => {
	const { store, actions } = useContext(Context);

	return (
		<Container>
			<Modal.Dialog>
				<Modal.Header closeButton>
					<Modal.Title>Registro</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group controlId="formBasicRegister font-weight-bold">
							<Form.Label className="mb-0">Su registro fue completado con éxito.</Form.Label>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Link to="/login">
					<Modal.Footer className="justify-content-center">
						<Button variant="outline-primary">Volver a Inicio de Sesión</Button>
					</Modal.Footer>
				</Link>
			</Modal.Dialog>
		</Container>
	);
};
