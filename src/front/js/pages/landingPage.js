import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/landingpage.scss";
import { Caracteristicas1 } from "../component/landingpage/caracteristicas1";
import { Caracteristicas2 } from "../component/landingpage/caracteristicas2";
import { LandingCarousel } from "../component/landingpage/landingcarousel";
import { Precios } from "../component/landingpage/precios";
import { Contacto } from "../component/landingpage/contacto";

export const LandingPage = () => {
	return (
		<div className="container">
			<LandingCarousel />
			<Caracteristicas1 />
			<Caracteristicas2 />
			<Precios />
			<Contacto />
		</div>
	);
};
