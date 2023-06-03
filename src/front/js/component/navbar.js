import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";
export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-lg navbar-light custom-navbar ">
		<div className="container-fluid ">
		  <a className="navbar-brand" href="#">
		  <h1 style={{ fontSize: '36px' }}>StarWash</h1>
			</a>
		  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
			<span className="navbar-toggler-icon"></span>
		  </button>
		  <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
			<ul className="navbar-nav ">
			  <li className="nav-item">
				<a className="nav-link active" aria-current="page" href="#">Home</a>
			  </li>
			  <li className="nav-item">
				<a className="nav-link active" aria-current="page" href="#">About Us</a>
			  </li>
			  <li className="nav-item">
				<a className="nav-link active" aria-current="page" href="#">Services</a>
			  </li>
			  <li className="nav-item">
				<a className="nav-link active" aria-current="page" href="#">Frequently Asked Questions</a>
			  </li>
			  
			</ul>
		  </div>
			  <li className="nav-item justify-content-end">
			  <div className="btn-group" role="group" aria-label="Basic example">
  <button type="button" className="custom-button rounded" style={{ marginRight: '10px', backgroundColor: '#E9C46A', color: '#000', padding: '18px 32px', borderRadius: '6px', boxShadow: '0 6px 0 black' }}>Login</button>
  <button type="button" className="custom-button rounded" style={{ marginRight: '10px', backgroundColor: '#E9C46A', color: '#000', padding: '18px 32px', borderRadius: '6px', boxShadow: '0 6px 0 black' }}>SignUp</button>
 </div>
				{/* <a className="nav-link active" aria-current="page" href="#">Login/signup</a> */}
			  </li>
		</div>
	  </nav>
	);
};
