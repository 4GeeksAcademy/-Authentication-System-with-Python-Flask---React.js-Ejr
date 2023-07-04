import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => (
	<footer className="text-center text-lg-start text-white fixed-bottom" style={{ backgroundColor: "#1c2331" }}>
		<section className="d-flex justify-content-between p-1" style={{ backgroundColor: "#6351ce" }}>

		</section>

		<section className="">
			<div className="container text-center text-md-start mt-3">
				<div className="row mt-3">
					<div className="col-md-3 col-lg-4 col-xl-3 mx-auto ">
						<h6 className="text-uppercase fw-bold">Sport Spot</h6>
						<div>
							<Link to="#" className="text-white me-4">
								<i className="fab fa-facebook-f"></i>
							</Link>
							<Link to="#" className="text-white me-4">
								<i className="fab fa-twitter"></i>
							</Link>
							<Link to="#" className="text-white me-4">
								<i className="fab fa-instagram"></i>
							</Link>
							<p className="btn mb-1">
								<Link to="/rent" className="text-white">Rent a Spot</Link>
							</p>

						</div>



					</div>
					<div className="col-md-2 col-lg-2 col-xl-2 mx-auto">
						<h6 className="text-uppercase fw-bold">Find a Spot</h6>
						<hr className="mb-1 mt-0 d-inline-block mx-auto" style={{ width: "60px", backgroundColor: "#7c4dff", height: "4px" }} />
						<div className="row">
							<div className="col">
								<p className="mb-1">
									<Link to="#!" className="text-white">Basketball</Link>
									<p className="mb-1">
										<Link to="#!" className="text-white">Tenis</Link>
									</p>
								</p>

							</div>
							<div className="col">
								<p className="mb-1">
									<Link to="#!" className="text-white">Paddle</Link>
									<p className="mb-1">
										<Link to="#!" className="text-white">Futbol</Link>
									</p>
								</p>
							</div>


						</div>


					</div>
					<div className="col-md-3 col-lg-2 col-xl-2 mx-auto ">
						<h6 className="text-uppercase fw-bold">Useful links</h6>
						<hr className="mb-1 mt-0 d-inline-block mx-auto" style={{ width: "60px", backgroundColor: "#7c4dff", height: "4px" }} />
						<div className="row">
							<div className="col">
								<p className="mb-1">
									<Link to="/login" className="text-white">Login</Link>
								</p>

							</div>
							<div className="col">
								<p className="mb-1">
									<Link to="/signup" className="text-white">Signup</Link>

								</p>
							</div>


						</div>


					</div>
					<div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 ">

						<h6 className="text-uppercase fw-bold">Contact</h6>
						<hr className="mb-1 mt-0 d-inline-block mx-auto" style={{ width: "60px", backgroundColor: "#7c4dff", height: "4px" }} />
						<p className="mb-1"><i className="fas fa-envelope mr-3"></i> info@sportspot.com</p>
						<p className="mb-1"><i className="fas fa-phone mr-3"></i> + 56 234 567 88</p>
					</div>
				</div>
			</div>
		</section>

		<div className="text-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}>
			© 1949 - {new Date().getFullYear()} sportspot.com
		</div>
	</footer>
);

