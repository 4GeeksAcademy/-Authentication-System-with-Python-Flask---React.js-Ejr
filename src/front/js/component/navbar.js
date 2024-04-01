import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import logoGame from "/src/front/img/logoSinFondo.png";

export const Navbar = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem("jwt-token");
		if (token) {
			setUser("denis9diaz@hotmail.com"); 
		} else {
			setUser(null);
		}
	}, []);

	const handleLogin = () => {
		const token = localStorage.getItem("jwt-token");
		if (token) {
			setUser("denis9diaz@hotmail.com");
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
		<nav className="navbar navbar-custom pe-5">
			<div>
				<Link to="/">
					<img src={logoGame} alt="logo" className="imageLogo" />
				</Link>
			<p className="text-navbar ps-3">URBAN TREASURES</p>
			</div>
			<Link to="/lista-tesoros" className="navbar-brand mb-0 h1" title="TREASURES">
				<i class="fas fa-gem icon me-3"></i><span className="link-text">Treasures</span>
			</Link>
			<Link to="/formulario-tesoro" className="navbar-brand mb-0 h1" title="HIDE YOUR TREASURE">
				<i class="fas fa-map-marked-alt icon me-3"></i><span className="link-text">Hide Treasure</span>
			</Link>
			<Link to="/rankings" className="navbar-brand mb-0 h1" title="RANKINGS">
				<i className="fas fa-trophy icon me-3"></i><span className="link-text">Rankings</span>
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
							<button className="btn btn-warning boton-navbar">Create your account</button>
						</Link>
					</div>
					<div style={{ display: "inline-block", marginRight: "10px" }}>
						<Link className="btn-link text-warning boton-navbar" to="/login" onClick={handleLogin}>Login</Link>
					</div>
				</div>
			)}
		</nav>
	);
};
