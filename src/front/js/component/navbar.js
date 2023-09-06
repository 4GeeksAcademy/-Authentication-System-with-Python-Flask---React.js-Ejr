import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<>
			<nav className="navbar navbar-light bg-light">
				<div className="container">
					<Link to="/">
						<span className="navbar-brand mb-0 h1">React Boilerplate</span>
					</Link>
					<div className="ml-auto">
						<Link to="/demo">
							<button className="btn btn-primary">Check the Context in action</button>
						</Link>
					</div>
				</div>
			</nav>
			<nav className="navbar navbar-light bg-light">
				<div className="container">
					<Link to="/">
						<span className="navbar-brand mb-0 h1">React Boilerplate</span>
					</Link>
					<div className="ml-auto">
						<Link to="/demo">
							<button className="btn btn-primary">Check the Context in action</button>
						</Link>
					</div>
				</div>
			</nav>
			<nav class="navbar navbar-expand-lg navbar-dark fw-bold text-white bg-dark">
				<div class="container-fluid">
					<div class="collapse navbar-collapse justify-content-center " id="navbarSupportedContent">
						<ul class="navbar-nav">
							<li class="nav-item p-1 border border-light rounded-start bg-success">
								<Link to="/bookSales" className="nav-link active " aria-current="page">Book sales</Link>
							</li>
							<li class="nav-item p-1 border border-light bg-success ">
								<Link to="/bookExchange" className="nav-link active">Book exchange</Link>
							</li>
							<li class="nav-item p-1 border border-light rounded-end bg-success">
								<Link to="/bestSeller" className="nav-link active">Best seller</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
};
