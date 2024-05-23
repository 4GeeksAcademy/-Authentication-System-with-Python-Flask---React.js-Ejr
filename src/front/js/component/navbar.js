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
	 		actions.myVehiclesInRent();
			actions.favorites();
		}
	}, [store.vehicles]);

	return (
		<nav className="navbar navbar-light">
			<div className="container-fluid">
				<div className="d-flex">
					<Link to="/">
						<img className="logo" src={logoImageUrl} />
					</Link>
						<h2 className="navbar-text ms-2 mt-3 mb-2 display-4 text-center text-white-50"><strong>Friendly Wheels</strong></h2>
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
								<li className="nav-item mb-3" data-bs-toggle="offcanvas">
									<Link to="/favoritos" className="text-decoration-none">
										<div className="text-black text-decoration-none">Mis Favoritos</div>
									</Link>
								</li>
								<li className="nav-item dropdown mb-3" data-bs-toggle="offcanvas">
									<Link to="/miscoches" className="text-decoration-none">
										<div className="text-black text-decoration-none">Mis Coches en alquiler</div>
									</Link>
								</li>
								<li className="nav-item mb-3" data-bs-toggle="offcanvas">
									<Link to="/agregarvehiculo" className="text-decoration-none">
										<div className="text-black text-decoration-none">Pon tu coche en Friendly Wheels</div>
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
