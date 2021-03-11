import React, { Component } from "react";

export const LandingCarousel = () => (
	<div className="row my-5 py-5 justify-content-center">
		<div id="carouselExampleControls" className="carousel slide col-9" data-ride="carousel">
			<div className="carousel-inner">
				<div className="carousel-item active">
					<img className="d-block w-100" src="https://picsum.photos/id/237/600/300" alt="First slide" />
				</div>
				<div className="carousel-item">
					<img className="d-block w-100" src="https://picsum.photos/id/238/600/300" alt="Second slide" />
				</div>
				<div className="carousel-item">
					<img className="d-block w-100" src="https://picsum.photos/id/239/600/300" alt="Third slide" />
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
	</div>
);
