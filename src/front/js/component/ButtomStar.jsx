import React from "react";
import { Button } from "react-bootstrap";

const ButtomStar = () => {
	return (
		<button
			type="button"
			className="btn btn-default btn-grey btn-sm"
			aria-label="Left Align"
			style={{ margin: "1px", backgroundColor: "#C0C0C0" }}>
			<span className="fas fa-star" aria-hidden="true"></span>
		</button>
	);
};

export default ButtomStar;
