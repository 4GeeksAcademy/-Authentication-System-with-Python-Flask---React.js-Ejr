import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { TimeLine } from "../component/TimeLine.jsx";
import {SingleOffer} from "./SingleOffer.jsx"
import { CardOffer } from "../component/CardOffer.jsx";



export const Home = () => {
	const { store, actions } = useContext(Context);
	

return (
	<>
		<div className="container-fluid">
			<TimeLine/>
			<SingleOffer/>
			<CardOffer/>
		</div>
	</>
	  );
};
