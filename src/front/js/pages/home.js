import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import Card from "../component/card";
import AddPlants from "../component/addPlants";
export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<>
		<AddPlants/>
		</>
	);
};
