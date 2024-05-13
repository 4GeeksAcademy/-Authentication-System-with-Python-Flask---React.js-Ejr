import React, {useContext, useEffect} from "react";
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

	useEffect(() => {
		if (store.vehicles.length !== 0) {
			console.log(actions);
			actions.favorites();
		} 
	},[store.vehicles])

	return (
		<nav className="navbar navbar-expand-lg navbar-light">
			<div className="container-fluid">
				<div className="d-flex">
					<Link to="/"> 
						<img className="logo" src={logoImageUrl}/> 
					</Link>
					<div className="align-self-center">
						<h2 className="navbar-text ms-3 pt-4 display-4 text-center"><strong>Friendly Wheels</strong></h2>
					</div>
				</div>
				{token ?
					<>
						<div className="d-flex">
							<div className="btn-group me-5">
								<button className="btn-lg btn-light">Añadir vehículo</button>
							</div>
							<div className="btn-group me-5">
								<button className="btn btn-light btn-lg dropdown-toggle text-dark align-items-center mx-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
									Favoritos
									<span className="px-2 ms-1 text-success" style={{borderRadius:"30px"}}>{store.favorites.length}</span>
								</button>
								<ul className="dropdown-menu">
									{store.favorites.length === 0 
										? <li className="text-center">(empty)</li>
										: (store.favorites.map((item, index) => (
											<li key={index} className="d-flex justify-content-between text-primary">
												{item.matricula}
												<button onClick={() => actions.removeFav(item.id)} className="btn p-0 px-1">
													<i className="fas fa-trash"></i>
												</button>
											</li>
										)))
									}
								</ul>
							</div>
							<div className="btn-group me-5">
								<button className="btn btn-light btn-lg dropdown-toggle text-dark align-items-center mx-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
									Tú
									<span className="px-2 ms-1 text-success" style={{borderRadius:"30px"}}>{store.myVehicles.length}</span>
								</button>
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
						</div>
					</>
					: (
						<>
							<div className="d-flex">
								<Link to="/login"> 
									<div className="btn-group me-5">	
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
   		 </nav>
	);
};
