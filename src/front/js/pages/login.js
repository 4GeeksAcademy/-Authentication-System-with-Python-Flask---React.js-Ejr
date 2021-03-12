import React from "react";
import { Form, Button } from "react-bootstrap";

export function Login() {
	return (
		<Form className="container text-center">
			<Form.Group controlId="formBasicEmail">
				<Form.Label>Email address</Form.Label>
				<Form.Control type="email" placeholder="Enter email" />
			</Form.Group>

			<Form.Group controlId="formBasicPassword">
				<Form.Label>Password</Form.Label>
				<Form.Control type="password" placeholder="Password" />
			</Form.Group>
			<Form.Group controlId="formBasicCheckbox">
				<Form.Check type="checkbox" label="Check me out" />
			</Form.Group>
			<Button variant="primary" type="submit" className="mx-5">
				Login
			</Button>
			<Button variant="primary" type="submit" className="mx-5">
				Registrarse
			</Button>
		</Form>
	);
}
