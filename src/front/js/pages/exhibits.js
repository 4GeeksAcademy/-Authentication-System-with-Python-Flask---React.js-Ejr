import React, { useContext } from "react";
import { Context } from "../store/appContext";

import "../../styles/home.css";

export const Exhibits = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<div className="row1"> 
				<div className="art-poster-1">1</div>
				<div className="art-poster-2">2</div>
				<div className="art-poster-3">3</div>
			</div>
			<div className="row2">
				<div className="art-poster-4">4</div>
				<div className="art-poster-5">5</div>
				<div className="art-poster-6">6</div>
			</div>
			<div className="row3">
				<div className="art-poster-7">7</div>
				<div className="art-poster-8">8</div>
				<div className="art-poster-9">9</div>
			</div>
		</div>
	);
};
