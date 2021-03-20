import React from "react";
<<<<<<< HEAD
import { Container } from "react-bootstrap";
import "../../styles/home.scss";
import "../../styles/index.scss";
=======
import "../../styles/home.scss";
import "../../styles/index.scss";
import { CardCategory } from "./cardCategory.jsx";
import { serviceDiseno, serviceMarketing, serviceIt } from "../../img/image.js";
import { Jumbotron, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
>>>>>>> 2e10dc16ebf3e51eaa20cf0c4264e351b31b4fdd

export const CardBox = props => {
	return (
		<>
<<<<<<< HEAD
			<Container className="px-0 pt-3">
				<div className="shadow-lg p-3 mb-5 cardBox">
					<h1 className="text-left">{props.title}</h1>
				</div>
			</Container>
		</>
	);
};
=======
			<Jumbotron className="whiteBox shadow-lg p-5 mb-5">
				<h2 className="mb-3">{props.title}</h2>
				<Row className="row-cols-1 row-cols-sm-2 row-cols-md-4 align-items-center scroll ">
					<Col md={4}>
						<CardCategory img={serviceIt} title="Desarollar/IT" valor="desde 300.000" />
					</Col>
					<Col md={4}>
						<CardCategory img={serviceDiseno} title="Diseno" valor="desde 50.000" />
					</Col>
					<Col md={4}>
						<CardCategory img={serviceMarketing} title="Marketing" valor="desde desde 50.000" />
					</Col>
					<Col md={4}>
						<CardCategory img={serviceIt} title="Desarollar/IT" valor="desde 300.000" />
					</Col>
				</Row>
			</Jumbotron>
		</>
	);
};

CardBox.propTypes = {
	title: PropTypes.string
};
>>>>>>> 2e10dc16ebf3e51eaa20cf0c4264e351b31b4fdd
