import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/landingpage.scss";
import { Caracteristicas1 } from "../component/landingpage/caracteristicas1";
import { Caracteristicas2 } from "../component/landingpage/caracteristicas2";

export const CaracteristicasView = () => {
	return (
		<div className="container">
			<Caracteristicas1 />
			<Caracteristicas2 />
		</div>
	);
};
