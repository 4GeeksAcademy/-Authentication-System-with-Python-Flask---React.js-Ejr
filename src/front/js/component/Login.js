import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import GoogleLogin from 'react-google-login';

export const Home = () => {
	const [error, setError] = useState(false);
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if (formData.email === "" || formData.password === "") {
			setError(true);
			return;
		}
		setError(false);
		// Aquí puedes agregar la lógica para enviar los datos del formulario
	}

	const respuestaGoogle = (respuesta) => {
		console.log(respuesta);
	}

	return (
		<div className="container">
			<h1 className="login">Welcome Back!</h1>
			<h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h5>
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="exampleInputEmail1" className="form-label"></label>
					<input
						type="text"
						name="email"
						value={formData.email}
						onChange={handleChange}
						className="form-control1"
						id="exampleInputEmail1"
						aria-describedby="emailHelp"
						placeholder="Email"
					/>
					<div id="emailHelp" className="form-text"></div>
				</div>
				<div className="mb-3">
					<label htmlFor="exampleInputPassword1" className="form-label"></label>
					<input
						type="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						className="form-control1"
						id="exampleInputPassword1"
						placeholder="Password"
					/>
					<p>
						<a className="link-opacity-50-hover" href="#">Forgot your password?</a>
					</p>
				</div>
				<div className="button-container">
					<button type="submit" className="btn-login btn-primary">Login</button>
					<GoogleLogin className="googlebutton"
						clientId="953402330168-infsbkt3uifhc81i1ohvn4oiq8dl596t.apps.googleusercontent.com"
						buttonText="Iniciar sesión con Google"
						onSuccess={respuestaGoogle}
						onFailure={respuestaGoogle}
						cookiePolicy={'single_host_origin'}
					/>
				</div>
				{error && <p className="text-danger">Todos los campos son obligatorios</p>}
			</form>
			<img src="img/Group 2.png" alt="Descripción de tu imagen" />
			<p>
				<a className="link-opacity-50-hover" href="https://expert-guacamole-r475gg7979j9cg57-3000.app.github.dev/demo">
					Not a member? <span>Sign up</span>
				</a>
			</p>
		</div>
	);
}
