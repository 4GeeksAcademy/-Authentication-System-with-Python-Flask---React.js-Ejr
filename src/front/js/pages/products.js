import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Globalcard } from "../component/globalcard";
import { Context } from "../store/appContext";

export const Productos = () => {
	const { store, actions } = useContext(Context);
	const Desplegar_Productos = () => {
		return store.products.map((item, index) => {
			return (
				<Globalcard
					key={index}
					id={item.id}
					price={item.price}
					location={item.location}
					product_name={item.product_name}
					supermarket_name={item.supermarket_name}
				/>
			);
		});
	};

	return (
		<>
			<div className="container-fluid">
				<div className="categoriaspage row">
					<p className="h2 mx-auto py-4 font-weight-light">Productos disponibles</p>
					<div className="whole_content">
						<div className="container1">{Desplegar_Productos()}</div>
					</div>
				</div>
			</div>
		</>
	);
};
