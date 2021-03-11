import React from "react";

import { Jumbotron } from "../component/jumbotron";
import { Card } from "../component/Card";

import "../../styles/home.scss";

let carouselList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12];
//create your first component
export function ViewGeneral() {
	return (
		<div className="text-center container-fluid">
			<Jumbotron />
			<div className="row px-1 my-5">
				{carouselList.map((value, index) => {
					return (
						<div className="col-sm-12 col-md-4 col-lg-4 my-2" key={index}>
							<Card />
						</div>
					);
				})}
			</div>
		</div>
	);
}
