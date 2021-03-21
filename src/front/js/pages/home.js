import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";
import "../../styles/index.scss";
import MyCarousel from "../component/MyCarousel.jsx";
import { CardBox } from "../component/cardBox.jsx";
import { PersonBox } from "../component/personBox.jsx";
import CarouselReviews from "../component/Carousel_Reviews.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);
	return (
		<>
			<div>
				<MyCarousel />
				<PersonBox title="Profesionales más solicitados" />
				<CardBox title="Categorias más buscadas" />
				<CarouselReviews />
			</div>
		</>
	);
};
