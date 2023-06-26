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
    
    <div className="justify-content-end d-flex">
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
            <li><a className="dropdown-item" href="#">Coche favorito 1</a></li>
            <li><a className="dropdown-item" href="#">Coche favorito 2</a></li>
            <li><a className="dropdown-item" href="#">Coche favorito 3</a></li>
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
      </ul>

    </div>
        <div className="switch ms-4 mt-2">
          <label className="mode me-2 switch">{theme === "light" ? <i class="fa-regular fa-lightbulb"></i> : <i class="fa-solid fa-lightbulb"></i>}</label>
          <ReactSwitch
            onChange={toggleTheme}
            checked={theme === "dark"}
            className="switch"
            checkedIcon={null}
            uncheckedIcon={null}
            onColor="#200000"
          />
        </div>
      </div>
  </div>
</nav>



	);
};



// 🌕 🌑