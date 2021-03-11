import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
// import { Context } from "./store/appContext";
//import { Link } from "react-router-dom";
import { Container, Row, Col, Card, CardDeck, InputGroup, FormControl, Button } from "react-bootstrap";

export const Login = () => {
	// const { actions, store } = useContext(Context);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [redirect, setRedirect] = useState(false);

	const actionRegister = e => {
		if (username === "" || email === "" || password === "") {
			alert("ActionRegister: Faltan datos por llenar!");
		} else {
			alert(username, email);
			actions.validacionRegistro(username, email, password);
		}
	};

	const actionLogin = e => {
		if (email === "" || password === "") {
			alert("Actionlogin: Faltan datos por llenar!");
		} else {
			console.log(email);
			actions.validacionLogin(email, password);
		}
	};

	return (
		<Container>
			<Row>
				<Col className="mt-2 mb-2" id="Login">
					<CardDeck>
						{/* Card para Login */}
						<Card className="Card text-light text-center">
							<Card.Img
								className="Imglog"
								variant="top"
								src="https://lh3.googleusercontent.com/proxy/RrUvNH1tb8cqbEa3GfvMqsIvCyD-8a4LYuAaCStlQDAAtS2BEH-DU-t_6VC5feCJI57dt5Gae20neUDeqJr4CFXeeZG00TMrN86flNLXXpDE-4d5xRhVoduHQGggaDqqrWubnPvOmeVH"
							/>
							<form onSubmit={e => actionLogin(e)}>
								<Card.Body>
									<Card.Title>Log In</Card.Title>
									<Card.Text>
										<p>Aqui podras hacer el Login a la página si ya estas registrado</p>
										<InputGroup size="sm" className="mb-3">
											<InputGroup.Prepend>
												<InputGroup.Text id="inputGroup-sizing-sm">@email</InputGroup.Text>
											</InputGroup.Prepend>
											<FormControl
												id="email"
												onChange={e => setEmail(e.target.value)}
												aria-label="Small"
												aria-describedby="inputGroup-sizing-sm"
											/>
										</InputGroup>
										<InputGroup size="sm" className="mb-3">
											<InputGroup.Prepend>
												<InputGroup.Text id="inputGroup-sizing-sm">Password</InputGroup.Text>
											</InputGroup.Prepend>
											<FormControl
												id="password"
												onChange={e => setPassword(e.target.value)}
												type="password"
												aria-label="Small"
												aria-describedby="inputGroup-sizing-sm"
											/>
										</InputGroup>
									</Card.Text>
								</Card.Body>
								<Card.Footer>
									<Button type="submit" variant="outline-danger">
										Log In
									</Button>
								</Card.Footer>
							</form>
							{/* {store.boolean ? <Redirect to="/home" /> : ""} */}
						</Card>
						{/* Card para Register */}
						<Card className="Card text-light text-center">
							<Card.Img className="Imglog" variant="top" src="https://w.wallha.com/ws/7/lr8q4G9s.jpg" />
							<form onSubmit={e => actionRegister(e)}>
								<Card.Body>
									<Card.Title>Register</Card.Title>
									<Card.Text>
										<p>Aquí podrás hacer el Registro para poder acceder a la página</p>
										<InputGroup size="sm" className="mb-3">
											<InputGroup.Prepend>
												<InputGroup.Text id="inputGroup-sizing-sm">@email</InputGroup.Text>
											</InputGroup.Prepend>
											<FormControl
												onChange={e => setEmail(e.target.value)}
												id="email"
												aria-label="Small"
												aria-describedby="inputGroup-sizing-sm"
											/>
										</InputGroup>
										<InputGroup size="sm" className="mb-3">
											<InputGroup.Prepend>
												<InputGroup.Text id="inputGroup-sizing-sm">Password</InputGroup.Text>
											</InputGroup.Prepend>
											<FormControl
												onChange={e => setPassword(e.target.value)}
												id="password"
												type="password"
												aria-label="Small"
												aria-describedby="inputGroup-sizing-sm"
											/>
										</InputGroup>
									</Card.Text>
								</Card.Body>
								<Card.Footer>
									<Button type="submit" variant="outline-primary">
										Register
									</Button>
								</Card.Footer>
							</form>
						</Card>
					</CardDeck>
				</Col>
			</Row>
		</Container>
	);
};
