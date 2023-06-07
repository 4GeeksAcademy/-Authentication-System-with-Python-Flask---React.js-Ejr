import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import LoginModal from "./loginModal";
import Register from "../component/register";


export const Home = () => {
	const { store, actions } = useContext(Context);


	return (
		<div className="text-center mt-5">
			<section className="container-fluid text-center" style={{height:"100%"}}>
			<div className="container-fluid text-center m-1 h-100 g-4 gap-3 p-3 fs-1 m-3 py-2">
				<div className="row m-2 fs-1 d-sm-inline-flex">
					<div className="col-sm-3 box b color-font-ai">
						this is the AI box, please complete the AI task to complete this box only
					</div>

					<div className="col-sm-9">
						<div className="row m-1 text-dark box">
							<div className="col-12 col-sm-12 vh-25">
							<div className="box a">
									<h1 className="main-title my-auto align-middle ">GitLoot</h1>
								</div>
							</div>
						</div>

						<div className="row m-1 vh-25">
							<div className="col-12 col-sm-12 vh-25 box c my-2">
								<section className="sub-section">
									<h2 className="sub-title pt-5">Acá puedes tener la comida más saludable, ademas de conveniente</h2>
									<h2 className="sub-title">¡En la puerta de tu casa!</h2>
								</section>
							</div>
						</div>

						<div className="row row-cols-1 row-cols-lg-2 g-2 g-lg-3 m-1 vh-25">
							<div className="col-12 col-md-6 vh-25 box d my-2">
							<section className="stores">
								<button className="store-ads p-4 px-5 mx-auto fs-1 fw-bold mt-5 blur g-4 fs-5" 
								style={{borderRadius:"33% 67% 32% 68% / 90% 9% 91% 10% "}}>
									Pedir Comida
								</button>
							</section>
							</div>
							<div className="col-12 col-md-6 vh-25 box e my-2 g-4">
								<section className="pt-0 mt-0">
									<p className="store-ads blur">Nuestras tiendas tienen excelentes descuentos, le ponemos el alma para llevar los alimentos más frescos a tu hogar!</p>
								</section>
							</div>
						</div>

						<div className="row m-1 vh-25 box f my-2">
							<div className="col-12 col-sm-12 vh-25">
								<section className="sub-section">
									<h2 className="sub-title pt-4 fs-1">Te respalda una inteligencia artificial, que te recomendará una excelente dieta semanal basada en nuestros platos disponibles!</h2>
								</section>
							</div>
						</div>

						<div className="row row-cols-1 row-cols-lg-2 g-2 g-lg-3 m-1 vh-25">
							<div className="col-12 col-md-6 vh-25 box g my-2 gap-2 border">
								<section className="subscription-ads blur">
									<p className="">Comidas super fancy, que preparamos para que lo puedas descongelar y disfrutar!</p>
								</section>
							</div>

							<div className="col-12 col-md-6 vh-25 box h my-2 gap-2 border">	
								<button className="store-ads p-4 mx-auto fs-1 fw-bold mt-5 blur fs-5" 
								style={{borderRadius:"33% 67% 32% 68% / 90% 9% 91% 10% "}}>
									Suscripciones
								</button>
							</div>
						</div>

					</div>
				</div>
			</div>
			</section>
			<LoginModal />
		</div>
	);
};