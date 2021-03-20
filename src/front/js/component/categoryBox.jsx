import React from "react";
import "../../styles/home.scss";
import "../../styles/index.scss";
import { CardCategory } from "./cardCategory.jsx";
import { serviceDiseno, serviceMarketing, serviceIt } from "../../img/image.js";
import { Row, Col, Container } from "react-bootstrap";
import { CardIndividual } from "./cardIndividual.jsx";

export const CategoryBox = props => {
	return (
		<>
			<Container>
				<Row className="row-cols-sm-2 row-cols-md-3  row-cols-lg-3 align-items-center">
					<Col className="mb-4">
						<CardIndividual
							img={serviceIt}
							title="Crearé un sitio web"
							valor="50.000/hora"
							punta="4.5"
							trabajo="50"
						/>
					</Col>
					<Col className="mb-4">
						<CardIndividual
							img={serviceIt}
							title="Crearé un sitio web"
							valor="50.000/hora"
							punta="4.5"
							trabajo="50"
						/>
					</Col>
					<Col className="mb-4">
						<CardIndividual
							img={serviceIt}
							title="Crearé un sitio web"
							valor="50.000/hora"
							punta="4.5"
							trabajo="50"
						/>
					</Col>
					<Col className="mb-4">
						<CardIndividual
							img={serviceIt}
							title="Desarollar/IT"
							valor="50.000/hora"
							punta="4.5"
							trabajo="50"
						/>
					</Col>
					<Col className="mb-4">
						<CardIndividual
							img={serviceIt}
							title="Desarollar/IT"
							valor="50.000/hora"
							punta="4.5"
							trabajo="50"
						/>
					</Col>
					<Col className="mb-4">
						<CardIndividual
							img={serviceIt}
							title="Desarollar/IT"
							valor="50.000/hora"
							punta="4.5"
							trabajo="50"
						/>
					</Col>
					<Col className="mb-4">
						<CardIndividual
							img={serviceIt}
							title="Desarollar/IT"
							valor="50.000/hora"
							punta="4.5"
							trabajo="50"
						/>
					</Col>
					<Col className="mb-4">
						<CardIndividual
							img={serviceIt}
							title="Desarollar/IT"
							valor="50.000/hora"
							punta="4.5"
							trabajo="50"
						/>
					</Col>
				</Row>
			</Container>
		</>
	);
};
