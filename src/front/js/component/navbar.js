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
			<div className="container-fluid" style={{ maxWidth: "1500px" }}>
				<div className="d-flex gap-3">
					<Link to="/">
						<img className="logo ms-0" src={logoImageUrl} />
					</Link>
					<h2 className="navbar-text ms-2 mt-3 mb-2 display-4 text-center text-white fs-2"><strong>Friendly Wheels</strong></h2>
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
								<h4 className="offcanvas-title" id="offcanvasNavbarLabel"><strong>Menú</strong></h4>
								<button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
							</div>
							<div className="offcanvas-body">
								<ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
									<li className="nav-item mb-3" data-bs-toggle="offcanvas">
										<Link to="/favoritos" className="text-decoration-none">
											<div className="fs-5 text-black text-decoration-none">Mis Favoritos <i class="fas fa-heart"></i></div>
										</Link>
									</li>
									<li className="nav-item dropdown mb-3" data-bs-toggle="offcanvas">
										<Link to="/miscoches" className="text-decoration-none">
											<div className="fs-5 text-black text-decoration-none">Mis Coches <i class="fas fa-car"></i></div>
										</Link>
									</li>
									<li className="nav-item mb-4" data-bs-toggle="offcanvas">
										<Link to="/agregarvehiculo" className="text-decoration-none">
											<div className="fs-5 text-black text-decoration-none">Pon tu coche en Friendly Wheels <i class="fas fa-plus-circle"></i></div>
										</Link>
									</li>
									<li className="nav-item mb-1" data-bs-toggle="offcanvas">
										<Link to="/" className="text-decoration-none">
											<div className="fs-5 text-black text-decoration-none" onClick={handleLogOut}>Cerrar sesión  <i className="fas fa-sign-out-alt pt-3"></i></div>
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
									<h4 className="offcanvas-title" id="offcanvasNavbarLabel"><strong>Menú</strong></h4>
									<button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
								</div>
								<div className="offcanvas-body">
									<ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
										<li className="nav-item mb-3" data-bs-toggle="offcanvas">
											<Link to="/signup" className="text-decoration-none">
												<div className="text-black fs-5">Regístrate <i class="fas fa-user-plus"></i></div>
											</Link>
										</li>
										<li className="nav-item mb-2" data-bs-toggle="offcanvas">
											<Link to="/login" className="text-decoration-none">
												<div className="text-black fs-5">Inicia sesión <i class="fas fa-sign-in-alt"></i></div>
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
