import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Navbarsearch } from "../component/navbar-search.jsx";



export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<Navbarsearch/>
	);
};
