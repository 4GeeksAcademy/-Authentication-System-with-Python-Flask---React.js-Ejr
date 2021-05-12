import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const Globalcard = props => {
	return (
		<div className="tarjeta">
			<div className="card" style={{ width: "16rem" }}>
				<img
					src="https://www.cellshop.com/52067-large_default/desodorante-rexona-women-bamboo-48hs-150ml.jpg"
					className="card-img-top"
					alt="..."
				/>
				<div className="card-body">
					<h5 className="card-title">Desodorante Rexona</h5>
					<ul>
						<p className="Precio"> Precio: 1900.00 colones</p>
						<p className="Precio"> Supermercado: Magasuper</p>
					</ul>
					<a href="#" className="btn btn-outline-success float-right">
						Ver detalles
					</a>
					<button type="button" className="btn btn-outline-success float-right">
						<i className="fas fa-cart-arrow-down" />
					</button>
				</div>
			</div>
		</div>
	);
};
