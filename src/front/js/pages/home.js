import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Card } from "../component/card";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
		<div className="d-flex justify-content-center">
			<Card />
			<Card />
			<Card />
		</div>

		
		<div className="d-flex justify-content-center">
			<Card />
			<Card />
			<Card />
		</div>

	
		</>
	);
};
