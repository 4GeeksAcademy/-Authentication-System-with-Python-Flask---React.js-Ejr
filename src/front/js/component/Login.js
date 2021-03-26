import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { DropdownButton, Dropdown } from "react-bootstrap";
import PropTypes from "prop-types";
// import useUserSession from "./userSession";

function MyVerticallyCenteredModal(props) {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = e => {
		e.preventDefault();

		actions.setLogin({
			email: email,
			password: password
		});
	};
	return (
		<Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
			<Modal.Header closeButton style={{ paddingRight: "40px", paddingLeft: "40px" }}>
				<Modal.Title id="contained-modal-title-vcenter">Inicia Sesión</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form style={{ paddingRight: "30px", paddingLeft: "20px", marginTop: "50px" }}>
					<Form.Group controlId="formBasicEmail">
						{/* <Form.Label>Email address</Form.Label> */}
						<Form.Control
							type="email"
							placeholder="Ingresa tu correo electrónico"
							onChange={e => setEmail(e.target.value)}
						/>
					</Form.Group>
					<Form.Group controlId="formBasicPassword">
						{/* <Form.Label>Password</Form.Label> */}
						<Form.Control
							type="password"
							placeholder="Ingresa tu contraseña"
							onChange={e => setPassword(e.target.value)}
						/>
					</Form.Group>
					<Button
						variant="primary"
						size="lg"
						type="submit"
						block
						style={{ marginTop: "70px" }}
						onClick={e => handleSubmit(e)}>
						Ingresar
					</Button>
					<Form.Text
						className="text-muted"
						style={{ textAlign: "center", marginTop: "20px", marginBottom: "60px" }}>
						¿Olvidaste tu contraseña?
						<Link to="/passwordrecovery">
							<p> Recuperala aquí </p>
						</Link>
					</Form.Text>
				</Form>
			</Modal.Body>
		</Modal>
	);
}

export function LoginModal(props) {
	const [modalShow, setModalShow] = React.useState(false);

	return (
		<>
			{props.user.id !== undefined ? (
				<>
					<DropdownButton
						menuAlign="right"
						title="Mi cuenta"
						id="dropdown-menu-align-right"
						className="mr-2"
						style={{ borderRadius: "1.75rem" }}>
						<Dropdown.Item eventKey="1">Favoritos</Dropdown.Item>
						<Dropdown.Item eventKey="2">Mis datos</Dropdown.Item>
						<Dropdown.Divider />
						<Dropdown.Item eventKey="3">Salir</Dropdown.Item>
					</DropdownButton>
				</>
			) : (
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
			)}
		</>
	);
}
export function LoginModalA() {
	const [modalShow, setModalShow] = React.useState(false);
	return (
		<>
			<Button variant="outline-light " className="no-outline float-right mt-5" onClick={() => setModalShow(true)}>
				Ingresa
			</Button>
			<MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
		</>
	);
}

LoginModal.propTypes = {
	user: PropTypes.object
};
