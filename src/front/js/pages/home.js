import React, { useContext } from "react";
import { Context } from "../store/appContext";
import road66 from "../../img/road66.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="home-container">
			<img src={road66} alt="Road 66" className="home-background" />
			<div className="jumbotron">
				<h1>Ever wondered what to pack? How many days to spend? What museum to visit?</h1>
				<p>Because life is too short to cross check each travel blog..</p>
			</div>
			<div className="jumbotron" style={{ top: '100%' }}>
				<h1>DioDio's got you covered!</h1>
			</div>
		</div>
	);
};
