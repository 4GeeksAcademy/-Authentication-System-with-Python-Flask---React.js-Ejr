import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import BannerImg from "../../../../public/images/banner-bg.png";
import NutriImg from "../../../../public/images/chicken-plate.jpg";
import SportsImg from "../../../../public/images/chicken-plate.jpg";
import ScrollBanner from "../../../../public/images/scroll-banner-bg.png";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="home-container mx-auto w-100 row">
			<div className="banner mx-auto w-100 col">
				<img src={BannerImg} className="w-100" />
				<h1>Bienvenid@</h1>
			</div>
			<section className="d-flex mx-auto col-10">
				<article className="d-flex flex-column align-center">
					<h1 className="border-bottom">
						Nutrición
					</h1>
					<div className="text">
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
					<div>
						<a></a>
					</div>
				</article>
				<div className="img-container my-auto">
					<img src={NutriImg} className="float-end" />
				</div>
			</section>
			{/* <img className="rounded-5 object-fit-cover" src="https://i.pinimg.com/736x/32/dc/77/32dc7737da3054d0933bb59254bebb35.jpg" /> */}
			{/* Deportes */}
			<div className="parallax parallax-container-1 w-100"></div>

			<div className="parallax parallax-container-2 w-100"></div>
			<section>

			</section>
		</div>
	);
};
