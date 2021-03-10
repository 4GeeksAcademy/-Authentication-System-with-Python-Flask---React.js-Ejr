import React from "react";
//import { Link } from "react-router-dom";
import tomatelo1 from "../../img/logo/tomatelo2.png";
import tomatelo2 from "../../img/logo/tomatelo3.png";
import tomatelo3 from "../../img/logo/tomatelo2.png";
import { Container, Card, CardDeck } from "react-bootstrap";

export const AboutUs = () => {
	return (
		<Container className="mt-5">
			<CardDeck>
				<Card className="text-light text-left Card">
					<Card.Img className="logimg" variant="top" src={tomatelo1} />
					<Card.Body>
						<Card.Title>Card title</Card.Title>
						<Card.Text>
							This is a wider card with supporting text below as a natural lead-in to additional content.
							This content is a little bit longer.
						</Card.Text>
					</Card.Body>
					<Card.Footer>
						<small className="text-muted">Last updated 3 mins ago</small>
					</Card.Footer>
				</Card>
				<Card className="text-light text-center Card">
					<Card.Img className="logimg" variant="top" src={tomatelo2} />
					<Card.Body>
						<Card.Title>Card title</Card.Title>
						<Card.Text>
							This card has supporting text below as a natural lead-in to additional content.
						</Card.Text>
					</Card.Body>
					<Card.Footer>
						<small className="text-muted">Last updated 3 mins ago</small>
					</Card.Footer>
				</Card>
				<Card className="text-light text-right Card">
					<Card.Img className="logimg" variant="top" src={tomatelo3} />
					<Card.Body>
						<Card.Title>Card title</Card.Title>
						<Card.Text>
							This is a wider card with supporting text below as a natural lead-in to additional content.
							This card has even longer content than the first to show that equal height action.
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
