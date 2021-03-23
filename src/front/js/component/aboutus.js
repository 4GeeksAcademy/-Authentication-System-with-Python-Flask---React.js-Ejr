import React from "react";
//import { Link } from "react-router-dom";
import tomatelo1 from "../../img/logo/tomatelo3.png";
import tomatelo2 from "../../img/logo/tomatelo2.png";
import tomatelo3 from "../../img/logo/tomateloazul.png";
import { Container, Card, CardDeck } from "react-bootstrap";

export const AboutUs = () => {
	return (
		<Container className="mt-4 mb-2">
			<CardDeck>
				<Card className="text-light text-left Card" id="Tomatelo">
					<Card.Img className="logimg" variant="top" src={tomatelo1} />
					<Card.Body>
						<Card.Title>¿Quieres aprender Mixología?</Card.Title>
						<Card.Text>
							Podŕas aprender de deliciosas mezclas para hacer desde la comodidad de tu casa
						</Card.Text>
					</Card.Body>
					<Card.Footer>
						<small className="text-muted">Last updated 3 mins ago</small>
					</Card.Footer>
				</Card>
				<Card className="text-light text-center Card">
					<Card.Img className="logimg" variant="top" src={tomatelo2} />
					<Card.Body>
						<Card.Title>¿Por qué este nombre?</Card.Title>
						<Card.Text>
							Lo llamamos así de una manera llamativa y oriundo de nuestras raíces latinoamericanas para
							resaltar nuestros orígenes
						</Card.Text>
					</Card.Body>
					<Card.Footer>
						<small className="text-muted">Last updated 3 mins ago</small>
					</Card.Footer>
				</Card>
				<Card className="text-light text-right Card">
					<Card.Img className="logimg" variant="top" src={tomatelo3} />
					<Card.Body>
						<Card.Title>¿Por qué un Tomate?</Card.Title>
						<Card.Text>
							Se formo a partir de una manera creativa y llamativa relacionado al nombre del proyecto
						</Card.Text>
					</Card.Body>
					<Card.Footer>
						<small className="text-muted">Last updated 3 mins ago</small>
					</Card.Footer>
				</Card>
			</CardDeck>
		</Container>
	);
};
//Come
