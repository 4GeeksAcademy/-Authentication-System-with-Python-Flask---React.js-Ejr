import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Carrusel } from "/workspace/react-flask-hello/src/front/js/component/carrusel";
import "../../styles/home.scss";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<Carrusel />
		</div>
	);
};
