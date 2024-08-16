import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Demo = () => {
	const { store, actions } = useContext(Context);
	const [error, setError] = useState(false)
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})

	const handlechange = e => {
		const {name, value} = e.target
		setFormData({...formData, [name]: value})
	}

    
	const handleSubmit = (e) => {
		e.preventDefault()
		if (username === "" || password === "" || name === "" || email === "" || repeatPasword === "") {
			setError(true)
			return
		}
		setError(false)
	}

	return (
		<div className="container">
			<form>
				<form onSubmit={handleSubmit}>
					<h1>Want to join us?</h1>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
					<div class="mb-3">
						<label for="exampleInputEmail1" class="form-label">Name</label>
						<input type="name" class="form-control" id="exampleInputEmail1" value={Name} onChange={handlechange} aria-describedby="emailHelp" />
						<div id="emailHelp" class="form-text"></div>
					</div>
					<div class="mb-3">
						<label for="exampleInputPassword1" class="form-label">Username</label>
						<input type="text" class="form-control" id="exampleInputPassword1" value={Username} onChange={handlechange} />
					</div>
					<div class="mb-3">
						<label for="exampleInputEmail1" class="form-label">Email</label>
						<input type="email" class="form-control" id="exampleInputEmail1"value={Email} onChange={handlechange} aria-describedby="emailHelp" />
						<div id="emailHelp" class="form-text"></div>
					</div>
					<div class="mb-3">
						<label for="exampleInputPassword1" class="form-label">Password</label>
						<input type="password" class="form-control" id="exampleInputPassword1" value={Password} onChange={handlechange} />
					</div>
					<div class="mb-3">
						<label for="exampleInputPassword1" class="form-label">Repeat password</label>
						<input type="password" class="form-control" id="exampleInputPassword1" value={repeatPasword} onChange={handlechange} />
					</div>
					<button type="submit" class="btn btn-primary">Submit</button>
				</form>
				{error && <p className="text-danger">Todos los campos son obligatorios</p>}
			</form>
			<p><a class="link-opacity-50-hover" href="https://expert-guacamole-r475gg7979j9cg57-3000.app.github.dev/">Already have an account?Login</a></p>
		</div>
	);
};
