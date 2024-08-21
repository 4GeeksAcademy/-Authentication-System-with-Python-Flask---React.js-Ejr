import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

import { CarouselHome } from "../component/carouselHome";
import Streak from "../component/streak";

export const Dashboard = () => {
	const { store, actions } = useContext(Context);

	/* 	useEffect(() => {
			document.title = "Home - MyApp";
		}, []); */

	return (
		<>
			<CarouselHome />
			<Streak />
		</>
	);
};