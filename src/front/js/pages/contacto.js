import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/landingpage.scss";
import { Contacto } from "../component/landingpage/contacto";

export const ContactoView = () => {
	return (
		<div className="container">
			<Contacto />
		</div>
	);
};
