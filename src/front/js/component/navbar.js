import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Navbar, Nav, Dropdown, DropdownButton, Button } from "react-bootstrap";

export const Navbar1 = () => {
	const { store, actions } = useContext(Context);
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
									<Link to={"/favorites"}>
										<Button eventKey="1" style={{ backgroundColor: "rgb(255, 231, 133)" }}>
											Favoritos {store.favorites.length}
										</Button>
									</Link>
									<Dropdown.Divider />
									<Link to={"/contact"}>
										<Button eventKey="1" style={{ backgroundColor: "rgb(255, 231, 133)" }}>
											Contactenos
										</Button>
									</Link>
									<Dropdown.Divider />
									<Button
										eventKey="3"
										style={{ backgroundColor: "rgb(255, 231, 133)" }}
										onClick={() => {
											setLogin(false);
											alert("Ha cerrado sesion correctamente");
										}}>
										Cerrar sesión
									</Button>
								</DropdownButton>
							))}
						</div>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</>
	);
};
