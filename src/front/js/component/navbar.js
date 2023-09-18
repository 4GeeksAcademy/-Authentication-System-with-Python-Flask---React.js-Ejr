import React from "react";
import { Link } from "react-router-dom";
import bookswaplogo from "../../img/logo-final-project.png";
import { Buttonsignup } from "../component/btn-signup";
import { Buttonlogin } from "../component//btn-login";
import "../../styles/index.css";


export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg bg-body-tertiary">
			<div className="container-fluid ">
				<a class="navbar-brand" href="#">
					<img className="align-middle" src={bookswaplogo} alt="bookswap" height="100" />
				</a>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<a className="nav-link active" aria-current="page" href="#">Our Books</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">Genres</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#">Reviews</a>
						</li>
						<li className="nav-item">
							<Buttonsignup />
						</li>
						<li className="nav-item">
							<Buttonlogin />
						</li>
					</ul>
					<form className="d-flex" role="search">
						<input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
						<button className="btn btn-outline-success" type="submit">Search</button>
					</form>
				</div>
			</div>
		</nav>
	);
};
