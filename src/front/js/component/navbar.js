import React from "react";
import { Link } from "react-router-dom";
import rigoImageUr from "../../img/LogoSample_ByTailorBrands.jpg";
export const Navbar = () => {
	return (
		<nav className="navbar" id="navbar">
			<div className="">
				<Link to="/">
				
					
				</Link>
				
			<div className="fle">
			<button type="button" class="btn ">HOME</button>
				<button type="button" class="btn ">PRODUCTOS</button>
				<button type="button" class="btn ">CONTACTO</button>
			</div>
				<div className="ml-auto" id="iconos">
					<Link to="/demo">
				<i class="fa-solid fa-1x fa-user" id="loginicon"></i>
				</Link>
				</div>
			</div>
			
		</nav>
	);
};
