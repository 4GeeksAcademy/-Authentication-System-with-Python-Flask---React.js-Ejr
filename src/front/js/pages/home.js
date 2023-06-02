import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import Modal from "./modal.js";

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
						<section className="ia text-center align-middle">

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
							<button className="store-ads p-4 mx-auto fs-1 fw-bold mt-5 blur fs-5" 
							style={{borderRadius:"33% 67% 32% 68% / 90% 9% 91% 10% "}}>
								Tiendas disponibles
							</button>
						</section>
					</div>
					<div className="box e">
						<section className="store pt-0 mt-0">
							<p className="store-ads">Nuestras tiendas tienen excelentes descuentos, le ponemos el alma para llevar los alimentos más fescos a tu hogar!</p>
						</section>
						
					</div>
					<div className="box f">
						<section className="sub-section">
							<h2 className="sub-title pt-4 fs-1">Te respalda una inteligencia artificial, que te recomendará una excelente dieta semanal basada en nuestros platos disponibles!</h2>
						</section>
					</div>
					<div className="box g">
						<section className="subscription-ads">
							<p className="">Comidas super fancy, que preparamos para que lo puedas descongelar y disfrutar!</p>
						</section>
					</div>
					<div className="box h">
						<section className="">
							<button className="store-ads p-4 mx-auto fs-1 btn btn-outline-success blur fw-bold" 
							style={{borderRadius:"33% 67% 32% 68% / 90% 9% 91% 10% "}}>
								Pedilo y recibilo boludo
							</button>
						</section>
					</div>
				</div>
			</section>
			<Modal />
		</div>
	);
};