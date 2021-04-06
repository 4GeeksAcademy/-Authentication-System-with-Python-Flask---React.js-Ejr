import React, { useState, useContext } from "react";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";

const ButtomStar = (props, index) => {
	const { store, actions } = useContext(Context);

	// handleClick = () => {
	// 	e.preventDefault();
	// 	console.log("Se hizo click");
	// };
	return (
		<button
			key={index}
			type="button"
			className="btn btn-default btn-grey btn-sm"
			aria-label="Left Align"
			style={{ margin: "1px", backgroundColor: "#C0C0C0" }}
			// onClick={() => {
			// 	handleClick(index);
			// 	actions.setAssessment(props.assessment);}}>
		>
			<span className="fas fa-star" aria-hidden="true"></span>
		</button>
	);
};

ButtomStar.propTypes = {
	assessment: PropTypes.integer
};
export default ButtomStar;
