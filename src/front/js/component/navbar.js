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
		if (store.vehicles.length === 0) {
			actions.getVehicles();
		}
	}, []);

	useEffect(() => {
		if (store.vehicles.length !== 0) {
			actions.favorites();
			actions.myVehiclesInRent();
		}
	}, [store.vehicles]);

	return (
		<nav className="navbar navbar-light">
			<div className="container-fluid">
				<div className="d-flex">
					<Link to="/">
						<img className="logo" src={logoImageUrl} />
					</Link>
						<h2 className="navbar-text ms-2 mt-3 mb-2 display-4 text-center"><strong>Friendly Wheels</strong></h2>
				</div>
				{token ?
				<>
					<button 
						className="d-flex navbar-toggler bg-white align-items-center rounded-pill"
						type="button"
						data-bs-toggle="offcanvas"
						data-bs-target="#offcanvasNavbar"
						aria-controls="offcanvasNavbar"
						aria-label="Toggle navigation"
					>
						<div><span className=" navbarbutton navbar-toggler-icon me-2"></span></div>
						<div className="usericon"><i className="fas fa-user-circle"></i></div>
					</button>
					<div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
						<div className="offcanvas-header my-0">
							<h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menú</h5>
							<button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
						</div>
						<div className="offcanvas-body">
							<ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
								<li className="nav-item dropdown mb-3">
									<a className="nav-link dropdown-toggle text-black" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
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
									<li className="nav-item dropdown mb-3">
										<a className="nav-link dropdown-toggle text-black" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
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
									<li className="nav-item mb-3" data-bs-toggle="offcanvas">
										<Link to="/agregarvehiculo" className="text-decoration-none">
											<div className="text-black text-decoration-none">Pon tú coche en Friendly Wheels</div>
										</Link>
									</li>
									<li className="nav-item" data-bs-toggle="offcanvas">
										<Link to="/" className="text-decoration-none">
											<div className="text-black text-decoration-none" onClick={handleLogOut}>Cerrar sesión</div>
										</Link>
									</li>
							</ul>
						</div>
					</div>
				</>
					: (
						<div>
							<button 
								className="d-flex navbar-toggler bg-white align-items-center rounded-pill"
								type="button"
								data-bs-toggle="offcanvas"
								data-bs-target="#offcanvasNavbar"
								aria-controls="offcanvasNavbar"
								aria-label="Toggle navigation"
							>
								<div><span className=" navbarbutton navbar-toggler-icon me-2"></span></div>
								<div className="usericon"><i className="fas fa-user-circle"></i></div>
							</button>
							<div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
								<div className="offcanvas-header">
									<h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menú</h5>
									<button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
								</div>
								<div className="offcanvas-body">
									<ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
										<li className="nav-item mb-3" data-bs-toggle="offcanvas">
											<Link to="/signup" className="text-black text-decoration-none">
												<div>Regístrate</div>
											</Link>
										</li>
										<li className="nav-item" data-bs-toggle="offcanvas">
											<Link to="/login" className="text-decoration-none">
												<div className="text-black text-decoration-none">Iniciar sesión</div>
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
