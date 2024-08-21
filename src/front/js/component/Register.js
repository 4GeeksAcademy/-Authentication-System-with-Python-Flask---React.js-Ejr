import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Demo = () => {
	const { store, actions } = useContext(Context);
	const [error, setError] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		username: '',
		email: '',
		password: '',
		repeatPassword: '',
	});

	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	}

	const handleSubmit = async (e) => {
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
		const success = await actions.register(formData);
		if (success) {
			navigate("/"); 
		}
	}

	return (
		<div className="container-register">

			<h1 className="register">Want to join us?</h1>
			<p className="p2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod<br /> tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim<br /> veniam, quis nostrud exercitation.</p>
			<p className="p3">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut<br /> labore et dolore magna aliqua.</p>
			<form className="formulario" onSubmit={handleSubmit}>
				<div className="mb-3">
					<label htmlFor="name" className="form-label"></label>
					<input type="text" className="form-control" id="name" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
				</div>

				<div className="mb-3">
					<label htmlFor="username" className="form-label"></label>
					<input type="text" className="form-control" id="username" name="username" placeholder="username" value={formData.username} onChange={handleChange} />
				</div>

				<div className="mb-3">
					<label htmlFor="email" className="form-label"></label>
					<input type="email" className="form-control" id="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
				</div>

				<div className="mb-3">
					<label htmlFor="password" className="form-label"></label>
					<input type="password" className="form-control" id="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
				</div>

				<div className="mb-3">
					<label htmlFor="repeatPassword" className="form-label"></label>
					<input type="password" className="form-control" id="repeatPassword" name="repeatPassword" placeholder="Repeat Password" value={formData.repeatPassword} onChange={handleChange} />
				</div>

				<button type="submit" className="btn-register btn-primary">Submit</button>
				{error && <p className="text-danger">Todos los campos son obligatorios y las contraseñas deben coincidir</p>}
			</form>
			<p>
				<Link className="link-opacity-50-hover" to="/">
					Already have an account? <span>Login</span>
				</Link>
			</p>
		</div>
	);
};
