import React from "react";
import { Cupones } from "../component/cuponesCard";
import { Link } from "react-router-dom";

export const Cupones1 = () => {
	return (
		<>
			<p className="h2 mx-auto py-4 font-weight-light">Cupones disponibles</p>

			<div className="container-fluid" style={{ width: "80rem" }}>
				<Cupones />
				<Cupones />
				<Cupones />
				<Cupones />
				<Cupones />
				<Cupones />
				<Cupones />
				<Cupones />
				<Cupones />
				<Cupones />
			</div>
		</>
	);
};
