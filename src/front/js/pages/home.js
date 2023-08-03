import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="main">
		  <div className="input-group align-content-start">
		  <h1 className="Destinations">Destinations</h1>
		</div>
		
		
		</div>
		
	);
};
