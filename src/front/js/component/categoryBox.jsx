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
				<Row
					className="row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 align-items-center"
					style={{ margin: "none" }}>
					<Col className="m-3">
						<CardIndividual
							img={serviceIt}
							title="Desarollar/IT"
							valor="50.000/hora"
							punta="4.5"
							trabajo="50"
						/>
					</Col>
					<Col className="m-3">
						<CardIndividual
							img={serviceIt}
							title="Desarollar/IT"
							valor="50.000/hora"
							punta="4.5"
							trabajo="50"
						/>
					</Col>
					<Col className="m-3">
						<CardIndividual
							img={serviceIt}
							title="Desarollar/IT"
							valor="50.000/hora"
							punta="4.5"
							trabajo="50"
						/>
					</Col>
					<Col className="m-3">
						<CardIndividual
							img={serviceIt}
							title="Desarollar/IT"
							valor="50.000/hora"
							punta="4.5"
							trabajo="50"
						/>
					</Col>
					<Col className="m-3">
						<CardIndividual
							img={serviceIt}
							title="Desarollar/IT"
							valor="50.000/hora"
							punta="4.5"
							trabajo="50"
						/>
					</Col>
					<Col className="m-3">
						<CardIndividual
							img={serviceIt}
							title="Desarollar/IT"
							valor="50.000/hora"
							punta="4.5"
							trabajo="50"
						/>
					</Col>
					<Col className="m-3">
						<CardIndividual
							img={serviceIt}
							title="Desarollar/IT"
							valor="50.000/hora"
							punta="4.5"
							trabajo="50"
						/>
					</Col>
					<Col className="m-3">
						<CardIndividual
							img={serviceIt}
							title="Desarollar/IT"
							valor="50.000/hora"
							punta="4.5"
							trabajo="50"
						/>
					</Col>
					<Col className="m-3">
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
