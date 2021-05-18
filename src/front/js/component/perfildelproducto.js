import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Perfildelproducto = () => {
	const { actions, store } = useContext(Context);
	return (
		<div className="container">
			<div className="card mb-3">
				<div className="row no-gutters">
					<div className="col-md-4">
						<img src={store.updateProduct[0].image} className="card-img-top my-5" alt="..." />
					</div>
					<div className="col-md-8">
						<div className="card-body">
							<h5 className="card-title">{store.updateProduct[0].title}</h5>
							<p className="card-text">{store.updateProduct[0].description}</p>
							<p className="card-text">
								<strong>{store.updateProduct[0].price}</strong>
							</p>
							<button className="btn btn-card">Actualizar Producto</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
