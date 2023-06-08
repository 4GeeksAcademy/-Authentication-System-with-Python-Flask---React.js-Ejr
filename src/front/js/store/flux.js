import React, { useState } from "react";

const getState = ({ getStore, getActions, setStore }) => {
	const url = process.env.BACKEND_URL; // Declarar la variable url

	return {
		store: {
			message: ["Parece que funciona... (?) valor anterior era null y no referenciaba al backend"],
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			loadRestaurants: () => {
				fetch(url)
					.then(response => response.json())
					.then(data => {
						setStore({
							restaurants: data
						});
					})
					.catch(error => {
						console.error(error);
					});
			},
			loginRequest: (email, password) => {
				fetch(url, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ email, password })
				})
					.then(response => response.json())
					.then(data => {
						console.log(data);
						// Actualizar el estado de inicio de sesión según corresponda
						if (data.success) {
							setStore({ loggedIn: true });
						} else {
							setStore({ loggedIn: false });
						}
					})
					.catch(error => {
						console.error(error);
					});
			},
			registerUser: async (user) => {
				try {
					const response = await fetch(`${url}/signup`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(user),
					});

					if (!response.ok) {
						throw new Error("Error al registrar usuario");
					}

					// Realizar acciones adicionales después del registro exitoso si es necesario

				} catch (error) {
					console.error(error);
					// Manejar errores de registro
				}
			},
		},
	};
};

export default getState;

export const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleNameChange = (event) => {
		setName(event.target.value);
	};

	const handleEmailChange = (event) => {
		setEmail(event.target.value);
	};

	const handlePasswordChange = (event) => {
		setPassword(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const user = {
			name: name,
			email: email,
			password: password,
		};

		const { registerUser } = getActions();

		registerUser(user);
	};

	return (
		<div>
			<h1>Sign Up</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="name">Name:</label>
				<input type="text" id="name" name="name" value={name} onChange={handleNameChange} required /><br /><br />

				<label htmlFor="email">Email:</label>
				<input type="email" id="email" name="email" value={email} onChange={handleEmailChange} required /><br /><br />

				<label htmlFor="password">Password:</label>
				<input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} required /><br /><br />

				<input type="submit" value="Sign Up" />
			</form>
		</div>
	);
};
