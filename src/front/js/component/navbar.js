import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light bg-transparent">
			<div className="container-fluid">
				<a className="navbar-brand" href="#">
					<img
						src="https://www.global-retail.com/wp-content/uploads/2017/11/Global_Market.png"
						width="150px"
					/>
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon" />
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav me-auto mb-2 mb-lg-0">
						<li className="nav-item">
							<a className="btn btn-outline-success text-white" aria-current="page" href="#">
								Inicio
							</a>
						</li>

						<li className="nav-item">
							<a className="btn btn-outline-success text-white" href="#">
								Categorias
							</a>
						</li>

						<li className="nav-item">
							<a
								className="btn btn-outline-success text-white"
								href="#"
								tabIndex="-1"
								aria-disabled="true">
								Cupones
							</a>
						</li>

						<li className="nav-item">
							<a
								className="btn btn-outline-success text-white"
								href="#"
								tabIndex="-1"
								aria-disabled="true">
								Registro
							</a>
						</li>

						<li className="nav-item">
							<a
								className="btn btn-outline-success text-white"
								href="#"
								tabIndex="-1"
								aria-disabled="true">
								Login
							</a>
						</li>

						<li className="nav-item dropdown">
							<a
								className="btn btn-outline-success text-white nav1"
								href="#"
								id="navbarDropdown"
								role="button"
								data-bs-toggle="dropdown"
								aria-expanded="false">
								°°°
							</a>
							<ul className="dropdown-menu" aria-labelledby="navbarDropdown">
								<li>
									<a className="dropdown-item" href="#">
										Action
									</a>
								</li>
								<li>
									<a className="dropdown-item" href="#">
										Another action
									</a>
								</li>
								<li>
									<hr className="dropdown-divider" />
								</li>
								<li>
									<a className="dropdown-item" href="#">
										Something else here
									</a>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};
