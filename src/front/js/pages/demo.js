import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
// import "../../styles/demo.css";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const Demo = () => {
	const [showModal, setShowModal] = useState(false);
	const { store } = useContext(Context);
	const navigate = useNavigate();
	const [data, setData] = useState({
		email: "",
		password: "",
	});

	const handleInputChange = (e) => {
		setData({ ...data, [e.target.name]: e.target.value });
	};

	const handleLogin = async (e) => {
		e.preventDefault();

		const response = await fetch(`${process.env.BACKEND_URL}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});
		if (response.ok) {
			const result = await response.json();
			sessionStorage.setItem("token", result.access_token);
		} else {
			alert("Wrong username or password please try again.");

		}

		//REDIRECCIÓN DE LAS PAGINAS 
		const decoded = jwtDecode(store.token);
		switch (decoded.role) {
			case 'user': console.log('te llevo a user');
				//navigate("/user")     
				break;
			case 'trainer':
				console.log('te llevo a trainer');
				//navigate("/trainer")     
				break;
			default:
				console.error('Role not recognized:', decoded.role);
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
								onChange={handleInputChange}
								placeholder="Email"
								required
							/>
							<label>Password:</label>
							<input
								type="password"
								id="password"
								name="password"
								value={data.password}
								onChange={handleInputChange}
								placeholder="Password"
								required
							/>
							<button type="submit">Login</button>
							<button onClick={() => sessionStorage.removeItem("token")}>LogOUt</button>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};
