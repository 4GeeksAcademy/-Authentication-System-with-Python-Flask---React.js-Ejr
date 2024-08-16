import React from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";


import logo_bebe from "../../img/logo_bebe.png";
import logo_babyTracker from "../../img/logo_babyTracker.png";



export const Navbar = () => {
	return (
		<nav className="navbar navbar-dark fixed-top" style={{ backgroundColor: '#075E81' }}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
	  	<button className="navbar-toggler me-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
          <i className="fas fa-ellipsis-h" style={{ fontSize: '24px', color: 'white' }}></i> {/* Icono de tres puntos */}
      </button>
      <div className="d-flex justify-content-center flex-grow-1">
        <img src={logo_bebe} style={{ width: '40px', height: 'auto' }}/>
      </div>
      <div className="d-flex justify-content-end">
        <Link to="/profile">
          <i className="fa-solid fa-circle-user" style={{ fontSize: '30px', color: 'white' }}></i>
        </Link>
      </div>
      <div className="offcanvas offcanvas-start text-bg-dark offcanvas-custom" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
              <img src={logo_bebe} style={{ width: '50px', height: 'auto' }} alt="Baby Logo"/>
            </h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <Link to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/demo">Demo</Link>
              </li>
              <li className="nav-item">
                <Link to="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/blog">Blog</Link>
              </li>
              <li className="nav-item">
                <h1 className="titulo-navItem" style={{color:'#FBEE84'}}>Blog</h1>
                <ul className="no-bullets">
                  <li>Recipes</li>
                  <li>News</li>
                </ul>
              </li>
              <li className="nav-item">
                <h1 className="titulo-navItem" style={{color:'#63DDFC'}}>**Baby</h1>
                <ul className="no-bullets">
                  <li>**Baby**'s Diary</li>
                  <li><Link to="/gestor_bebe" style={{ color: 'inherit', textDecoration: 'none' }}>See baby profile</Link></li> {/* Enlace a Gestor Bebe */}
                  <li>Manage babies</li>
                </ul>
              </li>
              <li className="nav-item">
                <h1 className="titulo-navItem" style={{color:'#B4E49D'}}>Profile</h1>
                <ul className="no-bullets">
                  <li><Link to="/gestor_perfil" style={{ color: 'inherit', textDecoration: 'none' }}>See profile</Link></li> {/* Enlace a Gestor Perfil */}
                  <li>Edit profile</li>
                </ul>
              </li>
            </ul>
            
          </div>
        </div>
      </div>

    </nav>
		
	);
};
