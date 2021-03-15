import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Container, Button, Form, FormControl } from "react-bootstrap";
import { logoBlanco, man, logoAzul } from "../../img/image";

const Navbar = props => {
	if (props.location.pathname === "/") {
		return " ";
	} else {
		return (
			<>
				<nav className="navbar navbar-light bg-info mb-3">
					<Link to="/">
						<img
							src={logoAzul}
							width="110"
							height="33"
							className="d-inline-block align-top"
							alt="coteclogo"
						/>
					</Link>

					<Form inline className="Buscar">
						<FormControl type="text" placeholder="Buscar" className="mr-sm-4" />
						<Button variant="btn btn-primary">Buscar</Button>
					</Form>

					<div className="ml-auto">
						<Link to="/register">
							<button className="btn btn-primary">Registrate</button>
						</Link>
						&nbsp;
						<Link to="/login">
							<button className="btn btn-primary">Ingresa</button>
						</Link>
					</div>
				</nav>
			</>
		);
	}
};

export default withRouter(Navbar);
