import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import logoGame from "/src/front/img/logo.png";

export const Navbar = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem("jwt-token");
		if (token) {
			setUser("denis9diaz@hotmail.com"); // Traer el username del backend
		} else {
			setUser(null);
		}
	}, []);

	const handleLogin = () => {
		const token = localStorage.getItem("jwt-token");
		if (token) {
			setUser("denis9diaz@hotmail.com"); // Username del backend
			navigate("/perfil");
		} else {
			navigate("/login");
		}
	};

	const handleLogout = () => {
		localStorage.removeItem("jwt-token");
		setUser(null);
		navigate("/");
	};

	return (
		<nav className="navbar navbar-dark bg-black bg-light pe-5">
			<Link to="/">
				<img src={logoGame} alt="logo" className="imageLogo" />
			</Link>
			<Link to="/lista-tesoros" className="navbar-brand mb-0 h1" title="TREASURES">
				<i className="fas fa-search icon"></i><span className="link-text">TREASURES</span>
			</Link>
			<Link to="/formulario-tesoro" className="navbar-brand mb-0 h1" title="HIDE YOUR TREASURE">
				<i className="fas fa-eye-slash icon"></i><span className="link-text">HIDE TREASURE</span>
			</Link>
			<Link to="/rankings" className="navbar-brand mb-0 h1" title="RANKINGS">
				<i className="fas fa-trophy icon"></i><span className="link-text">RANKINGS</span>
			</Link>
			{user ? (
				<div className="ml-auto dropdown">
					<button className="btn btn-link text-light dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
						<FontAwesomeIcon icon={faUser} className="me-1" /> {user}
					</button>
					<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
						<li><Link className="dropdown-item" to="/perfil">My Profile</Link></li>
						<li><button className="dropdown-item logout" onClick={handleLogout}>Logout</button></li>
					</ul>
				</div>
			) : (
				<div className="ml-auto">
					<div style={{ display: "inline-block", marginRight: "10px" }}>
						<Link to="/registro" className="nav-link">
							<button className="btn btn-warning">Create your account</button>
						</Link>
					</div>
					<div style={{ display: "inline-block", marginRight: "10px" }}>
						<Link className="btn-link text-warning" to="/login" onClick={handleLogin}>Login</Link>
					</div>
				</div>
			)}
		</nav>
	);
};
