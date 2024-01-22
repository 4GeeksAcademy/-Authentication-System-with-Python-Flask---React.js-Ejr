
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context)


	return (
		<nav className="navbar navbar-dark mb-3 px-5">
			<Link className="navbar-brand" to="/">

				<p className=" m-1">
					<img src={logo} style={{ height: "40px" }} />
				</p>

			</Link>
			<div className="ml-auto">


				
				<div className="dropdown">
				<a class="nav-link dropdown-toggle align-items-center" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
						Mi Lista <div className="bg-danger px-1 mx-1 rounded d-flex justify-content-center">{store.contador}</div>
				</a>

					<ul className="dropdown-menu">

							<li>
								Agrega películas!

							</li>


					</ul>

				</div>

			</div>
		</nav>
	);
};