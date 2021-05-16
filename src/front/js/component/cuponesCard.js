import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Modal1 } from "../component/modal";

export const Cupones = props => {
	const { store, actions } = useContext(Context);

	return (
		<div className="card mb-3">
			<div className="row g-0">
				<div className="col-md-4">
					<img src="https://grupolasser.com/wp-content/uploads/2015/04/aire-15-descuento.png" width="200px" />
				</div>
				<div className="col-md-8">
					<div className="card-body">
						<h3 className="card-title">Ingresar props</h3>
						<h5 className="card-text">Ingresar props</h5>
						<p className="card-text">Ingresar props</p>
						<br />
						<h6 className="card-text">Ingresar props</h6>
						<Modal1 />
						<p className="card-text">
							<small className="text-muted">Valido hasta el 11/05/21</small>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
// CuponesCard.propTypes = {
// 	id: PropTypes.number,
// 	cupon_name: PropTypes.string,
// 	information: PropTypes.string,
// 	product_name: PropTypes.string,
// 	category: PropTypes.string,
// 	market_id: PropTypes.number
// };
