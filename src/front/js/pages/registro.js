import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { serviceDiseno, serviceMarketing, serviceIt } from "../../img/image.js";
import "../../styles/home.scss";
import "../../styles/index.scss";
import { CardBox } from "../component/cardBox.jsx";

export const Registro = () => {
	const { store, actions } = useContext(Context);

	return <CardBox />;
};
