import React, { useContext } from "react";
import { Context } from "../store/appContext";
// import sandalia from "../../img/sandalias.png";
import "../../styles/home.css";

export const Catalogue= () => {
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
