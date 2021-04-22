import React, { useContext } from "react";
import { Container, Button, Image, Form, Modal } from "react-bootstrap";
import { BsFillUnlockFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/demo.scss";

export const Retrive1 = () => {
	const { store, actions } = useContext(Context);

	return (
		<Container>
			<Modal.Dialog>
				<Modal.Header closeButton>
					<Modal.Title>Recuperar Contraseña</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<p>No te preocupes, a todos nos pasa.</p>

					<Form>
						<Form.Group controlId="formBasicEmail font-weight-bold">
							<Form.Label className="mb-0">
								<BsFillUnlockFill /> Ingrese su Correo ó nombre de Usuario
							</Form.Label>
							<Form.Control type="email" placeholder="Ingrese Correo ó Usuario" required isInvalid />
						</Form.Group>
					</Form>
				</Modal.Body>

				<Modal.Footer className="justify-content-center">
					<Link to="/retrive2">
						<Button variant="outline-dark">Recuperar Contraseña</Button>
					</Link>
				</Modal.Footer>
			</Modal.Dialog>
		</Container>
	);
};
