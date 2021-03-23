import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { Context } from "../store/appContext";
import { Container, Dropdown, DropdownButton } from "react-bootstrap";
import tomatelo from "../../img/logo/tomatelo2.png";
import "../../styles/disable_scroll.scss";
import "../../styles/home.scss";
//Animaciones
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({ duration: 2000 });

export const NavFav = () => {
	const { actions, store } = useContext(Context);
	console.log(store.favorites);

	const handleMenu = e => {
		e.preventDefault();
		$("nav").toggleClass("hide");
	};
	return (
		<>
			{store.jwtoken == null ? <Redirect to="/" /> : ""}
			<Container>
				<div className="header-wrap">
					<div className="header-top d-flex justify-content-between align-items-center">
						<div className="logo">
							<Link to="/home">
								<span>
									<img className="logomove" src={tomatelo} alt="Logo de la página" />
								</span>
							</Link>
							{/* <span className="text-white top text-uppercase">PROYECTO M||RA</span> */}
						</div>
						<div className="main-menubar d-flex align-items-center">
							<nav className="hide">
								<Link to="/home" className="float-left mt-1">
									<a>Home</a>
								</Link>
								<DropdownButton
									size="sm"
									className="float-left"
									variant="outline-light"
									title={"Favorites " + store.favorites.length}>
									{store.favorites.length == 0 ? (
										<Dropdown.Item>Empty</Dropdown.Item>
									) : (
										store.favorites.map((favorite, i) => {
											return (
												<Dropdown.Item
													eventKey={i}
													key={i}
													onClick={() => actions.deleteFavorites(i)}>
													<div>
														{favorite.cocktail_name}
														<i className="far fa-trash-alt" />
													</div>
												</Dropdown.Item>
											);
										})
									)}
								</DropdownButton>
							</nav>
							<div className="menu-bar" onClick={e => handleMenu(e)}>
								<span className="fas fa-bars" />
							</div>
						</div>
					</div>
				</div>
			</Container>
		</>
	);
};
