import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";


export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light navbar-shadow">
			<div className="container d-flex justify-content-between align-items-center ">
				<Link to="/home" className="custom-link">
					<span className="navbar-brand mb-0 h1 custom-font align-midle">ShareTrips</span>
				</Link>
				<div className="ml-auto">
					{/* <Link to="/"> */}
						<button className="btn custom-button rounded-pill" data-bs-toggle="modal" data-bs-target="#loginModal" > <i class="bi bi-person-circle"></i> Iniciar Sesion</button>
					{/* </Link> */}
				</div>
			</div>
		</nav>
	);
};
