import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Buttonsignup } from "../component/btn-signup";
import { Buttonlogin } from "../component//btn-login";
import { Review } from "../component/review";


import "../../styles/bookdetails.css";

export const BookDetails = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container bookdetails">
			<div className="container d-flex justify-content-center">
				<div className="bookcover col-md-6 text-center">
					<img className="bookcoverimg" src="https://images.pexels.com/photos/4153146/pexels-photo-4153146.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"/>
				</div>

				<div className="bookdetails col-md-6">
					<h1>Book Title</h1>
					<h2>Book Author</h2>
					<p>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.</p>
					<h3>Genre category</h3>

					<div className="d-flex col-8 justify-content-center">
						<Buttonsignup />
						<Buttonlogin />
					</div>
				</div>
			</div>

			<div className="container my-5 col-12">
				<h2 className="text-center">Ratings & Reviews</h2>
				<div className="multi-carousel vertical" style={{width:"20rem"}}>
					<div className="multi-carousel-inner">
						<div className="multi-carousel-item">
						<img
							src="https://mdbcdn.b-cdn.net/img/Photos/Thumbnails/Slides/1.webp"
							alt="Table Full of Spices"
							className="w-100"
						/>
						</div>
						<div className="multi-carousel-item">
						<img
							src="https://mdbcdn.b-cdn.net/img/Photos/Thumbnails/Slides/2.webp"
							alt="Winter Landscape"
							className="w-100"
						/>
						</div>
						<div className="multi-carousel-item">
						<img
							src="https://mdbcdn.b-cdn.net/img/Photos/Thumbnails/Slides/3.webp"
							alt="View of the City in the Mountains"
							className="w-100"
						/>
						</div>
						<div className="multi-carousel-item">
						<img
							src="https://mdbcdn.b-cdn.net/img/Photos/Thumbnails/Slides/4.webp"
							alt="Place Royale Bruxelles"
							className="w-100"
						/>
						</div>
					</div>
					<button
						className="carousel-control-prev"
						type="button"
						tabindex="0"
						data-mdb-slide="prev"
					>
						<span className="carousel-control-prev-icon"></span>
					</button>
					<button
						className="carousel-control-next"
						type="button"
						tabindex="0"
						data-mdb-slide="next"
					>
						<span className="carousel-control-next-icon"></span>
					</button>
				</div>
			</div>

			<div className="container my-5 col-12">
				<h2 className="text-center">Readers also enjoyed</h2>
				<p className="text-center">Carroussel</p>
			</div>
		</div>
	);
};

export default BookDetails; 