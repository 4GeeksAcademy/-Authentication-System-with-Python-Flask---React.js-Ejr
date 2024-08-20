import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="main-div">
      <h1>ThunderCats</h1>
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
                Categories
              </button>
              <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="dropdownMenuButtonDark">
                <li><a className="dropdown-item" id="actionGames" href="#">Action</a></li>
                <li><a className="dropdown-item" id="roleplayingGames" href="#">RPG</a></li>
                <li><a className="dropdown-item" id="strategy" href="#">Strategy</a></li>
              </ul>
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
        </div>
      </nav>
    </div>
  );
};
