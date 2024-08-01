import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">AutoAgenda</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item active">
                            <Link to="/" className="nav-link" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/about" className="nav-link" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/candidates" className="nav-link" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">Candidates</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/blog" className="nav-link" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">Blog</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/contact" className="nav-link" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">Contact</Link>
                        </li>
                        <li className="nav-item cta me-md-1">
                            <Link to="/new-post" className="nav-link btn btn-primary" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">Post a Job</Link>
                        </li>
                        <li className="nav-item cta cta-colored">
                            <Link to="/job-post" className="nav-link btn btn-secondary" data-bs-toggle="collapse" data-bs-target=".navbar-collapse.show">Want a Job</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};







// 		<nav className="navbar navbar-light bg-light">
// 			<div className="container">
// 				<Link to="/">
// 					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
// 				</Link>
// 				<div className="ml-auto">
// 					<Link to="/demo">
// 						<button className="btn btn-primary">Check the Context in action</button>
// 					</Link>
// 				</div>
// 			</div>
// 		</nav>
// 	);
// };
