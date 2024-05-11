import React, { useState, useEffect, useContext } from "react"; // Importación de React y algunos hooks
import styles from "./Navbar.module.css"; // Importación de estilos CSS
import { Link } from "react-router-dom"; // Importación de Link para la navegación
import { Context } from "../store/appContext"; // Importación del contexto
import { useNavigate } from "react-router-dom"; // Importación de useNavigate para la navegación programática


const Navbar = () => {
  return (
    <nav className={`navbar navbar-expand-lg navbar-light bg-light ${styles.navbar}`}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#">CrossFit Gym</a>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">About</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Classes</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

