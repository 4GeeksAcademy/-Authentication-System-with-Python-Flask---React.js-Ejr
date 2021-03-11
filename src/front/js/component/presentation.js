import React from "react";
//import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";

export const Presentation = () => {
	return (
		<Carousel fade className="Carousel">
			<Carousel.Item>
				<img
					className="d-block w-100"
					src="https://img5.goodfon.com/wallpaper/nbig/8/2d/kokteil-miata-led-apnlsin-laim.jpg"
					alt="Imagen ilustrativa"
				/>
			</Carousel.Item>
			<Carousel.Item>
				<img
					className="d-block w-100"
					src="https://www.dazzlingwallpapers.com/wp-content/uploads/2014/08/Best-Green-Cocktail-wallpaper.jpg"
					alt="Imagen ilustrativa"
				/>
			</Carousel.Item>
			<Carousel.Item>
				<img
					className="d-block w-100"
					src="https://img2.goodfon.com/wallpaper/nbig/d/c9/bokal-napitok-kokteyl.jpg"
					alt="Imagen ilustrativa"
				/>
			</Carousel.Item>
		</Carousel>
		//comentarios
	);
};
