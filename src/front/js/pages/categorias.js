import React from "react";
import { Globalcard } from "../component/globalcard";
import { Link } from "react-router-dom";

export const Categorias = () => {
	return (
		<>
			<div className="container">
				<div className="categoriaspage" />
				<h1 className="h2 mx-auto py-4 font-weight-light">
					<strong>Categorias</strong>
				</h1>
				<h4>
					<strong>Lacteos</strong>
				</h4>
				<div className="categorias">
					<Globalcard />
				</div>
				<br />
				<h4>
					<strong>Granos</strong>
				</h4>
				<div className="categorias">
					<Globalcard />
				</div>
				<br />
				<h4>
					<strong>Cuidado Personal</strong>
				</h4>
				<div className="categorias">
					<Globalcard />
				</div>
			</div>
		</>
	);
};
