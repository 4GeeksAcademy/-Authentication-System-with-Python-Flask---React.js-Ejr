import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Modal1 } from "../component/modal";
import { Context } from "../store/appContext";

export const Globalcard = props => {
        const { store, actions } = useContext(Context);

	return (
		<div className="tarjeta">
			<div className="card" style={{ width: "16rem" }}>
				<img
					src="https://www.cellshop.com/52067-large_default/desodorante-rexona-women-bamboo-48hs-150ml.jpg"
					className="card-img-top"
					alt="..."
				/>
				<div className="card-body">
					<h5 className="card-title">{props.product_name}</h5>
					<ul>
						<p className="Precio"> Precio: {props.price} colones</p>
						<p className="Precio"> Supermercado: {props.market_id}</p>
					</ul>
					<div className="modal_mov">
						<Modal1 />
					</div>
				</div>
			</div>
		</div>
	);
};
Globalcard.propTypes = {
    id: PropTypes.number,
    product_name: PropTypes.string,
    price: PropTypes.number,
    category: PropTypes.string,
    market_id:PropTypes.number
	
};