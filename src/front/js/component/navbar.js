import React from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useEffect, useState, useContext } from "react";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	return (
		<nav className="navbar bg-black px-5 py-4">
			<div className="ml-auto">
			    <img className="navbar-brand container-fluid"src="https://upload.wikimedia.org/wikipedia/commons/2/21/Star_Wars_logo.png" alt="" width="30" height="60"></img>
			</div>
			<div className="ml-auto">
				<div class="btn-group">
					<button id="favorite" type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
						Favoritos
					</button>
					<ul class="dropdown-menu">
                        {store.favorites.map((f,index)=>(
							<li key={index+1000}><a class="dropdown-item" key={index+100}>{f}</a></li>
						))}
					</ul>
		        </div>
			</div>
		</nav>
	);
};




