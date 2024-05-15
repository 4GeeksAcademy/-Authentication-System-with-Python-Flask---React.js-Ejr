import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { Signup } from "../component/signup";
import { Login } from "../component/login";


import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<h1>HOME</h1>
	);
};