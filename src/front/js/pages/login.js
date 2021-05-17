/* eslint-disable no-console */
import React, { useState, useEffect, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login1 = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { islogin } = store;
	const { setLogin } = actions;
<<<<<<< HEAD

	const getEmail = event => {
		setEmail(event.target.value);
	};
	const getPassword = event => {
		setPassword(event.target.value);
	};

	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	var raw = JSON.stringify({
		email: email,
		password: password
	});
	var requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow" //Preguntar a carlos
	};
	const logearUsuario = () => {
=======
	const [mensaje, setmensaje] = useState("");

	const handleSubmit = e => {
		e.preventDefault();

		const body = {
			email: email,
			password: password
		};

>>>>>>> d156b8add6cd0b86fc28ba2419d57529ffe053aa
		fetch("https://3001-moccasin-pigeon-4ixmcu8a.ws-us04.gitpod.io/api/login", {
			method: "POST",
			body: JSON.stringify(body),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(res => res.json())
			.then(data => {
				console.log(data);
				let token = data.token;
				//console.log(token);
				if (token) {
					sessionStorage.setItem("my_token", token);
					setLogin(true);
					console.log("is login ", islogin);

					alert("Inicio de cesion correcta!");
				} else {
					alert("Correo o contraseña incorrecta intente de nuevo");

					setLogin(false);
				}

				// let token = sessionStorage.getItem("my_token")
			})
			.catch(err => console.log(err));
	};

	return (
		<div className="container">
			<div className="login" />
			<div className="backdrop" />
			<div className="d-flex justify-content-center h-100">
				<div className="card c1">
					<div className="card-header">
						<h3>Acceder</h3>
						<div className="d-flex justify-content-end social_icon">
							<span>
								<i className="fab fa-facebook-square" />
							</span>
							<span>
								<i className="fab fa-google-plus-square" />
							</span>
							<span>
								<i className="fab fa-twitter-square" />
							</span>
						</div>
					</div>
					<div className="card-body">
						<form onSubmit={handleSubmit}>
							<div className="input-group form-group">
								<div className="input-group-prepend">
									<span className="input-group-text">
										<i className="fa fa-envelope" />
									</span>
								</div>
								<input
									type="text"
									className="form-control"
									placeholder="Email"
<<<<<<< HEAD
									onChange={getEmail}
=======
									onChange={e => {
										setEmail(e.target.value);
										setmensaje("");
									}}
>>>>>>> d156b8add6cd0b86fc28ba2419d57529ffe053aa
									required
								/>
							</div>
							<div className="input-group form-group">
								<div className="input-group-prepend">
									<span className="input-group-text">
										<i className="fas fa-key" />
									</span>
								</div>
								<input
									type="password"
									className="form-control"
									placeholder="Contraseña"
<<<<<<< HEAD
									onChange={getPassword}
=======
									onChange={e => setPassword(e.target.value)}
>>>>>>> d156b8add6cd0b86fc28ba2419d57529ffe053aa
									required
								/>
							</div>
							<div className="row align-items-center remember">
								<input type="checkbox" />
								Recordar
							</div>
							<div className="form-group">
								<input type="Submit" value="Ingresar" className="btn float-right login_btn" />
							</div>
						</form>
						{islogin ? <Redirect to="/" /> : null}
					</div>
					<div className="card-footer">
						<div className="d-flex justify-content-center links">
							No tienes cuenta?
							<Link to={"/register"} href="#">
								Adquirir
							</Link>
						</div>
						<div className="d-flex justify-content-center">
							<Link to={"/forgot"} href="#">
								Olvidaste la contraseña?
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
