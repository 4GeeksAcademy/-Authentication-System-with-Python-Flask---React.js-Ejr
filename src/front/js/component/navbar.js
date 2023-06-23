import React, {useContext} from "react";
import { Link } from "react-router-dom";
import ReactSwitch from "react-switch";
import { ThemeContext } from "../layout";


export const Navbar = () => {
	const { theme, toggleTheme } = useContext(ThemeContext);

	return (
		

<nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid mx-3">
    <a className="navbar-brand tittle-nav" href="/">WhataCar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
      <ul className="navbar-nav ml-auto align-items-end">

        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" id="heart" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i className="fa-regular fa-heart"></i>
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>

        <li className="nav-item">
          <Link className="nav-link active" style={{ color: "rgb(15, 76, 117)" }} aria-current="page" to="/signup">Registro</Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link active" style={{ color: "rgb(15, 76, 117)" }} aria-current="page" to="/login">Accede</Link>
        </li>

        <li className="nav-item ">
          <a className="nav-link" href="#">
            <button className="btn-plus ">
              <i className="fa-solid fa-plus"></i>
            </button>
          </a>
        </li>

        <li className="switch ms-4">
          <label className="mode me-2 switch">{theme === "light" ? <i className="fa-regular fa-sun"></i> : <i className="fa-solid fa-moon"></i>}</label>
          <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} className="switch" />
        </li>

      </ul>
    </div>
  </div>
</nav>



	);
};



// 🌕 🌑