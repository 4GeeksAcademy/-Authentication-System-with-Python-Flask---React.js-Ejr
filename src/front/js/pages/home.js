import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center">
			{/* <section className="container d-block">
				
			</section> */}
{/* GRID */}
			<section>
				<div className="grid-wrapper">
					<div className="box a">
					<section className="title-section align-middle">
						<h1 className="main-title my-auto align-middle">GitLoot</h1>
					</section>
					</div>
					<div className="box b">
						<section className="ia">
							this is the AI box, please complete the AI task to complete this box only
						</section>
					</div>
					<div className="box c">
					<section className="sub-section">
							<h2 className="sub-title pt-5">Acá puedes tener la comida más saludable, ademas de conveniente</h2>
							<h2 className="sub-title">¡En la puerta de tu casa!</h2>
						</section>
					</div>
					<div className="box d">
						<section className="stores">
							<button className="btn btn-outline-success p-3 mx-auto fs-4 fw-bold" 
							style={{borderRadius:"33% 67% 32% 68% / 90% 9% 91% 10% "}}>
								Que tiendas tienes mkis
							</button>
						</section>
					</div>
					<div className="box e">
						<section className="store-ads">
							Image placeholder for Store advertising
						</section>
						
					</div>
					<div className="box f">
						<section className="sub-section">
							<h2 className="sub-title pt-4 fs-1">Te respalda una inteligencia artificial, que te recomendará una excelente dieta semanal basada en nuestros platos disponibles!</h2>
						</section>
					</div>
					<div className="box g">
						<section className="subscription-ads">
							Image placeholder for Subscription advertising
						</section>
					</div>
					<div className="box h">
						<section className="">
							<button className="btn btn-outline-success p-3 mx-auto fs-4 fw-bold" 
							style={{borderRadius:"33% 67% 32% 68% / 90% 9% 91% 10% "}}>
								Pedilo y recibilo boludo
							</button>
						</section>
					</div>
				</div>
			</section>
		</div>
	);
};
