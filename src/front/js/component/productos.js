import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const Productos = props => {
	return (
		<div className="card" style={{ width: "18rem" }}>
			<img
				src="https://s.cornershopapp.com/product-images/2396159.jpg?versionId=0dSB2gVycI.56L1TiAQMDGV7vXsQo54n"
				className="card-img-top"
				alt="..."
			/>
			<div className="card-body">
				<h5 className="card-title">Leche Dos Pinos</h5>
				<ul>
					<p className="Precio"> Precio: 680.00 colones</p>
					<li className="Precio"> Supermercado: Palí</li>
				</ul>
				<a href="#" className="btn btn-outline-success float-right">
					Ver detalles
				</a>
				<button type="button" className="btn btn-outline-success float-right">
					<i className="fas fa-cart-arrow-down" />
				</button>
			</div>
		</div>
	);
};
