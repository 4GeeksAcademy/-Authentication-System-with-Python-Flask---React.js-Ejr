import React, { useState, useContext } from "react";
import { Form, Button, Accordion } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [redirect, setRedirect] = useState(false);
	//const { store, actions } = useContext(Context);

	const handleSubmit = e => {
		e.preventDefault();
		if (email === "" || password === "") {
			alert("el usuario o la contraseña son requeridos!, por favor intente de nuevo");
		}
		console.log(email, password);

		// FETCH
		const data = { email: email, password: password };

		fetch("https://3001-aquamarine-cat-14f9pgld.ws-us03.gitpod.io/api/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
			.then(response => response.json())
			.then(data => {
				console.log("Exito:", data);
				sessionStorage.setItem("u_token", data.token);
				sessionStorage.setItem("user_id", data.user.id);
				//actions.getFavoritos();
				setRedirect(true);
			})
			.catch(error => {
				console.error("Error:", error);
			});
	};

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
				style={{ marginTop: "50px", maxWidth: "436px", marginBottom: "200px" }}
				onSubmit={e => handleSubmit(e)}>
				<h1 style={{ paddingBottom: "60px" }}>Bienvenidos a la aventura</h1>
				<Form.Group controlId="formBasicEmail">
					<Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
				</Form.Group>
				<Form.Group controlId="formBasicPassword">
					<Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
				</Form.Group>
				<Button variant="primary" type="submit" className="mb-2" style={{ width: "398px" }} value="Login">
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
							Regístrate Aquí
						</Button>
					</Link>
				</Form.Group>
			</Form>
			{redirect ? <Redirect to="/" /> : ""}
		</div>
	);
};
