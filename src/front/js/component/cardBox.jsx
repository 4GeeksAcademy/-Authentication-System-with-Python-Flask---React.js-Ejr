import React from "react";
import "../../styles/home.scss";
import "../../styles/index.scss";
import { CardCategory } from "./cardCategory.jsx";
import { serviceDiseno, serviceMarketing, serviceIt } from "../../img/image.js";
import { Jumbotron, Row, Col, Container } from "react-bootstrap";
import PropTypes from "prop-types";

export const CardBox = props => {
	return (
		<>
			<Jumbotron className="whiteBox shadow-lg p-5 mb-5">
				<Container>
					<h2 className="mb-3">{props.title}</h2>
					<Row className="row-cols-1 row-cols-sm-2 row-cols-md-4  scroll">
						<Col md={3}>
							<CardCategory img={serviceIt} title="Desarollar/IT" valor="desde 300.000" />
						</Col>
						<Col md={3}>
							<CardCategory img={serviceDiseno} title="Diseno" valor="desde 50.000" />
						</Col>
						<Col md={3}>
							<CardCategory img={serviceMarketing} title="Marketing" valor="desde desde 50.000" />
						</Col>
						<Col md={3}>
							<CardCategory img={serviceIt} title="Desarollar/IT" valor="desde 300.000" />
						</Col>
					</Row>
				</Container>
			</Jumbotron>
		</>
	);
};

CardBox.propTypes = {
	title: PropTypes.string
};
