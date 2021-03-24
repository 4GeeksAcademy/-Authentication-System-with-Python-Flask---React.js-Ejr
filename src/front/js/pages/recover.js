import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Recover = () => {
	const { store, actions } = useContext(Context);

	return (
		<div>
			<h1>Recover</h1>
		</div>
	);
};
