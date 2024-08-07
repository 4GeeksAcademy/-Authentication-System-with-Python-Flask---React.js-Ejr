import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import { SideMenu } from "../component/sideMenu";

export const Home = () => {
  const { store, actions } = useContext(Context);


	return (
		<>
			<h1>Soy el home</h1>
			<Link className="text-red-600 p-4 border-2 border-solid border-red-500" to={'/dashboard'}>Dashboard</Link>
      <SideMenu />
		</>
	);
};
