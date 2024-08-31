import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="main-div">
      <h1>ThunderCats</h1>
<<<<<<< HEAD
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="left-div">
          <div class="container-fluid">
            <a class="navbar-brand" href="#">Home</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="dropdown" data-bs-theme="dark">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButtonDark" data-bs-toggle="dropdown" aria-expanded="false">
=======
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark"> 
        <div className="container-fluid">
          
          <div
            className="left-div"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <a
              className="navbar-brand"
              href="#"
              style={{ marginRight: '15px' }}
            >
              Home
            </a>
            <div
              className="dropdown"
              data-bs-theme="dark"
              style={{ marginRight: '15px' }}
            >
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButtonDark"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
>>>>>>> 550832f ("second commit")
                Categories
              </button>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButtonDark">
                <li><a className="dropdown-item" id="actionGames" href="#">Action</a></li>
                <li><a className="dropdown-item" id="roleplayingGames" href="#">RPG</a></li>
                <li><a className="dropdown-item" id="strategy" href="#">Strategy</a></li>
              </ul>
<<<<<<< HEAD
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Home</a>
              </li>
            </div>
          </div>

        </div>
        <div class="right-div">
          <ul class="nav navbar-nav navbar-right">
            <li><a href="#"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
            <li><a href="#"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
          </ul>
=======
            </div>
            <a
              className="nav-link"
              href="#"
              style={{ marginRight: '15px' }}
            >
              Favorites
            </a>
          </div>
          
          
          <div className="right-div" style={{ display: 'flex', alignItems: 'center' }}>
            <a
              href="#"
              style={{ marginRight: '15px' }}
            >
              <span className="glyphicon glyphicon-user"></span> Sign Up
            </a>
            <a href="#">
              <span className="glyphicon glyphicon-log-in"></span> Login
            </a>
          </div>
>>>>>>> 550832f ("second commit")
        </div>
      </nav>
    </div>
  );
};
