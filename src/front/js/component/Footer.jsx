import React from "react";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-center text-lg-start bg-body-tertiary text-muted">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Follow us on our social media:</span>
        </div>
        <div>
          <a href="" className="me-4 text-reset">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="" className="me-4 text-reset">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="" className="me-4 text-reset">
            <i className="fab fa-google"></i>
          </a>
          <a href="" className="me-4 text-reset">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="" className="me-4 text-reset">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="" className="me-4 text-reset">
            <i className="fab fa-github"></i>
          </a>
        </div>
      </section>

      <section className="">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <i className="fas fa-gem me-3"></i>Momentum 360 ®
              </h6>
              <p>
                Proudly part of a community with its own identity, with a different image and aesthetics.
              </p>
            </div>
            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                Products
              </h6>
              <p>
                <a  className="text-reset">Class Reservation</a>
              </p>
              <p>
                <a  className="text-reset">Notifications</a>
              </p>
              <p>
                <a className="text-reset">Routines</a>
              </p>
              <p>
                <a  className="text-reset">Administrative Tools</a>
              </p>
            </div>
            
            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p><i className="fas fa-home me-3"></i> Valencia, 2001, VE</p>
              <p>
                <i className="fas fa-envelope me-3"></i>
                Usuariomaster@gmail.com
              </p>
              <p><i className="fas fa-phone me-3"></i> + 58 0241 800 00 00</p>
              <p><i className="fas fa-print me-3"></i> + 58 0241 500 00 01</p>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center p-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
        © 2024 Copyright:
        <a className="text-reset fw-bold" >Made with ❤ from Venezuela</a>
      </div>
    </footer>
  );
};

export default Footer;
