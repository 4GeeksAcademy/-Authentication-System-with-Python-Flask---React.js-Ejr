import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import Card from "../component/card";
import AddPlants from "../component/addPlants";
import GetPlants from "../component/getPlants";

import AddModels from "../component/addModels";
import AddOrder from "../component/addOrder";
export const Home = () => {
	const { store, actions } = useContext(Context);

	
	return(

		<div>
			<AddModels/>
		</div>
	)
};
