<<<<<<< HEAD
import React, { useEffect } from "react";
import { Navbar } from "react-bootstrap";
import { logoAzul } from "../../img/image";
import { withRouter } from "react-router-dom";

const MyNavbar = props => {
	useEffect(() => {
		console.log(props.location.pathname);
	}, []);

	if (props.location.pathname === "/") {
		return "";
	} else {
		return (
			<>
				<Navbar bg="light">
					<div className="container">
						<Navbar.Brand href="/">
							<img
								src={logoAzul}
								width="84"
								height="25"
								className="d-inline-block align-top"
								alt="cotec logo"
							/>
						</Navbar.Brand>
					</div>
=======
import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Button, Form, FormControl, Navbar, Nav, Col, Container } from "react-bootstrap";
import { logoAzul } from "../../img/image";
import { LoginModal } from "./Login";

const MyNavbar = props => {
	if (props.location.pathname === "/") {
		return " ";
	} else {
		return (
			<>
				<nav className="navbar navbar-light my-3">
					<Container>
						<Col md={5}>
							<Link to="/home">
								<img
									src={logoAzul}
									width="110"
									height="33"
									className="d-inline-block align-top mt-2"
									alt="cotec logo"
								/>
							</Link>
						</Col>
						<Col sm={6} md={4} className="hidden-sm">
							<Form inline className="Buscar sb d-flex float-right mt-2 hidden-sm">
								<FormControl type="text" placeholder="Buscar" className="mr-sm-4 search" />
								<Button variant="btn">
									<i className="fas fa-search pr-3" />
								</Button>
							</Form>
						</Col>
						<Col sm={6} md={3}>
							<div className="ml-auto float-right mt-2">
								{LoginModal()}
								<Link to="/register">
									<button className="btn btn-primary " style={{ borderRadius: "1.75rem" }}>
										&nbsp;&nbsp;&nbsp;Registrate&nbsp;&nbsp;&nbsp;
									</button>
								</Link>
							</div>
						</Col>
					</Container>
				</nav>
				<Navbar className="shadow" bg="light" expand="lg" style={{ borderBottom: "1px solid #A7A7A8 " }}>
					<Container>
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
					</Container>
>>>>>>> 2e10dc16ebf3e51eaa20cf0c4264e351b31b4fdd
				</Navbar>
			</>
		);
	}
};
<<<<<<< HEAD

=======
>>>>>>> 2e10dc16ebf3e51eaa20cf0c4264e351b31b4fdd
export default withRouter(MyNavbar);
