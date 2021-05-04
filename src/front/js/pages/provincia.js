import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/demo.scss";

export const Provincia = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container">
			<ul className="list-group">
				{store.provincia.map((item, index) => {
					return (
						<li
							key={index}
							id_provincia={item.id_provincias}
							id_canton={item.id_canton}
							nombre={item.nombre}
							id_tiposServicio={item.id_tiposServicio}
							telefono={item.telefono}
							facebook={item.facebook}
							instagram={item.instagram}
							id={index}
							className="list-group-item d-flex justify-content-between"
							style={{ background: item.background }}>
							<Link to={"/single/" + index}>
								<span> {item.title}</span>
							</Link>
						</li>
					);
				})}
			</ul>
			<br />
		</div>
	);
};
