import React from "react";
import { Link } from "react-router-dom";

export const Products = () => {
	return (

        <div className="card" style={{ backgroundColor: "gray", width: "18rem", padding: "1rem", margin: "1rem" }}>
				<img src={props.url} className="card-img-top" />
			<div className="card-body">
				<h5 className="card-title">Arroz</h5>
				<p className="card-text">
					{" "}
					<ul className="characters">
						<li>Precio: 1500</li>
						<li>Pasillo: 1</li>
						<li>Supermercado: Pali</li>
					</ul>
				</p>

					<button className="btn btn-outline-primary " style={{ margin: "10px" }}>
						Learn more!
					</button>
					onClick={() => actions.addFavorites(props.name, "people")}
					type="button"
					href="#"
					className="btn btn-outline-warning">
					<i className="far fa-heart" />
			
			</div>
		</div>
    );

    }