import React from "react";
import { Link } from "react-router-dom";
import { Globalcard } from "../component/globalcard";

export const Favoritos = () => {
	return (
		<>
			<p className="h2 mx-auto py-4 font-weight-light">Tus productos favoritos</p>

			<div className="whole_content">
				<div className="contenedor_fav1">
					<Globalcard />
					<Globalcard />
					<Globalcard />
					<Globalcard />
					<Globalcard />
				</div>
				<div className="contenedor_fav2">
					<Globalcard />
					<Globalcard />
					<Globalcard />
					<Globalcard />
					<Globalcard />
				</div>
			</div>
		</>
	);
};
