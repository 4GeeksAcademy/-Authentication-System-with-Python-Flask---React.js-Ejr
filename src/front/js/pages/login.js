import React from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export function Login() {
	return (
		<Form
			className="container text-center "
			style={{ marginTop: "200px", maxWidth: "436px", marginBottom: "200px" }}>
			<Form.Group controlId="formBasicEmail">
				<Form.Control type="email" placeholder="Enter email" />
			</Form.Group>

			<Form.Group controlId="formBasicPassword">
				<Form.Control type="password" placeholder="Password" />
			</Form.Group>
			<Form.Group controlId="formBasicCheckbox">
				<Form.Check type="checkbox" label="Check me out" />
			</Form.Group>
			<Button variant="primary" type="submit" className="mb-2" style={{ width: "398px" }}>
				Login
			</Button>
			<Form.Group>
				<Link to={`./register/`}>
					<Button
						variant="primary"
						type="submit"
						style={{ width: "398px", background: "#17a2b8", border: "none" }}>
						Registrarse
					</Button>
				</Link>
			</Form.Group>
		</Form>
	);
}
