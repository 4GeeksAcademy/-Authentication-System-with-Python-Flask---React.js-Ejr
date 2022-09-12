import React, { useContext } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
export const Prueba= () => {
	const { store, actions } = useContext(Context);

	return (
		
		<div className="row">
			<hr style={{"background":"#5e5e7c" ,"width": "-webkit-fill-available","height":"3px"}}></hr>
			<h1 style={{ "display": "flex", "color": "rgb(188 191 40)", "padding": "20px" }}>Characters</h1>
			{store.comidas.map((e, i) => {
				console.log(e)
				return <div className="container " style={{ "width": "18rem"}}>
					
					<div className="card-body" key={i}>
						<h5 className="card-title">{e.name}</h5>
						<p>Nombre:&nbsp;{}</p>
						
						
							<button onClick={()=> actions.getAddTask(e.name)} type="button" class="btn btn-outline-warning m-2"> <i class="far fa-heart"></i></button>

					</div>
				</div>
			})}	
		</div>

	)
};
