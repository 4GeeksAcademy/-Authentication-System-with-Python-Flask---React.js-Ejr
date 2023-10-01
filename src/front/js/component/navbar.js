import React, { useState } from "react";
import { Link } from "react-router-dom";
import bookswaplogo from "../../img/logo-final-project.png";
import { Buttonsignup } from "../component/btn-signup";
import { Buttonlogin } from "../component/btn-login";
import "../../styles/index.css";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand mx-5" href="#">
          <img className="align-middle" src={bookswaplogo} alt="bookswap" height="100" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/OurBooks">
                Our Books
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/OurBooks">
                Genres
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Buttonsignup />
            </li>
            <li className="nav-item">
              <Buttonlogin />
            </li>
          </ul>
          <form className="d-flex justify-content-end mx-5">
            <div className="input-group" style={{ width: "230px" }}>
              <input className="form-control border-end-0 border" type="search" value="search" id="example-search-input" />
              <span className="input-group-append">
                <button className="btn btn-outline-secondary border-start-0 border-bottom-0 border ms-n5" type="button">
                  <i className="fa fa-search"></i>
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
};

