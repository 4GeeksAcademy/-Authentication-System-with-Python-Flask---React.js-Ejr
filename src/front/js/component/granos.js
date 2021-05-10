import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const Granos = props => {
	return (
		<div className="tarjeta">
			<div className="card" style={{ width: "16rem" }}>
				<img
					src="https://www.peridomicilio.com/images/detailed/28/7441006002460.jpg"
					className="card-img-top"
					alt="..."
				/>
				<div className="card-body">
					<h5 className="card-title">Arroz 95% Tio Pelon</h5>
					<ul>
						<p className="Precio"> Precio: 1500.00 colones</p>
						<p className="Precio"> Supermercado: Perimercado</p>
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
