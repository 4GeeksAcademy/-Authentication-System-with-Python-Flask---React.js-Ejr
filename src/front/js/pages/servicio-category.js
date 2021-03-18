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
					<Col className="mt-5">
						<h4>Desarrollar/IT</h4>
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
