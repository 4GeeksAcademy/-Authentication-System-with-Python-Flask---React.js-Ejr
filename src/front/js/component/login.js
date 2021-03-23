import React, { useState, useContext } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
//import { Link } from "react-router-dom";
import { Container, Row, Button } from "react-bootstrap";

export const Login = () => {
	const { actions, store } = useContext(Context);
	const history = useHistory();
	const [first_name, setFirst_name] = useState("");
	const [last_name, setLast_name] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [birthday, setBirthday] = useState("");
	const [redirect, setRedirect] = useState(false);

	return (
		<>
			{store.jwtoken != null ? <Redirect to="/home" /> : ""}
			<Container className="mt-2 mb-2" id="Login">
				<Row>
					<article className="text-center text-light offset-lg-2 col-12 col-md-12 col-lg-8" id="Login">
						<h4 className="display-5">
							Si deseas saber más y ver los diferentes cócteles{" "}
							<span className="glitch1">Registrate y seguido haz login</span> y así podrás ver todo
							nuestro contenido
						</h4>
						<p className="lead">
							{/* Esta página esta vinculada a una base de datos ya creada por lo cual para poder ingresar
							deberás revisar F12 y conocer los usuarios en lista ya creados! */}
						</p>
						<hr className="my-1" />
					</article>

					<>
						<form
							className="col-12 col-md-6 text-center text-light"
							onSubmit={async e => {
								e.preventDefault();
								await actions.login(email, password);
							}}>
							<h4 className="display-5">Login</h4>
							<hr className="my-1" />
							<div className="form-group align-items-center">
								<div className="col-auto">
									<label className="inlineFormInput">Email</label>
									<input
										type="text"
										className="form-control mb-2 text-center"
										id="User"
										placeholder="tomate.lo@gmail.com"
										onChange={e => setEmail(e.target.value)}
									/>
									<small id="emailHelp" className="form-text text-muted">
										Por favor revisa bien tus datos cuando termines.
									</small>
								</div>
								<div className="col-auto">
									<label className="inlineFormInputGroup">Password</label>
									<div className="input-group mb-2">
										<input
											type="password"
											className="form-control text-center"
											id="Password"
											placeholder="tomatelo2x3"
											onChange={e => setPassword(e.target.value)}
										/>
									</div>
								</div>
								<small id="emailHelp" className="form-text text-muted">
									Por favor revisa bien tus datos cuando termines.
								</small>
								<Button type="submit" variant="outline-info">
									Log In
								</Button>
							</div>
						</form>
					</>

					<>
						{/* {store.jwtoken ? <Redirect to="/" /> : ""} */}
						<form
							className="col-12 col-md-6 text-center text-light"
							onSubmit={async e => {
								e.preventDefault();
								let ok = await actions.signup(first_name, last_name, email, password, birthday);
								if (ok) {
									history.push("/");
									window.scrollTo(0, 0);
								} else {
									alert("failed to submit registration, lets try again");
								}
							}}>
							<h4 className="display-5">Register</h4>
							<hr className="my-1" />
							<div className="form-group align-items-center">
								<Row>
									<div className="col-12 col-md-6">
										<label className="inlineFormInput">First Name</label>
										<input
											type="text"
											className="form-control mb-2 text-center"
											id="User"
											placeholder="Tomatico"
											onChange={e => setFirst_name(e.target.value)}
										/>
									</div>
									<div className="col-12 col-md-6">
										<label className="inlineFormInput">Last Name</label>
										<input
											type="text"
											className="form-control mb-2 text-center"
											id="User"
											placeholder="Tomate"
											onChange={e => setLast_name(e.target.value)}
										/>
									</div>
								</Row>
								<div className="col-auto">
									<label className="inlineFormInput">Email</label>
									<input
										type="text"
										className="form-control mb-2 text-center"
										id="User"
										placeholder="nickname@gmail.com"
										onChange={e => setEmail(e.target.value)}
									/>
								</div>
								<div className="col-auto">
									<label className="inlineFormInputGroup">Password</label>
									<div className="input-group mb-2">
										<input
											type="password"
											className="form-control text-center"
											id="Password"
											placeholder="tomatelo2x3"
											onChange={e => setPassword(e.target.value)}
										/>
									</div>
								</div>
								<div className="col-auto">
									<label className="inlineFormInput">Birthday</label>
									<input
										type="text"
										className="form-control mb-2 text-center"
										id="User"
										placeholder="2021-04-08"
										onChange={e => setBirthday(e.target.value)}
									/>
								</div>
								<small id="emailHelp" className="form-text text-muted">
									Por favor revisa bien tus datos cuando termines.
								</small>
								<Button type="submit" variant="outline-info">
									Register
								</Button>
							</div>
						</form>
					</>
				</Row>
			</Container>
		</>
	);
};
