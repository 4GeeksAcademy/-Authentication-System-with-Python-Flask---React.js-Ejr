import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import PubSlide from "../component/PubSlide";
import OfferCard from "../component/OfferCard.jsx";
import ReviewCard from "../component/ReviewCard.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>
				TRIP NEXUS
			</h1>
			<PubSlide/>
			{/* <ReviewCard/> */}
			<OfferCard/>
		</div>
	);
};
