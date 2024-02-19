import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
			<div class="container-fluid">
				<Link to="/home" className="navbar-brand">Kever</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDarkDropdown" aria-controls="navbarNavDarkDropdown" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon">{user.username}</span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
					<ul className="navbar-nav">
						<li className="nav-item dropdown">
							<ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDarkDropdownMenuLink">
								<li><Link to="/profile" className="dropdown-item" >Mi perfil</Link></li>
								<li> <Logout /></li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};
