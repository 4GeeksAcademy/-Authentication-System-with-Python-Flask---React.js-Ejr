import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Modal1 } from "../component/modal";

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
						<p className="Precio"> Supermercado: Megasuper</p>
					</ul>
					<div className="modal_mov">
						<Modal1 />
					</div>
				</div>
			</div>
		</div>
	);
};
