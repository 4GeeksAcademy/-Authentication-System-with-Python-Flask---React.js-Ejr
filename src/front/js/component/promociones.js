import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card, ListGroupItem, ListGroup } from "react-bootstrap";

export const Promociones = () => {
	return (
		<div className="tarjeta">
			<div className="card" style={{ width: "18rem" }}>
				<img src="..." className="card-img-top" alt="..." />
				<div className="card-body">
					<h5 className="card-title">Card title</h5>
					<p className="card-text">
						Some quick example text to build on the card title and make up the bulk of the cards content.
					</p>
				</div>
				<ul className="list-group list-group-flush">
					<li className="list-group-item">An item</li>
					<li className="list-group-item">A second item</li>
					<li className="list-group-item">A third item</li>
				</ul>
				<div className="card-body">
					<a href="#" className="card-link">
						Card link
					</a>
					<a href="#" className="card-link">
						Another link
					</a>
				</div>
			</div>
		</div>
	);
};
