import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function ProvinceCard(props) {
	return (
		<div className="card w-custom province-card img-fluid rounded-circle">
			<img src={props.imagen} className="card-img-top rounded-circle w-custom" />

			<div className="card-img-overlay">
				<Link className="card-title-custom" to={props.route}>
					{props.provinceName}{" "}
				</Link>
			</div>
		</div>
	);
}

ProvinceCard.PropTypes = {
	route: PropTypes.string,
	provinceName: PropTypes.string
};
