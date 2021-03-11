import React from "react";
import { Carousel } from "react-bootstrap";
import montana from "../../img/montana.jpg";
import playa from "../../img/playa.jpg";
import cr from "../../img/cr.jpg";
import { Link } from "react-router-dom";

export function Carrusel() {
	return (
		<Carousel id="carrusel" className="d-block w-200">
			<Carousel.Item>
				<img className="d-block w-100" src={cr} alt="Costa Rica" />
				<Carousel.Caption />
			</Carousel.Item>

			<Carousel.Item>
				<Link to="/viewgeneral/:theid">
					<img className="d-block w-100" src={playa} alt="Playa" />
				</Link>
				<Carousel.Caption />
			</Carousel.Item>

			<Carousel.Item>
				<Link to="/viewgeneral/:theid">
					<img className="d-block w-100" src={montana} alt="Montaña" />
				</Link>

				<Carousel.Caption />
			</Carousel.Item>
		</Carousel>
	);
}
