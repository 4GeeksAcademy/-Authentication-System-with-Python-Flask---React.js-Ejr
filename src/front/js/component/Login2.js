// import React, { useState } from "react";
// import { Modal, Button, Form } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.css";
// import PropTypes from "prop-types";
// import { Context } from "../store/appContext";
// import { Link } from "react-router-dom";

// const LoginForm = props => {
// 	const [email, setEmail] = useState("");
// 	const [password, setPassword] = useState("");
// 	return (
// 		<Form onSubmit={props.onSubmit}>
// 			<Form.Group controlId="formBasicEmail">
// 				<Form.Label>Email address</Form.Label>
// 				<Form.Control
// 					type="email"
// 					placeholder="Enter email"
// 					value={email}
// 					onChange={e => setEmail(e.target.value)}
// 				/>
// 			</Form.Group>

// 			<Form.Group controlId="formBasicPassword">
// 				<Form.Label>Password</Form.Label>
// 				<Form.Control
// 					type="password"
// 					placeholder="Password"
// 					value={password}
// 					onChange={e => setPassword(e.target.value)}
// 				/>
// 			</Form.Group>
// 			<Form.Group controlId="formBasicCheckbox">
// 				<Form.Check type="checkbox" label="Remember Me!" />
// 			</Form.Group>
// 			<Button variant="primary" type="submit" block>
// 				Login
// 			</Button>
// 		</Form>
// 	);
// };

// export default function LoginModalB() {
// 	const [show, setShow] = useState(false);
// 	const { store, actions } = useContext(Context);

// 	const handleClose = () => setShow(false);
// 	const handleShow = () => setShow(true);

// 	const onLoginFormSubmit = e => {
// 		e.preventDefault();
// 		handleClose();
// 		actions.setLogin({
// 			email: email,
// 			password: password
// 		});
// 	};

// 	return (
// 		<>
// 			<div className="d-flex align-items-center justify-content-center" style={{ height: "100vh" }}>
// 				<Button variant="primary" onClick={handleShow}>
// 					Launch Form modal
// 				</Button>
// 			</div>
// 			<Modal show={show} onHide={handleClose}>
// 				<Modal.Header closeButton>
// 					<Modal.Title>Login Form</Modal.Title>
// 				</Modal.Header>
// 				<Modal.Body>
// 					<LoginForm onSubmit={onLoginFormSubmit} />
// 				</Modal.Body>
// 				<Modal.Footer>
// 					<Button variant="secondary" onClick={handleClose}>
// 						Close Modal
// 					</Button>
// 				</Modal.Footer>
// 			</Modal>
// 		</>
// 	);
// }
// LoginModalB.propTypes = {
// 	user: PropTypes.object
// };
// Form.propTypes = {
// 	onSubmit: PropTypes.func.isRequired
// };
