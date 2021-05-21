import React, { useContext } from "react";
import Carousel from "react-multi-carousel";
import { Context } from "../store/appContext";
import "react-multi-carousel/lib/styles.css";

export const CardNuestrosProductos = () => {
	const { actions, store } = useContext(Context);
	const responsive = {
		superLargeDesktop: {
			// the naming can be any, depends on you.
			breakpoint: { max: 4000, min: 3000 },
			items: 5
		},
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 3
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 2
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1
		}
	};
	return (
		<Carousel
			responsive={responsive}
			autoPlay={true}
			autoPlaySpeed={1000}
			customTransition="all .5"
			transitionDuration={1000}>
			{store.dataMart.map((p, index) => {
				return (
					<div
						className="card mx-3"
						style={{ width: "16rem;", height: "400px", overflowY: "auto" }}
						key={index}>
						<img
							className="card-img-top mx-auto my-4 d-block img-fluid"
							src={p.image}
							alt="Card image cap"
						/>
						<div className="card-body">
							<h5 className="card-title">{p.title}</h5>
							<p className="card-text">{p.description}</p>
							<p className="item Price">{p.category}</p>
							<p className="item Price">${p.price}</p>
						</div>
					</div>
				);
			})}
		</Carousel>
	);
};
