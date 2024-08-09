import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

import { CarouselHome } from "../component/carouselHome";
import Timeline from "../component/TimeLine";

export const Dashboard = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
			<CarouselHome />
			<Timeline />
		</>
	);


};
