import React from "react";
import "../../styles/demo.scss";
import { Home } from "./home";
import { Link } from "react-router-dom";

export const Registropymes = registropymes => {
	return (
		<div className="container">
			<ul>
				<li>
					<Link to="actualizardatos">Actualizar Datos</Link>
				</li>
			</ul>
		</div>
	);
};
