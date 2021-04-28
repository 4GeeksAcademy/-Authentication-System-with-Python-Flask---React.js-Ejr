import React from "react";
import { Link } from "react-router-dom";

export const Carousel = () => {
	return (
		<div id="carouselExampleControls" className="carousel slide ml-50" data-ride="carousel">
			<div className="carousel-inner ">
				<div className="carousel-item active ">
					<img
						src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.-nuTDLiB74N0sFAG-ojc7wHaHa%26pid%3DApi&f=1"
						className="center "
						alt="..."
					/>
				</div>
				<div className="carousel-item">
					<img
						src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.UYHUOoIV-u-sAlotVNh-iwHaHa%26pid%3DApi&f=1"
						className="center "
						alt="..."
					/>
				</div>
				<div className="carousel-item">
					<img
						src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.4vX1ou2BSbuWzPVePjhx8QHaHa%26pid%3DApi&f=1"
						className="center "
						alt="..."
					/>
				</div>
			</div>
			<a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
				<span className="carousel-control-prev-icon" aria-hidden="true" />
				<span className="sr-only">Previous</span>
			</a>
			<a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
				<span className="carousel-control-next-icon" aria-hidden="true" />
				<span className="sr-only">Next</span>
			</a>
		</div>
	);
};
