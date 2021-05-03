import React from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Row, Col } from "react-bootstrap";

export const Footer1 = () => (
	<Container>
		<Row md={4}>
			<Col expand="lg" variant="light" bg="transparent" xs={1}>
				<Navbar.Brand href="#">
					<a className="fab fa-instagram text-white" href="https://www.instagram.com/" />
				</Navbar.Brand>
				<Navbar.Brand href="#">
					<a className="fab fa-facebook text-white" href="https://www.facebook.com/" />
				</Navbar.Brand>
				<Navbar.Brand href="#">
					<a className="fab fa-twitter text-white" href="https://twitter.com/" />
				</Navbar.Brand>
			</Col>
		</Row>
	</Container>
);
