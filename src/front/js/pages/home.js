import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import BannerImg from "../../../../public/images/banner-2-bg.png";
import GirlImg from "../../../../public/images/girl-ph.jpg";
import NutriImg from "../../../../public/images/chicken-plate.jpg";
import SportsImg from "../../../../public/images/chicken-plate.jpg";
import ScrollBanner from "../../../../public/images/scroll-banner-bg.png";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="home-container mx-auto w-100 row">
			{/* **********___BANNER___********** */}
			<div className="banner w-100 p-0">
				<div className="title-container text-center">
					<h1>Bienvenid@</h1>
				</div>
				<img src={GirlImg} />
			</div>
			

			{/* **********___PRIMER___SECCION___********** */}
			<section className="first-section mx-auto col-10">
				<article className="d-flex flex-column align-center justify-content-between">
					<h1 className="border-bottom">
						Nutrición
					</h1>
					<div className="text-container">
						<p className="fs-5">
							Lorem ipsum dolor sit amet consectetur,
							adipisicing elit. Pariatur quos voluptate,
							modi libero, asperiores distinctio voluptatem
							architecto vitae, quae nulla optio molestias
							aliquam. Error perspiciatis praesentium omnis
							quaerat temporibus quo cumque illum labore nostrum
							dignissimos a nisi molestiae, fugiat nemo ex
							accusamus saepe quidem reprehenderit repellendus!
							Aut veritatis qui, officia enim illo culpa.
						</p>
					</div>
					<a>
						<h5>
							Más...
						</h5>
					</a>
				</article>
				<div className="img-container">
					<img src={NutriImg} className="float-end" />
				</div>
			</section>
			<div className="parallax parallax-container-1 w-100"></div>



			{/* **********___SEGUNDA___SECCION___********** */}
			<section className="second-section mx-auto col-10">
				<article className="d-flex flex-column align-center">
					<h1 className="border-bottom">
						Deportes
					</h1>
					<div className="text-container">
						<p className="fs-5">
							Lorem ipsum dolor sit amet consectetur,
							adipisicing elit. Pariatur quos voluptate,
							modi libero, asperiores distinctio voluptatem
							architecto vitae, quae nulla optio molestias
							aliquam. Error perspiciatis praesentium omnis
							quaerat temporibus quo cumque illum labore nostrum
							dignissimos a nisi molestiae, fugiat nemo ex
							accusamus saepe quidem reprehenderit repellendus!
							Aut veritatis qui, officia enim illo culpa.
						</p>
					</div>
					<a>
						<h5>
							Más...
						</h5>
					</a>
				</article>
				<div className="img-container">
					<img className="rounded-5 object-fit-cover" src="https://i.pinimg.com/736x/32/dc/77/32dc7737da3054d0933bb59254bebb35.jpg" />
				</div>
			</section>
			<div className="parallax parallax-container-2 w-100"></div>



			{/* **********___SECCION___FINAL___********** */}
			<section className="mx-auto col-10 d-flex justify-space-between">
				<article className="d-flex flex-column align-center w-50">
					<h1 className="border-bottom">
						Tips
					</h1>
					<div className="text-container">
						<ul className="fs-4">
							<li>Tip 1</li>
							<li>Tip 2</li>
							<li>Tip 3</li>
							<li>Tip 4</li>
							<li>Tip 5</li>
						</ul>
					</div>
				</article>
				<article className="d-flex flex-column align-center w-50-lg text-center">
					<h1 className="border-bottom">
						Nuestros productos
					</h1>
					<div className="products-container container row row-cols-2 w-100 mx-auto">
						<div className="col bg-warning p-5">Prod 1</div>
						<div className="col bg-success p-5">Prod 2</div>
						<div className="col bg-success p-5">Prod 2</div>
						<div className="col bg-warning p-5">Prod 3</div>
					</div>
				</article>
			</section>
		</div>
	);
};
