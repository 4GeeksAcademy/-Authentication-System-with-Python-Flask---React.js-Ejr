import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/index.scss";

export const Carouselproductos = () => {
	const { actions, store } = useContext(Context);

	return (
		<div className="container">
			<div id="carouselExampleCaptions" className="carousel slide " data-ride="carousel">
				<ol className="carousel-indicators">
					<li data-target="#carouselExampleCaptions" data-slide-to="0" className="active" />
					<li data-target="#carouselExampleCaptions" data-slide-to="1" />
					<li data-target="#carouselExampleCaptions" data-slide-to="2" />
				</ol>
				<div className="carousel-inner">
					{store.dataMart.map((p, index) => {
						if (index === 0) {
							return (
								<div className="carousel-item active center">
									<img src={p.image} className="mx-auto d-block img-fluid" alt="..." />
									<div className="carousel-caption d-none d-md-block">
										<h5 className="text-secondary">{p.title}</h5>
										<p className="text-secondary">{p.description}</p>
										<p className="text-secondary">{p.price}</p>
									</div>
								</div>
							);
						} else {
							return (
								<div className="carousel-item center" key={index}>
									<img src={p.image} className="mx-auto d-block img-fluid" alt="..." />
									<div className="carousel-caption d-none d-md-block">
										<h5 className="text-secondary">{p.title}</h5>
										<p className="text-secondary">{p.description}</p>
										<p className="text-secondary">{p.price}</p>
									</div>
								</div>
							);
						}
					})}
				</div>
				<a className="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
					<span className="carousel-control-prev-icon" aria-hidden="true" />
					<span className="sr-only">Previous</span>
				</a>
				<a className="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
					<span className="carousel-control-next-icon" aria-hidden="true" />
					<span className="sr-only">Next</span>
				</a>
			</div>
		</div>
	);
};
