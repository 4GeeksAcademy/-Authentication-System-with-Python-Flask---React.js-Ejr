import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import logoImageUrl from "../../img/logoHW.png";
import "../../styles/index.css";

export const Navbar = () => {
	const { store, actions } = useContext(Context)
	const navigate = useNavigate();
	const token = localStorage.getItem("token")

	const handleLogOut = () => {
		actions.logOut();
		navigate('/')
	};

	useEffect(() => {
		if (store.vehicles.length !== 0) {
			actions.favorites();
			actions.myVehiclesInRent();
		}
	}, [store.vehicles]);

	return (
		<nav class="navbar navbar-light">
			<div class="container-fluid">
				<div className="d-flex">
					<Link to="/">
						<img className="logo" src={logoImageUrl} />
					</Link>
					<div className="ms-3">
						<h2 className="navbar-text ms-3 mt-2 mb-2 display-4 text-center"><strong>Friendly Wheels</strong></h2>
					</div>
				</div>
				{token ?
				<>
					<button class="navbar-toggler bg-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
						<span class="navbar-toggler-icon"></span>
					</button>
					<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
						<div class="offcanvas-header">
							<h5 class="offcanvas-title" id="offcanvasNavbarLabel">Menú</h5>
							<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
						</div>
						<div class="offcanvas-body">
							<ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
								<li class="nav-item dropdown mb-3">
									<a class="nav-link dropdown-toggle text-black" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
										Favoritos
										<span className="px-1 text-dark fs-6" style={{ borderRadius: "30px" }}>{store.favorites.length}</span>
									</a>
									<ul className="dropdown-menu">
										{store.favorites.length === 0
											? <li className="text-center">(empty)</li>
											: (store.favorites.map((item, index) => (
												<li key={index} className="dropdown-item d-flex text-primary m-2">
													{item.matricula}
													<button onClick={() => actions.removeFav(item.id)} className="btn p-0 px-1">
														<i className="fas fa-trash"></i>
													</button>
												</li>
											)))
										}
									</ul>
									</li>
									<li class="nav-item dropdown mb-3">
										<a class="nav-link dropdown-toggle text-black" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
											Mis Coches
											<span className="px-1 text-dark fs-6" style={{ borderRadius: "30px" }}>{store.myVehicles.length}</span>
										</a>
										<ul className="dropdown-menu">
											{store.myVehicles.length === 0
												? <li className="text-center">(empty)</li>
												: (store.myVehicles.map((item, index) => (
													<li key={index} className="dropdown-item d-flex text-primary m-2">
														{item.matricula}
														<a onClick={() => actions.removeVehicle(item.id)} className="btn p-0 px-1">
															<i className="fas fa-trash"></i>
														</a>
													</li>
												)))
											}
										</ul>
									</li>
									<li class="nav-item mb-3">
										<Link to="/agregarvehiculo" className="text-decoration-none">
											<a className="text-black text-decoration-none">Pon tú coche en Friendly Wheels </a>
										</Link>
									</li>
									<li class="nav-item">
										<Link to="/agregarvehiculo" className="text-decoration-none">
											<a className="text-black text-decoration-none" onClick={handleLogOut}>Cerrar sesión </a>
										</Link>
									</li>
							</ul>
						</div>
					</div>
				</>
					: (
						<div>
							<button class="navbar-toggler justify-content-end bg-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
								<span class="navbar-toggler-icon"></span>
							</button>
							<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
								<div class="offcanvas-header">
									<h5 class="offcanvas-title" id="offcanvasNavbarLabel">Menú</h5>
									<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
								</div>
								<div class="offcanvas-body">
									<ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
										<li class="nav-item mb-3">
											<Link to="/signup" className="text-black text-decoration-none">
												<a>Regístrate</a>
											</Link>
										</li>
										<li class="nav-item">
											<Link to="/login" className="text-decoration-none">
												<a className="text-black text-decoration-none">Iniciar sesión</a>
											</Link>
										</li>
									</ul>
								</div>
							</div>
						</div>
					)
				}
			</div>
		</nav>
	);
};
