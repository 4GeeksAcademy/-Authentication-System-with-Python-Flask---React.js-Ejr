import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/card.scss";

export const Card = () => {
	const { actions, store } = useContext(Context);
	return (
		<div className="container my-3">
			{store.dataMart.map((p, index) => {
				return (
					<div className="card my-5" style={{ width: "16rem;" }} key={index}>
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
							<Link to={"/carouselproducts"}>
								<button className="login100-form-btn">Contactar al vendedor</button>
							</Link>
						</div>
					</div>
				);
			})}
		</div>
	);
};
