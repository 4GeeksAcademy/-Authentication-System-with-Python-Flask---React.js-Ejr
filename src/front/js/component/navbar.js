import React, { useState, useEffect } from "react";
import navbarlogo from "../../img/NavBarLogo.png";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		// Check if the user is logged in
		const token = localStorage.getItem("miTokenJWT");
		setIsLoggedIn(!!token); // Set isLoggedIn to true if token exists
	}, []);

	const handleLogoff = () => {
		localStorage.removeItem("miTokenJWT");
		localStorage.removeItem("loggedUserEmail");
		navigate('/login');
	};

	const handleYesClick = () => {
		handleLogoff();
		setShowModal(false);
	};

	const handleNoClick = () => {
		setShowModal(false);
	};

	useEffect(() => {
		// Update isLoggedIn state when the user logs off
		const token = localStorage.getItem("miTokenJWT");
		setIsLoggedIn(!!token);
	}, [showModal]);

	useEffect(() => {
		// Update isLoggedIn state when the user logs in
		const token = localStorage.getItem("miTokenJWT");
		setIsLoggedIn(!!token);
	}, []);

	const handleLogin = () => {
		setIsLoggedIn(true);
	};

	const handleLogout = () => {
		setIsLoggedIn(false);
	};

	const logoLink = isLoggedIn ? "/home" : "/";

	return (
		<nav className="navbar navbar-expand-lg" style={{ background: "linear-gradient(to bottom, rgba(255, 255, 255, 1) 90%, rgba(255, 255, 255, 0))" }}>
			<div className="container-fluid">
				<a className="navbar-brand" href={logoLink}>
					<img src={navbarlogo} alt="Adoptabuelo Logo" style={{ width: 270, height: 50 }} />
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav ms-auto">
						{isLoggedIn ? (
							<>
								<li className="nav-item">
									<span className="nav-link" style={{ color: "black" }}>
										<h5>Hola de nuevo, {localStorage.getItem("loggedUsername")}</h5>
									</span>
								</li>
								<li className="nav-item mx-2">
									<a className="btn btn-primary" href="/profile">
										Mi Perfil
									</a>
								</li>
								<li className="nav-item">
									<button className="btn btn-danger" onClick={() => setShowModal(true)}>
										Log Off
									</button>
								</li>
							</>
						) : (
							<>
								{/* Add your non-logged-in user content here */}
								<li className="nav-item">
									<a className="nav-link" href="/login" style={{ color: "black" }}>
										Entra en tu cuenta
									</a>
								</li>
								<li className="nav-item mx-2">
									<a className="btn btn-primary" href="/signupabuelo">
										Registrate
									</a>
								</li>
								<li className="nav-item">
									<a className="btn btn-primary" href="/signupvoluntario">
										¡Hazte voluntario!
									</a>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>

			{/* Log Off Modal */}
			<div className={`modal ${showModal ? 'd-block' : ''}`} tabIndex="-1" role="dialog">
				<div className="modal-dialog modal-dialog-centered" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<h5 className="modal-title">Confirmación de salida</h5>
							<button type="button" className="close closeModalButton" data-dismiss="modal" aria-label="Close" onClick={handleNoClick}>
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div className="modal-body">
							<p>¿Seguro que quieres salir de tu cuenta?</p>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-secondary" onClick={handleNoClick}>No</button>
							<button type="button" className="btn btn-danger" onClick={handleYesClick}>Sí, quiero salir</button>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};
