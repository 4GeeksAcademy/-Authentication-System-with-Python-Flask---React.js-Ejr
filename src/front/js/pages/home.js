import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

import { Progress } from "../component/progress";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
  <Progress/>
	);

	
};
