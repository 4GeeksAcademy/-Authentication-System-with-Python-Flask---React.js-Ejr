import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Buttonsignup } from "../component/btn-signup";
import { Buttonlogin } from "../component//btn-login";
import { Review } from "../component/review";
import ModalReview from "../component/modal-review";


import "../../styles/bookdetails.css";

export const BookDetails = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container bookdetails">
			<ModalReview />
			<div className="container d-flex justify-content-center">
				<div className="bookcover col-md-6 text-center">
					<img className="bookcoverimg" src="https://images.pexels.com/photos/4153146/pexels-photo-4153146.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
				</div>

				<div className="bookdetails col-md-6">
					<h1>Book Title</h1>
					<h2>Book Author</h2>
					<p>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.</p>
					<h3>Genre category</h3>

					<div className="d-flex col-12 justify-content-center">
						<div className="container-fluid py-5">
							<a href="/create-account" className="btn signup" role="button">Create Account</a>
						</div>
						<Buttonlogin />
						<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Open modal for @mdo</button>
					</div>
				</div>
			</div>

			<div className="container my-5 col-9">
				<h2 className="text-center">Ratings & Reviews</h2>
				<Review />
				<Review />
				<Review />
			</div>

			<div className="container my-5 col-12">
				<h2 className="text-center">Readers also enjoyed</h2>
				<p className="text-center">Carroussel</p>
			</div>
		</div>
	);
};

export default BookDetails; 