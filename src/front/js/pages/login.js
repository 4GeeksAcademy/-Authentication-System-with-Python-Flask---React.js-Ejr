import React from "react";
import { Form, Button, Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";

export function Login() {
	return (
		<div
			className="shadow-lg rounded border"
			style={{
				background: "#E9E8E8",
				width: "550px",
				margin: "0 auto",
				height: "640px",
				marginTop: "100px",
				marginBottom: "55px"
			}}>
			<Form
				className="container text-center "
				style={{ marginTop: "50px", maxWidth: "436px", marginBottom: "200px" }}>
				<h1 style={{ paddingBottom: "60px" }}>Bienvenidos a la aventura</h1>
				<Form.Group controlId="formBasicEmail">
					<Form.Control type="email" placeholder="Enter email" />
				</Form.Group>
				<Form.Group controlId="formBasicPassword">
					<Form.Control type="password" placeholder="Password" />
				</Form.Group>
				<Button variant="primary" type="submit" className="mb-2" style={{ width: "398px" }}>
					Login
				</Button>
				<Link to={`./recuperar/`}>
					<Accordion.Toggle as={Button} variant="link" eventKey="0" style={{ marginBottom: "30px" }}>
						Olvidé mi contraseña
					</Accordion.Toggle>
				</Link>
				<Form.Group>
					<h5>Aún no tienes una cuenta</h5>
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
		</div>
	);
}
