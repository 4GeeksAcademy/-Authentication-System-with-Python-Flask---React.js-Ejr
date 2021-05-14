import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const Cupones = props => {
	return (
		<div className="card mb-3">
			<div className="row g-0">
				<div className="col-md-4">
					<img src="https://grupolasser.com/wp-content/uploads/2015/04/aire-15-descuento.png" width="200px" />
				</div>
				<div className="col-md-8">
					<div className="card-body">
						<h5 className="card-title">Cupon Aplicable por 15% de descuento</h5>
						<p className="card-text">
							Adquiera este cupon el dia de hoy y aplique a su compra un 15% de descuento en preductos
							selecionados
						</p>
						<button type="button" className="btn btn-success">
							Adquirir
						</button>
						<p className="card-text">
							<small className="text-muted">Valido hasta el 11/05/21</small>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
