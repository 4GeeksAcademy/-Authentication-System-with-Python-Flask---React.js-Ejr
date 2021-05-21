import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useHistory } from "react-router-dom";
import logo from "../../img/newAppLogo.jpeg";
//import { Search } from "./search";
import "../../styles/navbar.scss";

export const Navbar = () => {
	const { actions, store } = useContext(Context);
	const history = useHistory();

	return (
		<section className="ftco-section bg-light">
			<div className="container">
				<div className="row justify-content-between">
					<div className="col">
						<Link to="/" className="navbar-brand mt-3">
							Pura Vida <span>Mart</span>
						</Link>
					</div>
					<div className="col d-flex justify-content-end">
						<div className="social-media mt-4">
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
										title="Ingresar como Cliente"
										onClick={() => {
											actions.isSellerOrClient(0);
										}}>
										<span className="fas fa-sign-in-alt" />
									</Link>
								)}
								{store.token && store.token !== "" && store.token !== undefined ? null : (
									<Link
										to="/logUserIn"
										className="d-flex align-items-center justify-content-center"
										data-toggle="tooltip"
										title="Ingresar como Vendedor"
										onClick={() => {
											actions.isSellerOrClient(1);
										}}>
										<span className="fas fa-money-bill" />
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
								{store.token &&
								store.token !== "" &&
								store.token !== undefined &&
								sessionStorage.getItem("whoIsLoggedIn") === "0" ? (
									<Link
										to="/checkoutview"
										className="d-flex align-items-center justify-content-center"
										data-toggle="tooltip"
										title="Carrito de Compras">
										<span className="fas fa-shopping-cart" />
									</Link>
								) : null}
								{store.token && store.token !== "" && store.token !== undefined ? (
									store.sellerId !== null ? (
										<Link
											to="/actualizarvendedorview"
											className="d-flex align-items-center justify-content-center"
											data-toggle="tooltip"
											title="Perfil vendedor"
											onClick={actions.getSellerData}>
											<span className="fas fa-user-circle" />
										</Link>
									) : (
										<Link
											to="/actualizarclienteview"
											className="d-flex align-items-center justify-content-center"
											data-toggle="tooltip"
											title="Perfil comprador"
											onClick={actions.getClientData}>
											<span className="fas fa-user-circle" />
										</Link>
									)
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
							{sessionStorage.getItem("sellerId") !== null ? (
								<li className="nav-item">
									<Link to="/newProduct" className="nav-link">
										Vender productos
									</Link>
								</li>
							) : null}
							{store.token && store.token !== "" && store.token !== undefined ? (
								sessionStorage.getItem("sellerId") !== null ? (
									<li className="nav-item">
										<Link to="/productosvendedor" className="nav-link">
											Mis Productos
										</Link>
									</li>
								) : (
									<li className="nav-item">
										<Link to="/logueado" className="nav-link">
											Catalogo
										</Link>
									</li>
								)
							) : null}
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
