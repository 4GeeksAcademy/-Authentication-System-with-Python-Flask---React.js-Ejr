import React, { useState } from "react";

export const Demo = () => {
	const [showModal, setShowModal] = useState(false);
	const [data, setData] = useState({
		email: "",
		password: "",
	});

	const handleLogin = async (formData) => {
		formData.preventDefault();
		const response = await fetch(`${process.env.BACKEND_URL}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		if (!response.ok) {
			alert("Wrong user or password");
		} else {
			const result = await response.json();
			sessionStorage.setItem("token", result.access_token);
			console.log('te has logueado', result.access_token);
		}
		setShowModal(false);
	};

	return (
		<div className="App">
			<button onClick={() => setShowModal(true)}>Login</button>

			{showModal && (
				<div className="login-modal">
					<div className="modal-content">
						<span className="close" onClick={() => setShowModal(false)}>&times;</span>
						<h2>Login</h2>
						<form onSubmit={handleLogin}>
							<label>Email:</label>
							<input
								type="email"
								id="email"
								name="email"
								value={data.email}
								onChange={(e) => setData({ ...data, email: e.target.value })}
								required
							/>
							<label>Contraseña:</label>
							<input
								type="password"
								id="password"
								name="password"
								value={data.password}
								onChange={(e) => setData({ ...data, password: e.target.value })}
								required
							/>
							<button type="submit">Login</button>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};
