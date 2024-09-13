import React from "react";
import logogaming from "../../img/logo/logo-marca.png";

export const Footer = () => (
  <section className="footer">
    <footer className="text-white py-5">
      <div className="container text-center">
        <div className="footer__widget">
          <div className="logo mb-3">
            <a href="index.html">
              <img src={logogaming} alt="Logo" className="img-fluid" />
            </a>
          </div>
          <div className="social__icon">
            <ul className="list-inline">
              <li className="list-inline-item">
                <a href="#" className="text-white">
                  <i className="fab fa-instagram fa-lg"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-white">
                  <i className="fab fa-dribbble fa-lg"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-white">
                  <i className="fab fa-twitter fa-lg"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-white">
                  <i className="fab fa-youtube fa-lg"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <p className="mb-0">
            Copyright © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </section>
);
