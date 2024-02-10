import React, { useContext } from "react";
import { Context } from "../store/appContext";

import "../../styles/home.css";

export const Artists = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			This is the Artists Page
		</div>
	);
};
