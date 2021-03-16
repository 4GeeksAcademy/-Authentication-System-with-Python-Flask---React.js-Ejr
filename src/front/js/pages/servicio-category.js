import React from "react";
import "../../styles/home.scss";
import "../../styles/index.scss";
import { serviceDiseno, serviceMarketing, serviceIt } from "../../img/image.js";
import { Row, Col, Container, Card, Button, Accordion } from "react-bootstrap";
import { CategoryBox } from "../component/categoryBox.jsx";
import { MyFilter } from "../component/myFilter.jsx";

export const ServicioCategory = props => {
	return (
		<Container>
			<div>
				<Row>
					<Col className="my-3">
						<h3>Desarrollar/IT</h3>
					</Col>
				</Row>
				<Row>
					<Col md={3}>
						<MyFilter />
					</Col>

					<Col>
						<CategoryBox />
						<div className="transBox" />
					</Col>
				</Row>
			</div>
		</Container>
	);
};
