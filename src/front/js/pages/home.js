import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Jumbotron } from "../component/jumbotronhome";
import { Buttonsignup } from "../component/btn-signup";
import { Buttonlogin } from "../component//btn-login";
import { BookCarouselHomepage } from "../component/BookCarouselHomepage";

import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="home">
			<Jumbotron />
			<div className="container mt-5">
				<div>
					<h2 className="display-7 fw-bold">Discover a world of reading like never before.</h2>
					<p>At BookSwap & ReadTrack, we've created a vibrant community of book enthusiasts just like you. Whether you're an avid reader, a casual bookworm, or someone looking to expand your reading horizons, our platform is designed with you in mind.</p>
				</div>
				<div>
					<h2 className="display-7 fw-bold py-5">Our Books</h2>
					<div className="" style={{}}>
						<BookCarouselHomepage />
					</div>
				</div>
			</div>

			<div className="container py-5">
				<div className="row align-items-start">
					<div className="col text-center">
						<img className="ourcommunity" src="https://images.pexels.com/photos/3728084/pexels-photo-3728084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
					</div>
					<div className="col px-5">
						<h2 className="display-7 fw-bold">Our Community</h2>
						<p>At BookSwap & ReadTrack, we've created a vibrant community of book enthusiasts just like you. Whether you're an avid reader, a casual bookworm, or someone looking to expand your reading horizons, our platform is designed with you in mind.</p>
					</div>
				</div>
			</div>

			<div className="container py-5">
				<div className="row align-items-start">
					<div className="col px-5">
						<h2 className="display-7 fw-bold">Imagine a place where you can:</h2>
						<ul className="communitylist">
							<li>Create your own virtual library and track your reading progress effortlessly.</li>
							<li>Swap books with fellow readers from around the world, expanding your literary repertoire.</li>
							<li>Get personalized book recommendations tailored to your tastes and preferences.</li>
							<li>Set and achieve reading goals, celebrating your milestones along the way.</li>
						</ul>
					</div>
					<div className="col text-center">
						<img className="ourcommunity" src="https://images.pexels.com/photos/2383122/pexels-photo-2383122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
					</div>
				</div>
			</div>

			<div className="container text-center py-5">
				<h2 className="display-7 fw-bold">Ready to embark on your reading adventure?</h2>
				<p>Join our community today by creating your account. It's quick, easy, and opens the door to a world of literary possibilities.</p>
			</div>

			<div className="container">
				<div className="row align-items-start">
					<div className="col-3 px-5"></div>
					<div className="col-6 text-center px-5" id="genres-section">
						<h2 className="fw-bold">All Genres</h2>
						<p>Mystery - Fantasy - Horror - SciFi - Thriller - Historical Fiction - Romance - Graphic Novel - Children’s - Travel - Adventure - Business & Economics - Humor - Sports - Music - Westerns - Poetry - Classics</p>
						<h4>And many more</h4>
					</div>
					<div className="col-3 px-5"></div>
				</div>
			</div>

			<div className="container mt-5">
				<h2 className="fw-bold">The best rated books</h2>
				#Reviews#
				<div className="text-center">
					<Buttonsignup />
				</div>
			</div>
		</div>
	);
};

export default Home; 