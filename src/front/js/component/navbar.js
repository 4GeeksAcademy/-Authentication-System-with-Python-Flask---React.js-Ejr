import React, {useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import logoImageUrl from "../../img/logoHW.png";
import "../../styles/index.css";

export const Navbar = () => {
	const { store, actions } = useContext(Context)
	const navigate = useNavigate();
	const token = localStorage.getItem("token")

	const handleLogOut= () => {
		actions.logOut();
		navigate('/')
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-light">
		 	 {/* <nav className="navbar navbar-expand-lg navbar-light">
				<div className="container-fluid">
					<Link to="/"> 
					<a className="navbar-brand" href="#">
					<img className="logo" src={logoImageUrl}/> 
					</a>
					</Link>
					<h2 className="navbar-text mx-2">Friendly Wheels</h2>
					<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse justify-content-end" id="navbarNav">
					<ul className="navbar-nav">
						<li className="nav-item">
						<Link to="/login">  
						<button className="btn btn-light">Login</button>
						</Link>  
						</li>
					</ul>
					</div>
				</div>
    		</nav> */}
			<div className="container-fluid">
				{/* Logo de la empresa */}
				<Link to="/"> 
					<img className="logo" src={logoImageUrl}/> 
				</Link>
				{/* Nombre de la empresa */}
				<h2 className="navbar-text mx-2">Friendly Wheels</h2>
				{token ?
					<>
						<div>
							<button className="btn-lg btn-light">Añadir vehículo</button>
						</div>
						<div className="nav dropdown me-5">
							<a className=" d-flex nav-link dropdown-toggle text-white bg-primary rounded align-items-center" href="#" role="button" data-bs-toggle="dropdown">
								Favoritos
								<span className="bg-secondary px-2 ms-1" style={{borderRadius:"30px"}}>{store.favorites.length}</span>
							</a>
							<ul className="dropdown-menu">
								{store.favorites.length === 0 
									? <li className="text-center">(empty)</li>
									: <p>Tengo algo</p>  /* En esta linea iria el map */
								}
							</ul>
						</div>
						<div className="nav dropdown me-5">
							<a className=" d-flex nav-link dropdown-toggle text-white bg-primary rounded align-items-center" href="#" role="button" data-bs-toggle="dropdown">
								Tú
								<span className="bg-secondary px-2 ms-1" style={{borderRadius:"30px"}}>{store.myVehicles.length}</span>
							</a>
							<ul className="dropdown-menu">
								{store.myVehicles.length === 0 
									? <li className="text-center">(empty)</li>
									: <p>Tengo algo</p>  /* En esta linea iria el map */
								}
							</ul>
						</div>
						<div>
							<button className="btn-lg btn-light"onClick={handleLogOut}>Log Out</button>
						</div>
					</>
					: (
						<>
							<Link to="/login"> 
								<div>	
									<button className="btn-lg btn-light">Login</button>
								</div>
							</Link> 
							<Link to="/signup"> 
								<div>	
									<button className="btn-lg btn-light">Signup</button>
							
								</div>
							</Link> 
						</>
					)
				} 			
      		</div>
   		 </nav>
	);
};
