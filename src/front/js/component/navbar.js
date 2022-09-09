import React from "react";
import { Link } from "react-router-dom";
import rigoImageUr from "../../img/LogoSample_ByTailorBrands.jpg";
export const Navbar = () => {
	return (
		<nav className="navbar" id="navbar">
			<div className="container coco">
				
				
			<div className="fle">
			<Link to="/">
			<button type="button" class="btn coc ">HOME</button>
					
				</Link>
				<Link to="/productos">
				<button type="button" class="btn coc ">PRODUCTOS</button>
				</Link>
				<Link to="/contacto">
				<button type="button" class="btn coc ">CONTACTO</button>
				</Link>
			</div>
				<div className="ml-auto" id="iconos">
					<Link to="/demo">
				<i class="fa-solid fa-1x fa-user" id="loginicon"></i>
				</Link>
				<i class="fa-solid fa-cart-shopping cart"></i>
				</div>
			</div>
			
		</nav>
	);
};
