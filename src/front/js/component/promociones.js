import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card, ListGroupItem, ListGroup } from "react-bootstrap";
import { propTypes } from "react-bootstrap/esm/Image";

export const Promociones = props => {
	return (
		<>
			<div className="tarjeta">
				<div className="card" style={{ width: "18rem" }}>
					<img
						src="https://express.dospinos.com/media/catalog/product/1/5/15002977_1.jpg"
						className="card-img-top"
						alt="..."
					/>
					<ul className="list-group list-group-flush">
						<li className="list-group-item"> Leche Dos Pinos</li>
						<li className="list-group-item"> 760.00 colones</li>
						<li className="list-group-item"> 760.00 colones</li>
					</ul>
				</div>
			</div>
		</>
	);
};

/*Promociones.propTypes = {
	name: PropTypes.string,
	price: PropTypes.number,
	category: PropTypes.string,
	supermarket: PropTypes.string
};*/
