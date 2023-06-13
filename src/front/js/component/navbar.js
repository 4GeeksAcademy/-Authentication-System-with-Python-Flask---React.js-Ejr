import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/navbar.css";
import { Context } from "../store/appContext";



export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate()

	// useEffect(() => {
	// 	if (!store.accessToken) {
	// 	  navigate("/login")
	// 	}
	//    }, [])
	function logout() {
		actions.userLogout()
	}
	return (
		<nav className="navbar navbar-expand-lg navbar-light custom-navbar">
			<div className="container-fluid">
				<Link to="/" className="text-decoration-none">
					<h1 className="text-black" style={{ fontSize: '36px' }}>StarWash</h1>
				</Link>
				<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse justify-content-center p-2" id="navbarNav">
					<ul className="navbar-nav ">
						<li className="nav-item px-3">
							<Link to="/" className="nav-link active" aria-current="page">Home</Link>
						</li>
						<li className="nav-item px-3">
							<Link to="/aboutUs" className="nav-link active" aria-current="page">About Us</Link>
						</li>
						<li className="nav-item px-3">
							<Link to="/services" className="nav-link active" aria-current="page" >Services</Link>
						</li>
						<li className="nav-item px-3">
							<Link to="/frecuently-asked-questions" className="nav-link active" aria-current="page">Frequently Asked Questions</Link>
						</li>

					</ul>
				</div>
				<div className="nav-item justify-content-end">
					<div className="btn-group" role="group" aria-label="Basic example">
						<Link to="/Login"><button type="button" className="custom-button rounded" style={{ marginRight: '10px', backgroundColor: '#E9C46A', color: '#000', padding: '18px 32px', borderRadius: '6px', boxShadow: '0 6px 0 black' }}><i className="fa-solid fa-cart-shopping"></i></button></Link>
						{
							!!store.accessToken ?
								<button onClick={logout} type="button" className="custom-button rounded" style={{ marginRight: '10px', backgroundColor: '#E9C46A', color: '#000', padding: '18px 32px', borderRadius: '6px', boxShadow: '0 6px 0 black' }}>Logout</button> :
								<><Link to="/Login"><button type="button" className="custom-button rounded" style={{ marginRight: '10px', backgroundColor: '#E9C46A', color: '#000', padding: '18px 32px', borderRadius: '6px', boxShadow: '0 6px 0 black' }}>Login</button></Link>
									<Link to="/Register"><button type="button" className="custom-button rounded" style={{ marginRight: '10px', backgroundColor: '#E9C46A', color: '#000', padding: '18px 32px', borderRadius: '6px', boxShadow: '0 6px 0 black' }}>SignUp</button></Link></>
						}

					</div>

				</div>
			</div>
		</nav>
	);
};
