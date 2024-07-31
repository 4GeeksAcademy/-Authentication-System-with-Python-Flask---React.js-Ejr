import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";


export const Navbar = () => {
	return (
<nav class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light snipcss0-0-0-1 snipcss-7D89A" id="ftco-navbar">
    <div class="container snipcss0-1-1-2">
        <a class="navbar-brand snipcss0-2-2-3" href="index.html">AutoAgenda</a>
        <button class="navbar-toggler snipcss0-2-2-4" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="oi oi-menu snipcss0-3-4-5"></span> Menu </button>
        <div class="collapse navbar-collapse snipcss0-2-2-6" id="ftco-nav">
            <ul class="navbar-nav ml-auto snipcss0-3-6-7">
                <li class="nav-item active snipcss0-4-7-8"><a href="index.html" class="nav-link snipcss0-5-8-9">Home</a></li>
                <li class="nav-item snipcss0-4-7-10"><a href="about.html" class="nav-link snipcss0-5-10-11">About</a></li>
                <li class="nav-item snipcss0-4-7-12"><a href="candidates.html" class="nav-link snipcss0-5-12-13">Canditates</a></li>
                <li class="nav-item snipcss0-4-7-14"><a href="blog.html" class="nav-link snipcss0-5-14-15">Blog</a></li>
                <li class="nav-item snipcss0-4-7-16"><a href="contact.html" class="nav-link snipcss0-5-16-17">Contact</a></li>
                <li class="nav-item cta mr-md-1 snipcss0-4-7-18"><a href="new-post.html" class="nav-link snipcss0-5-18-19">Post a Job</a></li>
                <li class="nav-item cta cta-colored snipcss0-4-7-20"><a href="job-post.html" class="nav-link snipcss0-5-20-21">Want a Job</a></li>
            </ul>
        </div>
    </div>
</nav>
	);
  }


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
