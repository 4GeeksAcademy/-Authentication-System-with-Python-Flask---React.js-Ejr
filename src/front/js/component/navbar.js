import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useHistory } from "react-router-dom";
import logo from "../../img/newAppLogo.jpeg";
import { Search } from "./search";
import "../../styles/navbar.scss";
import "../pages/actualizarclienteview";
import "../pages/actualizarvendedorview";

export const Navbar = () => {
	const { actions, store } = useContext(Context);
	const history = useHistory();
	return (
		<section className="ftco-section">
			<div className="container">
				<div className="row justify-content-between">
					<div className="col">
						<span>
							<Link to="/" className="navbar-brand">
								<img
									className="rounded float-left"
									src={logo}
									style={{ height: "100px", width: "200px" }}
								/>
							</Link>
						</span>
						{/* <Link to="/" className="navbar-brand">
							Pura Vida <span>Mart</span>
						</Link> */}
					</div>
					<div className="col d-flex justify-content-end">
						<div className="social-media">
							<p className="mb-0 d-flex">
								{store.token && store.token !== "" && store.token !== undefined ? null : (
									<Link
										to="/registerUserIn"
										className="d-flex align-items-center justify-content-center"
										data-toggle="tooltip"
										title="Crear Cuenta">
										<span className="fas fa-user-plus" />
									</Link>
								)}
								{store.token && store.token !== "" && store.token !== undefined ? null : (
									<Link
										to="/logUserIn"
										className="d-flex align-items-center justify-content-center"
										data-toggle="tooltip"
										title="Ingresar">
										<span className="fas fa-sign-in-alt" />
									</Link>
								)}
								{store.token && store.token !== "" && store.token !== undefined ? (
									<Link
										to="/"
										className="d-flex align-items-center justify-content-center"
										data-toggle="tooltip"
										title="Salir"
										onClick={() => {
											actions.logUserOut();
											history.push("/");
										}}>
										<span className="fas fa-sign-out-alt" />
									</Link>
								) : null}
								{store.token && store.token !== "" && store.token !== undefined ? (
									<Link
										to="/"
										className="d-flex align-items-center justify-content-center"
										data-toggle="tooltip"
										title="Carrito de Compras">
										<span className="fas fa-shopping-cart" />
									</Link>
								) : null}
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
									<a className="dropdown-item">Nuevo Producto</a>
									<a className="dropdown-item" href="/checkoutview.js">
										Comprar
									</a>
									<a className="dropdown-item" href="/logueado.js">
										logueado
									</a>
									<a className="dropdown-item">
										<Link to="/actualizarvendedorview" className="nav-link">
											Atualizar Vendedor
										</Link>
									</a>
									<a className="dropdown-item">
										<Link to="/actualizarclienteview" className="nav-link">
											Atualizar Comprador
										</Link>
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
