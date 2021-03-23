import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { homeSlideA, homeSlideB, homeSlideC, serviceDiseno, serviceMarketing, serviceIt } from "../../img/image.js";
import "../../styles/home.scss";
import "../../styles/index.scss";
import MyCarousel from "../component/MyCarousel.jsx";
import { CardBox } from "../component/cardBox.jsx";
import { PersonBox } from "../component/personBox.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);
	return (
		<>
			<div className="text-center mt-5">
				<MyCarousel className="carousel-size" />
				<PersonBox title="Profesionales más solicitados" />
				<CardBox title="Categorias más buscadas" />
			</div>
		</>
	);
};
