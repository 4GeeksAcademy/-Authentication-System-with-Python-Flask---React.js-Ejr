import React from "react";
import { Link } from "react-router-dom";

export const Landingcontent = () => {
  return (
    <div>

      <div className="bgimg-2">
        <div className="caption">
          <div className="container mt-5">
            <div className="row">
              <div className="col-lg-6">
              </div>
              <div className="col-lg-6">
                <h1 className="display-4 text-left">Encuentra apoyo y conexión a través de nuestra comunidad.</h1>
                <p className="lead text-left">Regístrate y descubre nuevas amistades para compartir momentos especiales juntos.</p>
                <Link className="nav-link" to="/signupabuelo">
                  <button className="buttonjumbo"><span>¡Unete a nosotros! </span></button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ position: "relative" }}>
        <div
          style={{ color: "black", backgroundColor: "white", textAlign: "center", padding: "50px 80px", textAlign: "justify" }}
        >
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </div>

      <div className="bgimg-1">
        <div className="caption">
          <div className="container mt-5">
            <div className="row">
              <div className="col-lg-6">
                <h1 className="display-4 text-left">Acompaña a personas mayores que lo necesitan</h1>
                <p className="lead text-left">Entra en nuestra comunidad como vulantario y participa en actividades con ellos</p>
                <Link className="nav-link" to="/signupvoluntario">
                  <button className="buttonjumbo"><span>¡Hazte voluntario!</span></button>
                </Link>
              </div>
              <div className="col-lg-6">
                <br></br>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          color: "black", backgroundColor: "white", textAlign: "center", padding: "50px 80px", textAlign: "justify"
        }}
      >
        <h3 style={{ textAlign: "center" }}>Lorem Ipsum</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>


      <div className="bgimg-3">
        <div className="caption">
          <span className="border" style={{ backgroundColor: "transparent", fontSize: "25px", color: "#f7f7f7" }}>
            SCROLL UP
          </span>
        </div>
      </div>

      <div style={{ position: "relative" }}>
        <div
          style={{ color: "black", backgroundColor: "white", textAlign: "center", padding: "50px 80px", textAlign: "justify" }}
        >
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </div>
    </div>
  );
};
