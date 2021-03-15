import React from "react";
//import React, { useContext, useEffect } from "react";
import "../../styles/home.scss";
//import { Link } from "react-router-dom";

export const Review = () => {
	return (
		<div className="container p-5">
			<div className="card mt-2">
				<div className="card-header text-primary">
					<h4>Reseñas</h4>
				</div>
				<div className="card-body">
					<h5 className="card-title text-secondary">Fabiola Zuniga</h5>
					<p className="card-text">
						Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
						classical Latin literature from 45 BC, making it over 2000 years old.
					</p>
					<p className="card-text">
						<small className="text-muted">20 marzo 2021</small>
					</p>
					<hr />
				</div>
				<div className="card-body">
					<h5 className="card-title">Jose</h5>
					<p className="card-text">
						Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of
						classical Latin literature from 45 BC, making it over 2000 years old.
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
