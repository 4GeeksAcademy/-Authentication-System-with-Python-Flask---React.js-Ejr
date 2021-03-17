import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Button, Form, FormControl, Navbar, Nav, Col } from "react-bootstrap";
import { logoAzul } from "../../img/image";
import { LoginModal } from "./Login";

const MyNavbar = props => {
	if (props.location.pathname === "/") {
		return " ";
	} else {
		return (
			<>
				<nav className="navbar navbar-light my-3">
					<Link to="/">
						<img
							src={logoAzul}
							width="110"
							height="33"
							className="d-inline-block align-top mt-2"
							alt="cotec logo"
						/>
					</Link>
					<Col md={6} />
					<Form inline className="Buscar">
						<FormControl type="text" placeholder="Buscar" className="mr-sm-4" />
						<Button variant="btn">
							<i className="fas fa-search" />
						</Button>
					</Form>
					<div className="ml-auto" style={{ display: "block", marginRight: "auto", marginLeft: "auto" }}>
						<Link to="/register">
							<button className="btn btn-outline-primary" style={{ border: "none" }}>
								Registrate
							</button>
						</Link>
						{LoginModal()}
					</div>
				</nav>
				<Navbar bg="light" expand="lg" style={{ borderBottom: "1px solid gray " }}>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="navbar-nav justify-content-between w-100">
							<Nav.Link href="/category" className="h5 text-dark">
								Desarrolloar/IT
							</Nav.Link>
							<Nav.Link href="/category" className="h5 text-dark">
								Diseño
							</Nav.Link>
							<Nav.Link href="/category" className="h5 text-dark">
								Contabilidad
							</Nav.Link>
							<Nav.Link href="/category" className="h5 text-dark">
								Marketing
							</Nav.Link>
							<Nav.Link href="/category" className="h5 text-dark">
								Ley/Derecho
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
			</>
		);
	}
};
export default withRouter(MyNavbar);
