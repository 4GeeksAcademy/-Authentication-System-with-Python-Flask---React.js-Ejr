import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import NewUserBtn from "../component/NewUserBtn.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div>
			
			<NewUserBtn/>
			
		</div>
	);
};
