import React from "react";
import { Lacteos } from "../component/lacteos";
import { Granos } from "../component/granos";
import { CuidadoPersonal } from "../component/cuidadoPersonal";
import { Link } from "react-router-dom";

export const Categorias = () => {
	return (
		<>
			<h1 className="h2 mx-auto py-4 font-weight-light">
				<strong>Categorias</strong>
			</h1>
			<h4>
				<strong>Lacteos</strong>
			</h4>
			<div className="categorias">
				<Lacteos />
				<Lacteos />
				<Lacteos />
				<Lacteos />
				<Lacteos />
				<Lacteos />
				<Lacteos />
				<Lacteos />
			</div>
			<br />
			<h4>
				<strong>Granos</strong>
			</h4>
			<div className="categorias">
				<Granos />
				<Granos />
				<Granos />
				<Granos />
				<Granos />
				<Granos />
				<Granos />
				<Granos />
				<Granos />
			</div>
			<br />
			<h4>
				<strong>Cuidado Personal</strong>
			</h4>
			<div className="categorias">
				<CuidadoPersonal />
				<CuidadoPersonal />
				<CuidadoPersonal />
				<CuidadoPersonal />
				<CuidadoPersonal />
				<CuidadoPersonal />
				<CuidadoPersonal />
				<CuidadoPersonal />
				<CuidadoPersonal />
				<CuidadoPersonal />
			</div>
		</>
	);
};
