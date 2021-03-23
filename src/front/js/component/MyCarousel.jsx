import React from "react";
import { Link, withRouter } from "react-router-dom";
import { useState } from "react";
import { homeSlideA, homeSlideB, homeSlideC } from "../../img/image.js";
import { Carousel, Container } from "react-bootstrap";

const MyCarousel = () => {
	const [index, setIndex] = useState(0);
	const handleSelect = (selectedIndex, e) => {
		setIndex(selectedIndex);
	};
	return (
		<Carousel activeIndex={index} onSelect={handleSelect}>
			<Carousel.Item>
				<img className="d-block w-100" src={homeSlideA} alt="First slide" />
				<Carousel.Caption className="texto">
					<h2>Contamos con los mejores profesionales a tu servicio</h2>
					<h5>Contrata en línea a los mejores freelancers para cualquier trabajo</h5>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img className="d-block w-100" src={homeSlideB} alt="Second slide" />
				<Carousel.Caption className="texto">
					<h2>Convierte tus ideas en realidad</h2>
					<h5>Más de 300 millones de servicios realizados exitosamente y con garantía de calidad</h5>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img className="d-block w-100" src={homeSlideC} alt="Third slide" />
				<Carousel.Caption className="texto">
					<h2>Las mejores tarifas del mercado</h2>
					<h5>Paga un precio justo por lo que necesitas, sin pagar de más</h5>
				</Carousel.Caption>
			</Carousel.Item>
		</Carousel>
	);
};
export default MyCarousel;
