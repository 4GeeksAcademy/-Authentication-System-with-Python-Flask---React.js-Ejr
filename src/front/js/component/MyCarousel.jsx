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

				<Carousel.Caption className="slideTitle text-left">
					<h3>First slide label</h3>
					<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img className="d-block w-100" src={homeSlideB} alt="Second slide" />
				<Carousel.Caption className="slideTitle text-left">
					<h3>Second slide label</h3>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
				</Carousel.Caption>
			</Carousel.Item>
			<Carousel.Item>
				<img className="d-block w-100" src={homeSlideC} alt="Third slide" />
				<Carousel.Caption className="slideTitle text-left">
					<h3>Third slide label</h3>
					<p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
				</Carousel.Caption>
			</Carousel.Item>
		</Carousel>
	);
};
export default MyCarousel;
