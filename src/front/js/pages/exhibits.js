import React, { useContext } from "react";
import { Context } from "../store/appContext";

import "../../styles/home.css";

export const Exhibits = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			This is the Exhibits Page
		</div>
	);
};
