import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { serviceIt } from "../../img/image.js";
import "../../styles/home.scss";
import "../../styles/index.scss";
import { Row, Col, Container, Jumbotron, Button } from "react-bootstrap";

export const Servicioindividual = () => {
	const { store, actions } = useContext(Context);

	return (
		<Container>
			<Row>
				<Col className="my-3">
					<p>
						Desarrollar/IT <i className="fas fa-chevron-right" /> Individual
					</p>
				</Col>
			</Row>
			<Row>
				<Col md={6}>
					<img
						src={serviceIt}
						width="500"
						height="400"
						className="d-inline-block align-top"
						alt="service image"
					/>
				</Col>
				<Col>
					<Jumbotron className="whiteBox">
						<h1>Crearé un sitio web</h1>
						<p>$300.000/proyecto</p>
						<p>
							<Button variant="primary">Learn more</Button>
						</p>
					</Jumbotron>
				</Col>
			</Row>
			<div className="transBox" />
		</Container>
	);
};
