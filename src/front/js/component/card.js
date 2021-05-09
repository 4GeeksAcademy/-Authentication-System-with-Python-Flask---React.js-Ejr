import React from "react";
import { Link } from "react-router-dom";

export const Card = props => {
	return (
		<div className="card" style={{ width: "18rem;" }}>
			<img
				className="card-img-top"
				src={p.image} className="mx-auto d-block img-fluid"
				alt="Card image cap"
			/>
			<div className="card-body">
				<h5 className="card-title">{props.name}</h5>
				<p className="item Price">{props.price}</p>
				<p className="card-text">{props.description}</p>
				<Link to={"/carouselproducts" + props.index}>
					<button className="btn btn-primary">Learn More</button>
				</Link>
			</div>
		</div>
	);
};
Card.propTypes = {
	name: PropTypes.string,
	price: PropTypes.number,
	description: PropTypes.string,
	index: PropTypes.number
};