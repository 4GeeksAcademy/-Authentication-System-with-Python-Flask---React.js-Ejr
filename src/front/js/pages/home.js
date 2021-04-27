import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.scss";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Pura Vida Mart</h1>
			<p>To be Modified</p>.{" "}
		</div>
	);
};
