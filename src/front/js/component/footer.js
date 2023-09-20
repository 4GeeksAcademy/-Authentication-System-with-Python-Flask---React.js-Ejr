import React, { Component } from "react";

export const Footer = () => (

	<footer className="footer py-3 text-center">
		<div className="row">
			<div className="col-6 my-5">
				<img src="https://icon-library.com/images/default-profile-icon/default-profile-icon-16.jpg" alt="Profile Icon" style={{ width: "5rem", height: "5rem" }} className="logo" />
			</div>
			<div className="col">
				<div className="row">
					<div className="col-5">
						<a className="nav-link" href="#">
							Our books
						</a>
						<a className="nav-link" href="#">
							Genres
						</a>
						<p>Sign up button</p>
						<p>Legal Advise</p>
					</div>
					<div className="col-5">
						<a className="nav-link" href="#">
							Instagram
						</a>
						<a className="nav-link" href="#">
							Facebook
						</a>
						<p>Log out in button</p>
						<p>Privacy Policy</p>
					</div>
				</div>
			</div>
		</div>
	</footer>
);

