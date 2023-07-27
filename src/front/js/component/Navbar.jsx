import React from "react";
import { Link } from "react-router-dom";
import Styles from "../views/styles/navbar.css"
// import { useNavigate } from "react-router-dom";

// import { Context } from '../store/appContext.js';



const Navbar = () => {

	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-light header">
			<div className="container-fluid">
				<Link className="navbar-brand" to="/">
					<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5Kwl4gT7z8mc8Ug0BaVPrzvedTvuLAZ8VFQ&usqp=CAU</img" alt="logo" />
				</Link>
				<div className="botonesNavbar">
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0 botonLogin">
							<li className="nav-item">
								<Link className="nav-link" to="/login">LOGIN</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/signup">REGISTER</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/">SETTINGS</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/"> <i class="fa-solid fa-cart-shopping" /></Link>
							</li>
							<li className="nav-item dropdown">
								<a className="nav-link dropdown-toggle" href="#" id="favoritesDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
									<i class="fa-sharp fa-solid fa-heart"></i>
								</a>
								<ul className="dropdown-menu" aria-labelledby="favoritesDropdown">
									<li><a className="dropdown-item" href="#">Action</a></li>
									<li><a className="dropdown-item" href="#">Another action</a></li>
									<li><hr className="dropdown-divider" /></li>
									<li><a className="dropdown-item" href="#">Something else here</a></li>
								</ul>
							</li>
						</ul>
					</div>
					<br />
					<br />

					<form className="d-flex">
						<input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
						<button className="btn btn-outline-success" type="submit">Search</button>
					</form>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;