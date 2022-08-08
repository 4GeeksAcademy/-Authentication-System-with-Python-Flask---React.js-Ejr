import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";
import logo from "../../img/dogger_logo.png";

export const Navbar = () => {
  return (
    <div className="container-fluid mt-2">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-8 col-lg-9 my-auto">
            <p id="logo_text" className="my-auto">
              <img id="logo" src={logo} />
              ogger
            </p>
          </div>
          <div className="col-sm-12 col-md-2 col-lg-1 my-auto px-0">
            <Link to={"/login"}>
              <button id="btn1" className="btn rounded-pill mb-1">
                Login
              </button>
            </Link>
          </div>
          <div className="col-sm-12 col-md-2 col-lg-2 my-auto px-0">
            <Link to={"/registrodueno"}>
              <button id="btn2" className="btn rounded-pill mb-1">
                Registrarse
              </button>
            </Link>
          </div>
          <hr className="light" />
        </div>
      </div>
    </div>
  );
};
