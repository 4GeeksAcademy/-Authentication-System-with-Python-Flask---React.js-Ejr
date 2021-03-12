//import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import React from "react";

export const Register = () => {
	/*const [name, setName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [redirect, setRedirect] = useState(false);

	const handleSubmit = e => {
		e.preventDefault();
		if (email === "" || pass === "" || name === "" || lastName === "") {
			alert("Su nombre , correo y contraseña son requeridos");
		}
		console.log(name, lastName, email, pass);

		// FETCH
		const data = { email: email, password: pass, name: name, last_name: lastName };

		fetch("https://3000-gray-marlin-8q5nd8h3.ws-us03.gitpod.io/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		})
			.then(response => response.json())
			.then(data => {
				console.log("Success:", data);
				setRedirect(true);
			})
			.catch(error => {
				console.error("Error:", error);
			});

		// setRedirect(true);
	};
*/
	return (
		<div
			className="container text-center mt-5 d-flex justify-content-center align-items-center"
			style={{ Maxwidth: "750px", background: "white", paddingTop: "92px", paddingBottom: "92px" }}>
			<form style={{ width: "400px" }} onSubmit={e => handleSubmit(e)}>
				<div className="row">
					<img
						style={{ Maxwidth: "422px", width: "425px", marginBottom: "20px" }}
						src="https://www.costaricavibes.com/wp-content/uploads/2019/09/Untitled-design-2019-09-18T103527.260.jpg"
					/>
				</div>
				<div className="form-floating mb-3">
					<input
						type="fullName"
						className="form-control"
						id="floatingInput"
						placeholder="Ingrese su nombre y apellido"
						onChange={e => setNombre_Completo(e.target.value)}
					/>
					<label htmlFor="floatingInput">Nombre Completo</label>
				</div>
				<div className="form-floating mb-3">
					<input
						type="email"
						className="form-control"
						id="floatingInput"
						placeholder="name@example.com"
						onChange={e => setEmail(e.target.value)}
					/>
					<label htmlFor="floatingInput">Email address</label>
				</div>
				<div className="form-floating">
					<input
						type="password"
						className="form-control"
						id="floatingPassword"
						placeholder="Enter a password"
						onChange={e => setPass(e.target.value)}
					/>
					<label htmlFor="floatingPassword">Password</label>
				</div>
				<input type="submit" className="btn btn-primary" value="Register" />
			</form>
			{redirect ? <Redirect to="/login" /> : ""}
		</div>
	);
};
