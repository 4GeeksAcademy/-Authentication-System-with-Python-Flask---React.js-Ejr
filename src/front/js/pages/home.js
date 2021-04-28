import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Carousel } from "../component/carousel";
import { Search } from "../component/search";
import { Footer } from "../component/footer";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-2" style={{ fontFamily: "Zen Dots" }}>
			<h1>Pura Vida Mart</h1>
			<h2>Bienvenido(a)</h2>
			<div className="alert alert-info">{store.message || "Loading message from the backend..."}</div>

			<Carousel />
			<i className="fas fa-search mr-2" />
			<Search />
		</div>
	);
};
