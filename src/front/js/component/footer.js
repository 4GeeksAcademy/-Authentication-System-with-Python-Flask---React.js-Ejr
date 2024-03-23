import React from "react";
import "../../styles/footer.css";

export const Footer = () => (
  <div id="whole-wheat-footer" className="d-flex flex-column">
    <div id="newsletter">
      <div className="row">
        <div className="col-md-12">
          <div className="bg-transparent p-3">
            <h3 className="text-center mb-4">Join Our Newsletter</h3>
            <p className="text-center">
              Stay updated with our latest recipes, nutrition tips, and special
              offers.
            </p>
            <form className="row g-2">
              <div className="col-md-5">
                <input
                  type="email"
                  className="form-control"
                  id="emailInput"
                  placeholder="Your Email Address"
                />
              </div>
              <div className="col-md-4">
                <input
                  type="name"
                  className="form-control"
                  id="nameInput"
                  placeholder="Your Name Please"
                />
              </div>
              <div className="col-md-3">
                {/* LINK */}
                <button type="submit" className="btn btn-success w-100">
                  Join Here
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <footer id="footer" className="mt-auto py-3 text-center">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            NourishNav
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#">
                  Features
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Recipes
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="./recipe/Recipe">
                  Menu
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Account
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Account
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Favorites
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Metrics
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Log-in
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </footer>
  </div>
);
