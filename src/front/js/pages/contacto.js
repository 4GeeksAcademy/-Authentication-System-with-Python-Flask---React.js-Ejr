import React, { useContext } from "react";
import { Context } from "../store/appContext";

import { Link } from "react-router-dom";
import "../../styles/home.css";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";
import { Razones } from "./razones";
export const Contacto= () => {
	const { store, actions } = useContext(Context);

	return (

		<div class="row imghome">
			<Navbar/>
			<div class="col-sm-6">
				
					<div class="card-body home">
						<h1 class="card-title">Comer y cocinar en el hogar es mejor</h1>
						
						<Link to="/">
							
							<button className="btn btn-secondary">Back Home</button>
						</Link>
					</div>
				
			</div>
			<Footer/>
		</div>

	);
};
