import React from "react";
import { Link, animateScroll as scroll } from "react-scroll";
import { Carrusel } from "../component/carrusel";
import { Card } from "../component/Card";

import "../../styles/home.scss";


export const viewPassport = () => {
	

	return (
		<div>
			<div style={{ width: "100%" }}>
				<Carrusel />
			</div>
			<div className="container">
				<Card />
			</div>
		</div>
	);
};
