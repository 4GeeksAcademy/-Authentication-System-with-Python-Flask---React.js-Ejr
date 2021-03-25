import React, { useState, useContext } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
//import { Link } from "react-router-dom";
import { Container, Row, Button } from "react-bootstrap";
//Animaciones
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({ duration: 2000 });
export const Login = () => {
	const { actions, store } = useContext(Context);
	const history = useHistory();
	const [first_name, setFirst_name] = useState("");
	const [last_name, setLast_name] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [birthday, setBirthday] = useState("");
	const [redirect, setRedirect] = useState(false);

	const [recover, setRecover] = useState("");

	return (
		<>
			{store.jwtoken != null ? <Redirect to="/home" /> : ""}
			<Container className="mt-4 mb-2" id="Login">
				<Row>
					<article className="text-center text-light col-12 col-md-12 textBox" id="Login">
						<div data-aos="zoom-in">
							<p className="display-5">
								Si deseas saber más y ver los diferentes cócteles registrate y seguido haz login y así
								podrás ver todo nuestro contenido.
							</p>
						</div>
						<hr className="my-1" />
					</article>

					<div className="p-1 col-12 col-md-6 text-center text-light textBox">
						<form
							onSubmit={async e => {
								e.preventDefault();
								if (email === "" || password === "") {
									alert("TOMATE`LO: Faltan datos por llenar!");
								} else {
									await actions.login(email, password);
								}
							}}>
							<h4 className="display-5">Log In</h4>
							<hr className="my-1" />
							<div className="form-group align-items-center">
								<div data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
									<div className="col-auto">
										<label className="inlineFormInput">Email</label>
										<input
											type="text"
											className="form-control mb-2 text-center"
											id="User"
											placeholder="tomate.lo@gmail.com"
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
									<small id="emailHelp" className="form-text text-little">
										Por favor revisa bien tus datos cuando termines.
									</small>
									<Button type="submit" variant="outline-info">
										Log In
									</Button>
								</div>
							</div>
						</form>

						{/* <form
							onSubmit={async e => {
								e.preventDefault();
								await actions.forgotPass(recover);
							}}>
							<div className="form-group align-items-center">
								<div data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
									<div className="col-auto">
										<label className="inlineFormInputGroup">Olvidaste tu password?</label>
										<div className="input-group mb-2">
											<input
												type="password"
												className="form-control text-center"
												id="Password"
												placeholder="tomatelo3x2"
												onChange={e => setRecover(e.target.value)}
											/>
										</div>
									</div>
									<small id="emailHelp" className="form-text text-muted">
										Por favor revisa bien tus datos cuando termines.
									</small>
									<Button type="submit" variant="outline-info">
										Cambiar
									</Button>
								</div>
							</div>
						</form> */}
					</div>

					<div className="p-1 col-12 col-md-6 text-center text-light textBox">
						<form
							onSubmit={async e => {
								e.preventDefault();
								let ok = await actions.signup(first_name, last_name, email, password, birthday);
								if (
									first_name === "" ||
									last_name === "" ||
									email === "" ||
									password === "" ||
									birthday === ""
								) {
									alert("TOMATE`LO: Faltan datos por llenar!");
								} else if (ok) {
									history.push("/");
									alert("TOMATE`LO: Te invitamos poner tus datos en Login e ingresar!");
								} else {
									alert("Fallo al registrar, porfavor intentalo de nuevo!");
								}
							}}>
							<div data-aos="flip-left" data-aos-easing="ease-out-cubic" data-aos-duration="2000">
								<h4 className="display-5">Registro</h4>
								<hr className="my-1" />
								<div className="form-group align-items-center">
									<Row>
										<div className="col-12 col-md-6">
											<label className="inlineFormInput">Nombre</label>
											<input
												type="text"
												className="form-control mb-2 text-center"
												id="User"
												placeholder="Tomatico"
												onChange={e => setFirst_name(e.target.value)}
											/>
										</div>
										<div className="col-12 col-md-6">
											<label className="inlineFormInput">Apellido</label>
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
											placeholder="año-mes-día"
											onChange={e => setBirthday(e.target.value)}
										/>
									</div>
									<small id="emailHelp" className="form-text text-little">
										Por favor revisa bien tus datos cuando termines.
									</small>
									<Button type="submit" variant="outline-info">
										{/* onPress={this.reset} */}
										Registro
									</Button>
								</div>
							</div>
						</form>
					</div>
				</Row>
			</Container>
		</>
	);
};
// comentario
