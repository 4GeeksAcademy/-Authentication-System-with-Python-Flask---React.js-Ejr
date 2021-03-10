import React from "react";
//import { Link } from "react-router-dom";
import { Carousel } from "react-bootstrap";

export const Presentation = () => {
	return (
		<Carousel fade className="Carousel">
			<Carousel.Item>
				<img
					className="d-block w-100"
					src="https://s2.best-wallpaper.net/wallpaper/1920x1200/1909/Cocktail-pineapple-coconut-kiwi-black-background_1920x1200.jpg"
					alt="Planets"
				/>
			</Carousel.Item>
			<Carousel.Item>
				<img
					className="d-block w-100"
					src="https://img5.goodfon.com/wallpaper/nbig/8/2d/kokteil-miata-led-apnlsin-laim.jpg"
					alt="Characters"
				/>
			</Carousel.Item>
			<Carousel.Item>
				<img
					className="d-block w-100"
					src="https://img2.goodfon.com/wallpaper/nbig/d/c9/bokal-napitok-kokteyl.jpg"
					alt="Vehicles"
				/>
			</Carousel.Item>
		</Carousel>
	);
};
