import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import logo from "../../img/logo.jpeg";
import { Search } from "./search";
import "../../styles/navbar.scss";

export const Navbar = () => {
	const { actions, store } = useContext(Context);
	return (
		<section className="ftco-section">
			<div className="container">
				<div className="row justify-content-between">
					<div className="col">
						<a className="navbar-brand" href="index.html">
							Pura Vida <span>Mart</span>
						</a>
					</div>
					<div className="col d-flex justify-content-end">
						<div className="social-media">
							<p className="mb-0 d-flex">
								<Link
									to="/registerUserIn"
									className="d-flex align-items-center justify-content-center"
									data-toggle="tooltip"
									title="Crear Cuenta">
									<span className="fas fa-user-plus" />
								</Link>
								<Link
									to="/logUserIn"
									className="d-flex align-items-center justify-content-center"
									data-toggle="tooltip"
									title="Ingresar">
									<span className="fas fa-sign-in-alt" disabled={store.isLoggedIn ? true : false} />
								</Link>
								<Link
									to="/"
									className="d-flex align-items-center justify-content-center"
									data-toggle="tooltip"
									title="Salir"
									onClick={() => {
										actions.logUserOut();
									}}
									disabled={store.isLoggedIn ? false : true}>
									<span className="fas fa-sign-out-alt" />
								</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
			<nav className="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
				<div className="container">
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#ftco-nav"
						aria-controls="ftco-nav"
						aria-expanded="false"
						aria-label="Toggle navigation">
						<span className="fa fa-bars" /> Menu
					</button>
					<form action="#" className="searchform order-lg-last">
						<div className="form-group d-flex">
							<input type="text" className="form-control pl-3" placeholder="Search" />
							<button type="submit" placeholder="" className="form-control search">
								<span className="fa fa-search" />
							</button>
						</div>
					</form>
					<div className="collapse navbar-collapse" id="ftco-nav">
						<ul className="navbar-nav mr-auto">
							<li className="nav-item active">
								<Link to="/" className="nav-link">
									Inicio
								</Link>
							</li>
							<li className="nav-item dropdown">
								<a
									className="nav-link dropdown-toggle"
									href="#"
									id="dropdown04"
									data-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="false">
									Vistas
								</a>
								<div className="dropdown-menu" aria-labelledby="dropdown04">
									<a className="dropdown-item" href="#">
										Nuevo Producto
									</a>
									<a className="dropdown-item" href="#">
										Comprar
									</a>
									<a className="dropdown-item" href="#">
										Page 3
									</a>
									<a className="dropdown-item" href="#">
										Page 4
									</a>
								</div>
							</li>
							<li className="nav-item">
								<a href="#" className="nav-link">
									Catalogo
								</a>
							</li>
							<li className="nav-item">
								<Link to="/contact-us" className="nav-link">
									Contacto
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</section>
	);
};
