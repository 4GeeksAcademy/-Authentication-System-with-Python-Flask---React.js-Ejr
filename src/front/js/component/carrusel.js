import React from "react";
import { Carousel } from "react-bootstrap";
import montana from "../../img/montana.png";
import playa from "../../img/playa.png";
import cr from "../../img/cr.png";
import { Link } from "react-router-dom";

export function Carrusel() {
	return (
		<Carousel id="carrusel" className="d-block w-200">
			<Carousel.Item>
				<img className="d-block w-100" src={cr} style={{ height: "500px" }} alt="Costa Rica" />
				<Carousel.Caption />
			</Carousel.Item>

			<Carousel.Item>
				<Link to="/viewgeneral/playa">
					<img className="d-block w-100" style={{ height: "500px" }} src={playa} alt="Playa" />
				</Link>
				<Carousel.Caption />
			</Carousel.Item>
			<Carousel.Item>
				<Link to="/viewgeneral/montana">
					<img className="d-block w-100" style={{ height: "500px" }} src={montana} alt="Montaña" />
				</Link>
				<Carousel.Caption />
			</Carousel.Item>
		</Carousel>
	);
}
