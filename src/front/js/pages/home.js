import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import Card from "../component/card";
import AddPlants from "../component/addPlants";
import GetPlants from "../component/getPlants";
import AddMaster from "../component/addMaster";
import AddOrder from "../component/addOrder";
export const Home = () => {
	// const { store, actions } = useContext(Context);

	// const [component,setComponent]= useState(<AddPlants/>)
	// return (
	// 	<>
	// 	{/* <AddPlants/> */}
	// 	{/* <GetPlants/> */}
	// 	<h1 onClick={()=>{
	// 		setComponent(<GetPlants/>)
	// 	}}>show getPlants component</h1>
	// 	{component}
	// 	</>
	// );
	return(

		// <AddMaster/>
		<AddOrder/>
	)
};
