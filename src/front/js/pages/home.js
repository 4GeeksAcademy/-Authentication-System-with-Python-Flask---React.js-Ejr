import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { CardNuestrosProductos } from "../component/cardNuestrosProductos";
//import { Search } from "../component/search";
import { Footer } from "../component/footer";
import "../../styles/index.scss";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="h-100 text-center fixed-content-mg">
			<h2>Productos de nuestros emprendedores.</h2>
			<CardNuestrosProductos />
		</div>
	);
};
