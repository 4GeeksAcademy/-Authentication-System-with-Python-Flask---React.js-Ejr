import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoGame from "/src/front/img/logoSinFondo.png";
import podio from "/src/front/img/podio.png"
import ubic from "/src/front/img/ubic.png"
import diamante from "/src/front/img/diamante.png"

export const Navbar = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState({ username: null, photo: null });

	const handleLogout = () => {
		localStorage.removeItem("jwt-token");
		setUser({ username: null, photo: null });
		navigate("/");
	};

	useEffect(() => {
		const token = localStorage.getItem("jwt-token");
	
		const fetchUserData = async () => {
			if (token) {
				try {
					const response = await fetch(process.env.BACKEND_URL + '/api/current-user', {
						method: 'GET',
						headers: {
							'Authorization': `Bearer ${token}`
						}
					});
					const data = await response.json();
	
					if (data.username) {
						setUser({ username: data.username, photo: data.photo });
					} else {
						setUser({ username: null, photo: null });
					}
				} catch (error) {
					console.error(error);
					setUser({ username: null, photo: null });
				}
			} else {
				setUser({ username: null, photo: null });
			}
		};
	
		fetchUserData();
	}, [localStorage.getItem("jwt-token")]);

	return (
		<nav className="navbar navbar-custom pe-5">
			<div className="navbar-group-left">
				<div>
				<Link to="/">
					<img src={logoGame} alt="logo" className="imageLogo" />
				</Link>
				<p className="text-navbar ps-3">URBAN TREASURES</p>
				</div>
				<Link to="/treasures" className="navbar-brand h1" title="TREASURES">
					<div className="div-bar"><div className="div-icono"><img src={diamante} alt="logo" className="icon1 me-3" /></div><div className="div-texto"><span className="link-text">Treasures List</span></div></div>
				</Link>
				<Link to="/hide" className="navbar-brand h1" title="HIDE YOUR TREASURE">
					<div className="div-bar"><div className="div-icono"><img src={ubic} alt="logo" className="icon2 me-2" /></div><div className="div-texto"><span className="link-text">Hide Treasure</span></div></div>
				</Link>
				<Link to="/rankings" className="navbar-brand h1" title="RANKINGS">
					<div className="div-bar"><div className="div-icono"><img src={podio} alt="logo" className="icon3 me-3" /></div><div className="div-texto"><span className="link-text">Rankings</span></div></div>
				</Link>
			</div>
			<div className="navbar-group-right">
			{user.username ? (
				<div className="ml-auto dropdown">
					<button className="btn btn-link text-light dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
						{user.photo ? <img src={user.photo} alt={user.username} className="user-image me-2" style={{ width: "35px", height: "35px", borderRadius: "50%" }} /> : null}
						{user.username}
					</button>
					<ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
						<li><Link className="dropdown-item" to="/profile">My Profile</Link></li>
						<li><button className="dropdown-item logout" onClick={handleLogout}>Logout</button></li>
					</ul>
				</div>
			) : (
				<div className="ml-auto">
					<div style={{ display: "inline-block", marginRight: "10px" }}>
						<Link to="/register" className="nav-link">
							<button className="btn btn-warning boton-navbar">Create your account</button>
						</Link>
					</div>
					<div style={{ display: "inline-block", marginRight: "10px" }}>
						<Link className="btn-link text-warning boton-navbar" to="/login">Login</Link>
					</div>
				</div>
			)}
			</div>
		</nav>
	);
};
