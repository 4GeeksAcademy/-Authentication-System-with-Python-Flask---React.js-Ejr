import React from "react";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import ComponentifyLogo from "../../img/logo-componentify-2.png"

import algoliasearch from 'algoliasearch';
const client = algoliasearch('YOUR_APP_ID', 'YOUR_API_KEY');

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	
	async function logout(event) { // al presionar el botón logout, redirecciona al home y tiene que aparecer el botón login en la barra
        event.preventDefault()
		actions.logout()
        navigate("/")
    }

	const handleMouseOver = (e) => {
		e.target.style.cursor = 'pointer'; 
	}
		
	const handleMouseOut = (e) => {
		e.target.style.cursor = 'default'; 
	}
    
	return (
		<nav class="navbar bg-body-tertiary" style={{"background-color":"#FD5812"}}>
			<div class="container-fluid">
				<a class="navbar-brand" href="#">
				<img src={ComponentifyLogo} alt="Logo" width="45" height="39" class="d-inline-block align-text-center me-3" style={{ marginTop: '-10px'}}  />
				<span className="text-white"><strong>Componentify</strong></span>
				</a>
				<form class="d-flex justify-content-center" role="search">
				<input class="form-control" type="search" placeholder="Search" aria-label="Search"/>
				</form>
				<form class="d-flex align-items-center" role="search">
					<Link to="#" class="nav-link text-white"
					onMouseOver={handleMouseOver}  
					onMouseOut={handleMouseOut}
					>Docs</Link>
					{/* <Link to="#" class="nav-link text-white">Learn</Link> */}
					{/* <Link to="#" class="nav-link text-white">About Us</Link> */}
					<Link to="#" class="nav-link text-white"
					onMouseOver={handleMouseOver}  
					onMouseOut={handleMouseOut}
					>Help Us</Link>
					 

					{store.auth ?
					<div class="btn-group">
						<button type="button" class="btn btn-light dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false" data-bs-reference="parent">
							<i className="fa fa-user"></i>
						</button>
						<ul class="dropdown-menu dropdown-menu-right" style={{right:0, left:"auto"}}>
							<li><a class="dropdown-item" href="#">Account settings</a></li>
							<li><a class="dropdown-item" href="#">Favorites</a></li>
							<li><a class="dropdown-item" href="#">Payment method</a></li>
							<li><hr class="dropdown-divider"/></li>
							<li><a onClick={logout} class="dropdown-item" href="#">Log Out</a></li>
						</ul>
					</div>:
      				<Link to="/login"class="btn btn-outline-light mx-2" type="submit">Login</Link>
					}
				</form>
			</div>
		</nav>
	);
};
