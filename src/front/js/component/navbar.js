import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom"

export const Navbar = () => {

	const { store, actions } = useContext(Context)
	const history = useHistory();
	const onLogout = () => {
		history.push('/home')
	}


	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">Investor</span>
				</Link>
				<Link to="/company_register">
					<button className="btn btn-success">Empresas</button>
				</Link>
				<div className="ml-auto">
					<Link to="/register">
						<button className="btn btn-success mx-5">Registrate</button>
					</Link>
					{!store.token ?
					<Link to="/login">
						<button className="btn btn-success">Ingresar</button>
					</Link>
					:
					<Link to="/">
					<button onClick={() => actions.logout()} className="btn btn-success">Salir</button>
					</Link>
								
				}
					<Link to="/company_login">
						<button className="btn btn-success">Ingreso Empresa</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
