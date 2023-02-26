import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import Characters from "../component/characters";
import Aircrafts from "../component/aircrafts";
import Planets from "../component/planets";

export const Home = () => (
	<div className="container">
		<h2 id="titles" className="test-ligth py-4">Personajes</h2>
		<Characters/>
		<h2 id="titles" className="test-ligth py-4">Vehiculos</h2>
		<Aircrafts/>
		<h2 id="titles" className="test-ligth py-4">Planetas</h2>
		<Planets/>



	</div>

	
);
