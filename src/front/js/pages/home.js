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
			<div class="row">

				<div class="card-body home">
					<h1 class="card-title">Comer y cocinar en el hogar es mejor</h1>

					<p class="card-text">comer fuera de casa no permite planificar la comida, y éste es un aspecto crucial para cuidar nuestra dieta, pues como ya hemos dicho muchas veces, la falta de orden puede ser la causa de una alimentación desequilibrada y poco sana.</p>
					<Link to="/razones">

						<button className="btn btn-secondary">Learn More</button>
					</Link>
				</div>
				<div class="row destacados">
					<div class="box">
						<div class="imgBx">
							<img src="https://www.mckinsey.com/~/media/mckinsey/industries/public%20and%20social%20sector/our%20insights/how%20to%20make%20a%20city%20great/citiesnew_largefeature_1536x1152.jpg" />
						</div>
						<div class="content">
							<div>
								<h2>Image Title</h2>
								<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi accusamus molestias quidem iusto.
								</p>
							</div>
						</div>
					</div>
					<div class="box">
						<div class="imgBx">
							<img src="https://iso.500px.com/wp-content/uploads/2014/07/big-one.jpg" />
						</div>
						<div class="content">
							<div>
								<h2>Image Title</h2>
								<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi accusamus molestias quidem iusto.
								</p>
							</div>
						</div>
					</div>
					<div class="box">
						<div class="imgBx">
							<img src="https://images.immediate.co.uk/production/volatile/sites/25/2020/04/Things-never-knew-astronomy-e454e5d.jpg" />
						</div>
						<div class="content">
							<div>
								<h2>Image Title</h2>
								<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi accusamus molestias quidem iusto.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>

	);
};
