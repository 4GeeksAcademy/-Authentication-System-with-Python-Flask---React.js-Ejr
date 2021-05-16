import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

export const Login1 = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [mensaje, setmensaje] = useState("");
	const { islogin } = store;
	const { setLogin } = actions;

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
				// añadir token a session
				sessionStorage.setItem("my_token", data.token);
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
						<form onChange={logearUsuario()}>
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
									onChange={getEmail}
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
									onChange={getPassword}
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
