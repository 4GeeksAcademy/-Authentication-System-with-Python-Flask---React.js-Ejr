import React, { useContext } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
export const Prueba= () => {
	const { store, actions } = useContext(Context);

	return (
		
		<div className="">
		<h1 style={{ "display": "flex", "color": "rgb(188 191 40)", "padding": "20px" }}>Characters</h1>
			{store.comida.map((e, i) => {
				
				return <div className="" >
					
					<div className="card-body">
						<h5 className="card-title">sss</h5>
						<p>Nombre:&nbsp;{}</p>
						
						
							

					</div>
				</div>
			})}	
		</div>

	)
};
