import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Register = () => {
	const { store, actions } = useContext(Context);
	const [name, setName] = useState("")
	const [username, setUsername] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [repeatPasword, setRepeatPassword] = useState("")
	const [error, setError] = useState(false)

    
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
					<div className="mb-3">
						<label for="exampleInputEmail1" className="form-label">Name</label>
						<input type="name" className="form-control" id="exampleInputEmail1" value={name} onChange={e => setName(e.target.value)} aria-describedby="emailHelp" />
						<div id="emailHelp" className="form-text"></div>
					</div>
					<div className="mb-3">
						<label for="exampleInputPassword1" className="form-label">Username</label>
						<input type="text" className="form-control" id="exampleInputPassword1" value={username} onChange={e => setUsername(e.target.value)} />
					</div>
					<div className="mb-3">
						<label for="exampleInputEmail1" className="form-label">Email</label>
						<input type="email" className="form-control" id="exampleInputEmail1" value={email} onChange={e => setEmail(e.target.value)} aria-describedby="emailHelp" />
						<div id="emailHelp" className="form-text"></div>
					</div>
					<div className="mb-3">
						<label for="exampleInputPassword1" className="form-label">Password</label>
						<input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={e => setPassword(e.target.value)} />
					</div>
					<div className="mb-3">
						<label for="exampleInputPassword1" className="form-label">Repeat password</label>
						<input type="password" className="form-control" id="exampleInputPassword1" value={repeatPasword} onChange={e => setRepeatPassword(e.target.value)} />
					</div>
					<button type="submit" className="btn btn-primary">Submit</button>
				</form>
				{error && <p className="text-danger">Todos los campos son obligatorios</p>}
			</form>
			<p><a className="link-opacity-50-hover" href="https://expert-guacamole-r475gg7979j9cg57-3000.app.github.dev/">Already have an account?Login</a></p>
		</div>
	);
};
