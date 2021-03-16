import React from "react";
import "../../styles/home.scss";
import "../../styles/index.scss";
import { Jumbotron, Button, Col, Row } from "react-bootstrap";

export const IconBox = () => {
	return (
		<Jumbotron className="whiteBox shadow-lg p-3 mb-5 align-item-center">
			<Row className="row-cols-1 row-cols-sm-2 row-cols-md-5 align-item-center px-5">
				<Col className="text-center p-3">
					<i className="fas fa-tv icon" />
					<br />
					<p>Desarollar/IT</p>
				</Col>
				<Col className="text-center p-3">
					<i className="fas fa-edit icon" />
					<br />
					<p>Diseño</p>
				</Col>
				<Col className="text-center p-3">
					<i className="fas fa-chart-line icon" />
					<br />
					<p>Marketing</p>
				</Col>
				<Col className="text-center p-3">
					<i className="fas fa-donate icon" />
					<br />
					<p>Contabilidad</p>
				</Col>
				<Col className="text-center p-3">
					<i className="fas fa-balance-scale icon" />
					<br />
					<p>Ley/Derecho</p>
				</Col>
			</Row>
		</Jumbotron>
	);
};
