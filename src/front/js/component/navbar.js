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
			console.log(actions);
			actions.favorites();
		}
	}, [store.vehicles])

	return (
		<nav className="navbar navbar-expand-lg navbar-light">
			<div className="container-fluid">
				<div className="d-flex align-items-center">
					<Link to="/">
						<img className="logo" src={logoImageUrl} />
					</Link>
					<div className="ms-3">
						<h2 className="navbar-text ms-3 pt-4 text-center"><strong>Friendly Wheels</strong></h2>
					</div>
				</div>
				{token ?
					<>
					<div className="d-flex align-items-center">
						<div className="text-dark align-items-center mx-0 fs-4" type="button">
							<ul class="navbar-nav me-auto mb-2 mb-lg-0">
								<li class="nav-item active me-2 me-n2">
									<a class="nav-link" href="#">Añadir Vehículo<span class="sr-only">(current)</span></a>
								</li>
							</ul>
						</div>
						</div>
						<div className="nav-item me-2 me-n2">
							<a className="dropdown-toggle text-dark align-items-center mx-0 fs-4" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								Favoritos
								<span className="px-1 text-dark fs-4" style={{ borderRadius: "30px" }}>{store.favorites.length}</span>
							</a>
							<ul className="dropdown-menu">
								{store.favorites.length === 0
									? <li className="text-center">(empty)</li>
									: (store.favorites.map((item, index) => (
										<li key={index} className="d-flex justify-content-between text-primary m-2">
											{item.matricula}
											<button onClick={() => actions.removeFav(item.id)} className="btn p-0 px-1">
												<i className="fas fa-trash"></i>
											</button>
										</li>
									)))
								}
							</ul>
						</div>
						<div className="btn-group me-1 text-center">
							<a className="dropdown-toggle text-dark align-items-center mx-0 fs-4" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								Tú
								<span className="px-1 text-dark fs-4" style={{ borderRadius: "30px" }}>{store.myVehicles.length}</span>
							</a>
							<ul className="dropdown-menu">
								{store.myVehicles.length === 0
									? <li className="text-center">(empty)</li>
									: <p>Tengo algo</p>  /* En esta linea iria el map */
								}
							</ul>
						</div>
						<div>
							<button className="btn-lg btn-light" onClick={handleLogOut}>Log Out</button>
						</div>
					</>
					: (
						<>
							<div className="d-flex">
								<Link to="/login">
									<div className="btn-group me-3">
										<button className="btn-lg btn-light">Login</button>
									</div>
								</Link>
								<Link to="/signup">
									<div className="btn-group me-5">
										<button className="btn-lg btn-light">Signup</button>
									</div>
								</Link>
							</div>
						</>
					)
				}
			</div>
		</nav >
	);
};
