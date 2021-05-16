import React from "react";
import { Cupones } from "../component/cuponesCard";
import { Link } from "react-router-dom";

export const Cupones1 = () => {
	return (
		<>
			<div className="container-fluid">
				<div className="categoriaspage row">
					<p className="h2 mx-auto py-4 font-weight-light">Cupones disponibles</p>

					<div className="col-lg-12 categorias1">
						<Cupones />
						<Cupones />
						<Cupones />
						<Cupones />
						<Cupones />
					</div>
				</div>
			</div>
		</>
	);
};
