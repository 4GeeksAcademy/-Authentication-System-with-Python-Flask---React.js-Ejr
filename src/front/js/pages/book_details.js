import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
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
					<h5>Book Author</h5>
					<p>5 Stars - Total Reviews</p>
					<p>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.</p>
					<h5>Genre category</h5>

					<div className="d-flex col-12 justify-content-center">
						<div className="container-fluid py-5">
							<a href="/create-account" className="btn btn-request-swap" role="button"><i class="far fa-paper-plane"></i> Request Swap</a>
						</div>
						<div className="container-fluid py-5">
							<a href="/create-account" className="btn btn-add-wishlist" role="button"><i class="far fa-heart"></i> Add to Wishlist</a>
						</div>
						<div className="container-fluid py-5">
							<button type="button" className="btn btn-review-book" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo"><i class="far fa-star"></i> Review Book</button>
						</div>
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