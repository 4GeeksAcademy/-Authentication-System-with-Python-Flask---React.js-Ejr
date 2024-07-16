import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);

	const navigate = useNavigate();
	const { actions } = useContext(Context);

	const handleRegister = async (e) => {
		e.preventDefault();
		try {
			const response = await actions.userRegister(email, password);
			if (response.email) {
				console.log("user registered was successfull.");
				alert("Message: User registered was successfull.");
				navigate("/");
			}
		} catch (error) {
			setError("Error to register.");
		}
	};

	return (
		<div className="container-fluid py-5">
		<h1>Register</h1>
		<form onSubmit={handleRegister}>
				<div className="col-md-6">
					<label for="inputEmail4" className="form-label">Username</label>
					<input type="email" className="form-control" id="inputEmail4"></input>
				</div>
				<div className="col-md-6">
					<label for="inputPassword4" className="form-label">Password</label>
					<input type="password" className="form-control" id="inputPassword4"></input>
				</div>
				<div className="col-12">
					<label for="inputAddress" className="form-label">Email</label>
					<input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St"></input>
				</div>
				<div className="col-12">
					<button type="submit" className="btn btn-primary">Sign up</button>
				</div>
			</form>
			<Link to="/">Back Home</Link>
		</div>
	);
};