import React from "react";
import { Container } from "react-bootstrap";
import "react-bootstrap";
import "../../styles/home.scss";
import "../../styles/index.scss";

export const ButtonAll = props => {
	return (
		<>
			<Container className="px-0 pt-3">
				<div className="shadow-lg p-3 mb-5 cardBox">
					<h1 className="text-left">{props.title}</h1>
					<button type="button" className="btn btn-primary">Primary</button>
					<button type="button" className="btn btn-secondary">Secondary</button>
					<button type="button" className="btn btn-success">Success</button>
				</div>
			</Container>
		</>
	);
};
