import React, { useContext } from "react";
import { Context } from "../store/appContext";

import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (

		<div class="row">
			<div class="col-sm-6">
				
					<div class="card-body">
						<h1 class="card-title">Special title treatment</h1>
						
						<p class="card-text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged</p>
						<Link to="/demo">
							
							<button className="btn btn-secondary">Check tjhe Context in action</button>
						</Link>
					</div>
				
			</div>
		</div>

	);
};
