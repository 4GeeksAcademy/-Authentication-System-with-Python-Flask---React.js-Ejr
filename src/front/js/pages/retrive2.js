import React, { useContext } from "react";
import { Container, Button, Image, Form, Modal } from "react-bootstrap";
import { BsFillUnlockFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/demo.scss";

export const Retrive2 = () => {
	const { store, actions } = useContext(Context);

	return (
		<Container>
			<Modal.Dialog>
				<Modal.Header closeButton>
					<Modal.Title>Recuperar Contraseña</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group controlId="formBasicEmail font-weight-bold">
							<Form.Label className="mb-0">
								Un mensaje con su contraseña ha sido envidado, por favor revise su correo.
							</Form.Label>
						</Form.Group>
					</Form>
				</Modal.Body>
				<Modal.Footer className="justify-content-center">
					<Link to="/login">
						<Button variant="outline-primary">Volver a Inicio de Sesión</Button>
					</Link>
				</Modal.Footer>
			</Modal.Dialog>
		</Container>
	);
};
