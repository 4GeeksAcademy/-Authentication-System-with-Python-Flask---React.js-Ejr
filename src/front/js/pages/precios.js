import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/landingpage.scss";
import { Precios } from "../component/landingpage/precios";

export const PreciosView = () => {
	return (
		<div className="container">
			<Precios />
		</div>
	);
};
