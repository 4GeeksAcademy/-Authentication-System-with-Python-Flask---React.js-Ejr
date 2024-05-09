import React from "react";
import { Link } from "react-router-dom";
import logoImageUrl from "../../img/logoHW.png";
import "../../styles/index.css";
// import { Context } from "../store/appContext";

export const Navbar = () => {

	// const { store, actions } = useContext(Context)

	return (
		<nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        {/* Logo de la empresa */}
		<Link to="/"> 
		<a className="navbar-brand" href="#">
          <img className="logo" src={logoImageUrl}/> 
		</a>
		</Link>
        {/* Nombre de la empresa */}
        <h2 className="navbar-text mx-2">Friendly Wheels</h2>
        {/* Botón a la derecha */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              {/* Botón Login */}
			<Link to="/login">  
			  <button className="btn btn-light">Login</button>
			</Link>  
            </li>
          </ul>
        </div>
      </div>
    </nav>
	);
};


{/* <nav className="navbar navbar-expand-lg">
			<Link to="/">
				<span className="navbar-brand mb-0 h1 ms-5"><img className="logo" src={logoImageUrl} /></span>
			</Link>
				<h1>Happy Wheels</h1>
			<Link to="/login">
				<button type="button" className="btn btn-warning">Login</button>
			</Link>
		</nav> */}