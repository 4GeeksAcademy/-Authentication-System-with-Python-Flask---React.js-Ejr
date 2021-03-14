import React, { useContext } from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import { Context } from "../store/appContext";
import { Carrusel } from "../component/carrusel";
import { Intro } from "../component/intro";
import "../../styles/home.scss";
import { ComponenteInf } from "../component/ComponentInf";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div>
			<div style={{ width: "100%" }}>
				<Carrusel />
			</div>
			<div className="container">
				<ComponenteInf />
			</div>
		</div>
	);
};
