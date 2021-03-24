import React, { Component } from "react";
import "../styles/footer.css";
export const Footer = () => {
	return (
		<footer>
			<footer className="text-center text-white">
				<div className="container pt-4">
					<section className=" iconos mb-4">
						<a
							className="btn-face btn btn-link btn-floating btn-lg text-dark m-1"
							href="https://www.facebook.com/"
							role="button"
							data-mdb-ripple-color="dark">
							<i className="fab fa-facebook-f" />
						</a>

						<a
							className="btn-twitter btn btn-link btn-floating btn-lg text-dark m-1"
							href="https://twitter.com/?lang=es"
							role="button"
							data-mdb-ripple-color="dark">
							<i className="fab fa-twitter" />
						</a>

						<a
							className="btn-insta btn btn-link btn-floating btn-lg text-dark m-1"
							href="https://www.instagram.com/?hl=es"
							role="button"
							data-mdb-ripple-color="dark">
							<i className="fab fa-instagram" />
						</a>
					</section>
				</div>

				<div className="text-center text-white p-3">© 2021 Copyright: Pichangapp</div>
			</footer>
		</footer>
	);
};
