import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { ComponenteInf } from "/workspace/react-flask-hello-proyecto-final-grupo-6A/src/front/js/component/componenteInf.js";
import "../../styles/home.scss";

export const Home = () => {
	const { store, actions } = useContext(Context);
	return (
		<div className="container">
			<ComponenteInf />
		</div>
	);
};
