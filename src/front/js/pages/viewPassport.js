import React from "react";

import { Carrusel } from "../component/carrusel";
import { Card } from "../component/Card";

import "../../styles/home.scss";

export const ViewPassport = () => {
	return (
		<div>
			<div style={{ width: "100%" }}>
				<Carrusel />
			</div>
			<div className="container" />
		</div>
	);
};
