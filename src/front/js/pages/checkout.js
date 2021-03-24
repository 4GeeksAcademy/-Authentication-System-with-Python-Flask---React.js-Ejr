import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const CheckOut = () => {
	const { store, actions } = useContext(Context);

	return (
		<div>
			<h1>Check Out</h1>
		</div>
	);
};
