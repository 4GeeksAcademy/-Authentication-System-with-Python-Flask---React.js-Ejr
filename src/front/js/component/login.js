import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const Login = () => {
	const [showModal, setShowModal] = useState(false);
	const [data, setData] = useState({
        email: "",
        password: "",
    });
	

	const handleLogin = async (data) => {
    const response = await fetch(`${process.env.BACKEND_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) 
    });
    if (!response.ok) {
        alert("Wrong user or password")
    }
    if (response.ok) {
        data = response.json();
        sessionStorage.setItem("token", data.access_token); 
        console.log('te has logueado', token)
    } 
		setShowModal(false);
	};
};
	
	return (
		<div className="App">
			<button onClick={() => setShowModal(true)}>Login</button>

			{showModal && (
				<div className="login-modal">
					<div className="modal-content">
						<span className="close" onClick={() => setShowModal(false)}>&times;</span>
						<h2>Login</h2>
						<form onSubmit={handleLogin()}>
							<label>Email:</label>
							<input
								type="email"
                                id="email"
                                name="email"
								value={email}
								onChange={(e) => setData({...data, [e.target.name]: e.target.value })}
								required
							/>
							<label>Contraseña:</label>
							<input
								type="password"
                                id="password"
                                name="password"
								value={password}
								onChange={(e) => setData({...data, [e.target.name]: e.target.value })}
								required
							/>
							<button type="submit">Login</button>
						</form>
					</div>  
				</div>
			)}
		</div>
	);
}