import React from "react";
import { Link } from "react-router-dom";
import LoginModal from "../pages/loginModal";
import RegisterModal from "../pages/RegisterModal";

export const Navbar = () => {
	return (
		<nav id="navbar-design" className="navbar sticky-top">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand fw-bold fs-2 mb-0">GitLoot</span>
				</Link>
				<div className="ml-auto">
					<div className="btn-group dropstart">
						<button type="button" style={{borderRadius:"33% 67% 32% 68% / 90% 9% 91% 10% "}}
							className="btn btn-outline-info btn-lg dropdown-toggle px-5" data-bs-toggle="dropdown" aria-expanded="false">
								Tu loot!
						</button>
						<ul className="dropdown-menu">
							<li className="dropdown-item">Loot 1</li>
							<li className="dropdown-item">Loot 2</li>
							<li className="dropdown-item">Loot 3</li>
							<li className="dropdown-item">This shalt clear thy loot</li>
						</ul>
					</div>
					<button type="button" style={{borderRadius:"33% 67% 32% 68% / 90% 9% 91% 10% "}} className="btn btn-lg btn-outline-primary py-2 px-5" data-bs-toggle="modal" data-bs-target="#loginModal">
						Login
					</button>
					<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#registerModal">
						Launch demo modal
					</button>
				</div>
			</div>
		</nav>
		
		
	);
};














