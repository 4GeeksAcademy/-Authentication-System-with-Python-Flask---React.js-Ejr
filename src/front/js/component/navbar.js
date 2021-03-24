import React, { useState, useContext } from "react";
import Redirect from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Container, Dropdown, DropdownButton } from "react-bootstrap";
import tomatelo from "../../img/logo/tomatelo2.png";
import "../../styles/disable_scroll.scss";
import "../../styles/home.scss";
//Animaciones
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({ duration: 2000 });
export const Navbar = () => {
	const { actions, store } = useContext(Context);
	const handleMenu = e => {
		e.preventDefault();
		$("nav").toggleClass("hide");
	};
	return (
		<Container>
			<div className="header-wrap">
				<div className="header-top d-flex justify-content-between align-items-center">
					<div className="logo">
						<a href="##">
							<span>
								<img className="logomove" src={tomatelo} alt="Logo de la página" />
							</span>
						</a>
						{/* <span className="text-white top text-uppercase">PROYECTO M||RA</span> */}
					</div>
					<div className="main-menubar d-flex align-items-center">
						<nav className="hide">
							<DropdownButton
								size="sm"
								className="float-left"
								variant="outline-light"
								title={"Favorites " + store.favorites.length}>
								{store.favorites.length == 0 ? (
									<Dropdown.Item>
										<footer className="blockquote-footer">
											<small className="text-muted">Empty</small>
										</footer>
									</Dropdown.Item>
								) : (
									store.favorites.map((favorite, i) => {
										return (
											<Dropdown.Item
												eventKey={i}
												key={i}
												onClick={() => actions.deleteFavorites(favorite.id)}>
												<footer className="blockquote-footer">
													<small className="text-muted">{favorite.cocktail_name}</small>
													<i className="far fa-trash-alt" />
												</footer>
											</Dropdown.Item>
										);
									})
								)}
							</DropdownButton>
							<a href="#BaseDrinks" className="float-left mt-1">
								Base
							</a>
							<Link to="/" className="float-left mt-1" onClick={() => actions.signout()}>
								LogOut
							</Link>
						</nav>
						<div className="menu-bar" onClick={e => handleMenu(e)}>
							<span className="fas fa-bars" />
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
};
