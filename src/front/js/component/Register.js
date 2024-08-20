import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Register = () => {
	const { store, actions } = useContext(Context);
	const [error, setError] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		username: '',
		email: '',
		password: '',
		repeatPassword: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		const { name, username, email, password, repeatPassword } = formData;

		// Validar que todos los campos estén completos
		if (name === "" || username === "" || email === "" || password === "" || repeatPassword === "") {
			setError(true);
			return;
		}

		// Validar que las contraseñas coincidan
		if (password !== repeatPassword) {
			setError(true);
			alert("Passwords do not match!");
			return;
		}

		setError(false);
		// Aquí puedes agregar la lógica para enviar los datos o realizar alguna acción adicional
		actions.register(formData)
	}

	return (
		<div className="container">
			<form onSubmit={handleSubmit}>
				<h1>Want to join us?</h1>
				<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

				<div className="mb-3">
					<label htmlFor="name" className="form-label">Name</label>
					<input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} />
				</div>

				<div className="mb-3">
					<label htmlFor="username" className="form-label">Username</label>
					<input type="text" className="form-control" id="username" name="username" value={formData.username} onChange={handleChange} />
				</div>

				<div className="mb-3">
					<label htmlFor="email" className="form-label">Email</label>
					<input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
				</div>

				<div className="mb-3">
					<label htmlFor="password" className="form-label">Password</label>
					<input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} />
				</div>

				<div className="mb-3">
					<label htmlFor="repeatPassword" className="form-label">Repeat Password</label>
					<input type="password" className="form-control" id="repeatPassword" name="repeatPassword" value={formData.repeatPassword} onChange={handleChange} />
				</div>

				<button type="submit" className="btn btn-primary">Submit</button>
				{error && <p className="text-danger">Todos los campos son obligatorios y las contraseñas deben coincidir</p>}
			</form>
			<p>
				<Link className="link-opacity-50-hover" to="/Login">
					Already have an account? Login
				</Link>
			</p>
		</div>
	);
};
