import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Dropdown, DropdownButton, Button } from "react-bootstrap";

export const Navbar1 = () => {
	return (
		<>
			<Navbar className="navigation" collapseOnSelect expand="lg" bg="transparent" variant="dark" text="white">
				<Link to={"/"}>
					<Navbar.Brand href="#home">
						<img
							src="https://www.freelogoservices.com/api/main/images/1j+ojFVDOMkX9Wytexe43D6khvSBrBVOnx3IwXs1M3EMoAJtliItgPtj8v46 "
							width="90px"
						/>
					</Navbar.Brand>
				</Link>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="ml-auto mx-5">
						<Link to={"/"}>
							<Button variant="in1" href="#home" color="white">
								Inicio
							</Button>
						</Link>{" "}
						<Link to={"/categorias"}>
							<Button variant="in1" href="#home" color="white">
								Categorias
							</Button>
						</Link>{" "}
						<Link to={"/cupones"}>
							<Button variant="in1" href="#home" color="white">
								Cupones
							</Button>
						</Link>
						<Link to={"/register"}>
							<Button variant="in1" href="#home" color="white">
								Registro
							</Button>
						</Link>
						<Link to={"/login"}>
							<Button variant="in1" href="#home" color="white">
								Ingresar
							</Button>
						</Link>
						<div className="mb-2 text-white">
							{["left"].map(direction => (
								<DropdownButton
									key={direction}
									id={`dropdown-button-drop-${direction}`}
									drop={direction}
									variant="in1"
									title=""
									text="white">
									<Link to={"/"}>
										<Dropdown.Item eventKey="1">Favoritos</Dropdown.Item>
									</Link>
									<Dropdown.Divider />
									<Dropdown.Item eventKey="4">Cerrar sesión</Dropdown.Item>
								</DropdownButton>
							))}
						</div>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</>
	);
};
