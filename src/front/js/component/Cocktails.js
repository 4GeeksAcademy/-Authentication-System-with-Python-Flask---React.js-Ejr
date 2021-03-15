import React, { useContext } from "react";
//import { Context } from "../store/appContext";
import { Container, Row, Col, Image, Card, Media, Button, ListGroup, Item } from "react-bootstrap";
import "../../styles/Cocktails.scss";
import "../../styles/disable_scroll.scss";
import tomatelo from "../../img/logo/tomatelo2.png";
//listo
export const Cocktails = () => {
	return (
		//
		<Container>
			<Row>
				<Card className="cardtotal" style={{ width: "100rem" }}>
					<Card.Img variant="top" src="https://images7.alphacoders.com/397/thumb-1920-397308.jpg" />
					<Card.Body>
						<Card.Title>Margarita</Card.Title>
					</Card.Body>

					<Card.Body>
						<Card.Title>Ingredientes</Card.Title>
						<Card className="ingredientes-instru">
							<Card.Body>ingredientes.</Card.Body>
						</Card>
					</Card.Body>

					<Card.Body>
						<Card.Title>Instrucciones</Card.Title>
						<Card className="ingredientes-instru">
							<Card.Body>instrucciones.</Card.Body>
						</Card>
					</Card.Body>
				</Card>
			</Row>
		</Container>
	);
};
