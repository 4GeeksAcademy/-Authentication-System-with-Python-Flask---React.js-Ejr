import React, { Component } from "react";
import { Link } from "react-router-dom";
import logoImage from "../../img/logo.jpg";

class Navbar extends Component {
  render() {
    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-dark  navbar-style">
          <div className="container-fluid">
          <div className="container">
          <img className="navbar-logo" src={logoImage} />
          </div>
            <a className="navbar-brand" href="/#">
              ArtSeekers
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/exhibits" className="nav-link">
                    Exhibits
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/artists" className="nav-link">
                    Artists
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/favorites" className="nav-link">
                    Favorites
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="/contact" className="nav-link">
                    Contact Us
                  </Link>
                </li>

              </ul>
            </div>
            <div className="text-end p-3">
              <button className="btn btn-primary">
              Login/Sign Up
          </button>
          </div>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default Navbar;
