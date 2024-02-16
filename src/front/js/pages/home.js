import React, { useContext } from "react";
import { LoginModal } from "../component/LoginModal.js"
import "../../styles/home.css";

export const Home = () => {

	return (
		<div className="container">
			<LoginModal />
			<p>ESTOY EN HOME</p>
		</div>
	);
};
