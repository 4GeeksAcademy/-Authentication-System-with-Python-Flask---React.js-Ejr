import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="mt-5 row-row-2">
		  <div className="input-group align-content-start">
		
		<div className="alert alert-info">
				{store.message || "Loading message from the backend (make sure your python backend is running)..."}
		</div>
			<p>
				This boilerplate comes with lots of documentation:{" "}
				<a href="https://start.4geeksacademy.com/starters/react-flask">
					Read documentation
				</a>
			</p>
		</div>
		</div>
	);
};
