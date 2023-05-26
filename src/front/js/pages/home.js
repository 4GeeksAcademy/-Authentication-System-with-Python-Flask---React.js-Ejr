import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1 className="text-3xl font-bold underline">
				Hello world!
			</h1>
			<div class="alert alert-primary" role="alert">
				A simple primary alert—check it out!
			</div>
		</div>
	);
};
