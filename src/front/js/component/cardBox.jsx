import React from "react";
import { Container } from "react-bootstrap";
import "../../styles/home.scss";
import "../../styles/index.scss";

export const CardBox = props => {
	return (
		<>
			<Container className="px-0 pt-3">
				<div className="shadow-lg p-3 mb-5 cardBox">
					<h1 className="text-left">{props.title}</h1>
				</div>
			</Container>
		</>
	);
};
