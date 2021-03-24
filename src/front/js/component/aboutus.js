import React from "react";
//import { Link } from "react-router-dom";
import tomatelo1 from "../../img/logo/tomatelo3.png";
import tomatelo2 from "../../img/logo/tomatelo2.png";
import tomatelo3 from "../../img/logo/tomateloazul.png";
import { Container, Card, CardDeck } from "react-bootstrap";
//Animaciones
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init({ duration: 2000 });
export const AboutUs = () => {
	AOS.init({ duration: 2000 });
	return (
		<Container className="mt-4 mb-2">
			<CardDeck>
				<Card className="text-light text-center Card textBox" id="Tomatelo">
					<div data-aos="fade-right" data-aos-offset="300" data-aos-easing="ease-in-sine">
						<Card.Img className="logimg" variant="top" src={tomatelo1} />
						<Card.Body>
							<div data-aos="zoom-in">
								<Card.Title>¿Quieres aprender Mixología?</Card.Title>
							</div>
							<Card.Text>
								Podrás aprender de deliciosas mezclas para hacer desde la comodidad de tu casa
							</Card.Text>
						</Card.Body>
						{/* <Card.Footer>
							<div data-aos="zoom-in">
								<small className="text-muted">Last updated 3 mins ago</small>
							</div>
						</Card.Footer> */}
					</div>
				</Card>
				<Card className="text-light text-center Card textBox">
					<div data-aos="fade-up" data-aos-anchor-placement="center-center">
						<Card.Img className="logimg" variant="top" src={tomatelo2} />
						<Card.Body>
							<Card.Title>¿Por qué este nombre?</Card.Title>
							<Card.Text>
								Lo llamamos así de una manera llamativa y oriundo de nuestras raíces latinoamericanas
								para resaltar nuestros orígenes
							</Card.Text>
						</Card.Body>
						{/* <Card.Footer>
							<small className="text-muted">Last updated 3 mins ago</small>
						</Card.Footer> */}
					</div>
				</Card>
				<Card className="text-light text-center Card textBox">
					<div data-aos="fade-left" data-aos-offset="300" data-aos-easing="ease-in-sine">
						<Card.Img className="logimg" variant="top" src={tomatelo3} />
						<Card.Body>
							<Card.Title>¿Por qué un Tomate?</Card.Title>
							<Card.Text>
								Se formo a partir de una manera creativa y llamativa relacionado al nombre del proyecto
							</Card.Text>
						</Card.Body>
						{/* <Card.Footer>
							<small className="text-muted">Last updated 3 mins ago</small>
						</Card.Footer> */}
					</div>
				</Card>
			</CardDeck>
		</Container>
	);
};
