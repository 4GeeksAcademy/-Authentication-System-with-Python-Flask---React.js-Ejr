import React, { useContext } from "react";
import { Context } from "../store/appContext";

import { Link } from "react-router-dom";
import "../../styles/home.css";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";
import { Razones } from "./razones";
export const Home = () => {
	const { store, actions } = useContext(Context);

	return (

		<div class="row imghome">
			<Navbar />
			<div class="col-sm-10">

				<div class="card-body home">
					<h1 class="card-title">Comer y cocinar en el hogar es mejor</h1>

					<p class="card-text">comer fuera de casa no permite planificar la comida, y éste es un aspecto crucial para cuidar nuestra dieta, pues como ya hemos dicho muchas veces, la falta de orden puede ser la causa de una alimentación desequilibrada y poco sana.</p>
					<Link to="/razones">

						<button className="btn btn-secondary">Learn More</button>
					</Link>
					
				</div>

				{/* <div class="row destacados">
					<div class="box">
						<div class="imgBx">
							<img src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1600" />
						</div>
						<div class="content">
							<div>
								<h2>Waffles</h2>
								<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi accusamus molestias quidem iusto.
								</p>
							</div>
						</div>
					</div>
					<div class="box">
						<div class="imgBx">
							<img src="https://images.pexels.com/photos/410648/pexels-photo-410648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
						</div>
						<div class="content">
							<div>
								<h2>Costillar BBQ</h2>
								<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi accusamus molestias quidem iusto.
								</p>
							</div>
						</div>
					</div>
					<div class="box">
						<div class="imgBx">
							<img src="https://images.pexels.com/photos/4220141/pexels-photo-4220141.jpeg" />
						</div>
						<div class="content">
							<div>
								<h2>Ceral De Frutos Rojos</h2>
								<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi accusamus molestias quidem iusto.
								</p>
							</div>
						</div>
					</div>
				</div> */}

			</div>
			<Footer />
		</div>

	);
};
