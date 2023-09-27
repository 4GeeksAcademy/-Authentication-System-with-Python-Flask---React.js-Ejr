import React from "react";
import bookswaplogo from "../../img/logo-final-project.png";
import { Link } from "react-router-dom";

export const Footer = () => (
	<footer className="footer py-3 text-center">
		<div className="row">
			<div className="col-6 my-5">
				<img src={bookswaplogo} alt="Profile Icon" className="logo" />
			</div>
			<div className="col">
				<div className="row">
					<div className="col-5">
						<Link to="/OurBooks" className="nav-link">
							Our Books
						</Link>
						<a className="nav-link" href="#genres-section"> {/* CHECK THIS*/}
							Genres
						</a>
						<div className="container-fluid py-5">
							<a href="/create-account" className="btn signup" role="button">
								Create Account
							</a>
						</div>
						<a
							className="nav-link"
							href="https://en.wikipedia.org/wiki/Legal_advice"
							target="_blank"
						>
							Legal Advice
						</a>
					</div>
					<div className="col-5">
						<a
							className="nav-link"
							href="https://www.instagram.com"
							target="_blank"
						>
							Instagram
						</a>
						<a
							className="nav-link"
							href="https://www.facebook.com"
							target="_blank"
						>
							Facebook
						</a>
						<div className="container-fluid py-5">
							<a href="/login" className="btn login" role="button">
								Log in
							</a>
						</div>
						<a
							className="nav-link"
							href="https://en.wikipedia.org/wiki/Privacy_policy"
							target="_blank"
						>
							Privacy Policy
						</a>
					</div>
				</div>
			</div>
		</div>
	</footer>
);


