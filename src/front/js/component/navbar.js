import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar"

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<div>
					{/* <Link to={"/"}> */}
						<img
						src="https://static.vecteezy.com/system/resources/previews/013/923/543/original/blue-car-logo-png.png"
						style={{"width": "20px", "height": "auto"}}
						/>
					{/* </Link> */}
				</div>
				<div>
					
					{/* <Link to="/catalog"> */}
						<button className="btn btn-primary">
							<h5>Cars catalog</h5>
						</button>
					{/* </Link> */}
				</div>
				<div>
					< SearchBar/>
				</div>
				<div>
					
					<button>Sign Up</button>
					{/* <Link to={"/Login"}> */}
						<button>Login</button>
					{/* </Link> */}
				</div>
			</div>
		</nav>
	);
};
