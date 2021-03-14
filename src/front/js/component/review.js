import React from "react";
//import React, { useContext, useEffect } from "react";
import "../../styles/home.scss";
//import { Link } from "react-router-dom";

export const Review = () => {
	return (
		<div className="container p-5">
			<div className="card mt-5">
				<div className="card-header text-primary">
					<h2>Reseñas</h2>
				</div>
				<div className="card-body">
					<h5 className="card-title text-secondary">Fabiola Zuniga</h5>
					<p className="card-text">
						Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
						classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a
						Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin
						words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in
						classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections
					</p>
					<p className="card-text">
						<small className="text-muted">20 marzo 2021</small>
					</p>
					<hr />
				</div>
				<div className="card-body">
					<h5 className="card-title">Fabiola Zuniga</h5>
					<p className="card-text">
						Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
						classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a
						Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin
						words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in
						classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections
					</p>
					<p className="card-text">
						<small className="text-muted">20 marzo 2021</small>
					</p>
					<hr />
				</div>
			</div>
		</div>
	);
};
