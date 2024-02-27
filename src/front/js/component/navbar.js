import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	const { actions } = useContext(Context)
	const [userData, setUserData] = useState('')
	const [name, setName] = useState('')

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const data = await actions.getUserData()
				if (userData.error) {
					console.error("Error al traer datos de usuario: ", userData.error);
					setName('Usuario')
					return;
				}
				setUserData(data)
				const fullName = userData.name + " " + userData.lastname
				setName(fullName)
			} catch (error) {
				console.error("Error obteniendo datos de usuario: ", error)
				setName('Usuario')
			}
		};
		fetchUserData()
	}, [actions])


	return (
		<nav className="navbar fixed-top navbar-light bg-light">
			<div className="container">
				<div id="home-link">
					<Link to="/home">
						<span className="navbar-brand mb-0 h1">HOME</span>
					</Link>
				</div>
				<div id="center-nav">
					<Link to="/patient_schedule">
						<p id="turns-button">Turnero</p>
					</Link>
					<Link to="/payments">
						<p>Mis Pagos</p>
					</Link>
				</div>
				<div id="profile-button">
					<div class="dropdown">
						<button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
							{name}
						</button>
						<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
							<li><Link class="dropdown-item" to="/profile">Mi perfil</Link></li>
							<li><Link class="dropdown-item" to="/login">Cerrar sesión</Link></li>
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};
