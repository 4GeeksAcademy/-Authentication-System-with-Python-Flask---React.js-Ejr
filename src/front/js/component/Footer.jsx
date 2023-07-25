import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fainstagram } from "@fortawesome/free-solid-svg-icons";

<FontAwesomeIcon icon="fa-brands fa-instagram" />

const Footer = () => {
	return (
		<div className="container">
			<footer className="py-5">
				<div className="row">
					<div className="col-2">
						<h5>Section</h5>
						<ul className="nav flex-column">
							<li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Home</a></li>
							<li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Features</a></li>
							<li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Pricing</a></li>
							<li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">FAQs</a></li>
							<li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">About</a></li>
						</ul>
					</div>

					<div className="col-2">
						<h5>Section</h5>
						<ul className="nav flex-column">
							<li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Home</a></li>
							<li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Features</a></li>
							<li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Pricing</a></li>
							<li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">FAQs</a></li>
							<li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">About</a></li>
						</ul>
					</div>

					<div className="col-2">
						<h5>Section</h5>
						<ul className="nav flex-column">
							<li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Home</a></li>
							<li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Features</a></li>
							<li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Pricing</a></li>
							<li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">FAQs</a></li>
							<li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">About</a></li>
						</ul>
					</div>

					<div className="col-4 offset-1">
						<form>
							<h5>Subscribe to our newsletter</h5>
							<p>Monthly digest of what's new and exciting from us.</p>
							<div className="d-flex w-100 gap-2">
								<label htmlFor="newsletter1" className="visually-hidden">Email address</label>
								<input id="newsletter1" type="text" className="form-control" placeholder="Email address" />
								<button className="btn btn-primary" type="button">Subscribe</button>
							</div>
						</form>
					</div>
				</div>

				<div className="d-flex justify-content-between py-4 my-4 border-top">
					<p>© 2023 Company, Inc. All rights reserved.</p>
					<ul className="list-unstyled d-flex">
						<li className="ms-3"><a className="link-dark" href="#"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-twitter" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013z" />
						</svg></a></li>


						<li className="ms-3"><a className="link-dark" href="#"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-instagram" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
							<path stroke="none" d="M0 0h24v24H0z" fill="none" />
							<path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
							<path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
							<path d="M16.5 7.5l0 .01" />
						</svg></a></li>


						<li className="ms-3"><a className="link-dark" href="#">
							<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-facebook" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
								<path stroke="none" d="M0 0h24v24H0z" fill="none" />
								<path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
							</svg>
						</a></li>


					</ul>
				</div>
			</footer>
		</div>
	);
};

export default Footer;
