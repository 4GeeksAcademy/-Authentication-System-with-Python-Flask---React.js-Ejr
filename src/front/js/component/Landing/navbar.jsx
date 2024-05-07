import React from "react";
import { Link } from "react-router-dom";
import LogoSVG from "./logoSVG.jsx";
import { Login } from "./login.jsx";

import "./../../../styles/Landing-styles/navbar.css";

export const Navbar = () => {
  return (
    <nav className="landing-nav-container">
      <div className="logo-container">
        <Link to="/">
          <LogoSVG />
        </Link>
      </div>
      <div className="routes-container">
        <Link to="/" className="anchor a-home">
          HOME
        </Link>
        <Link to="/classes" className="anchor a-classes">
          CLASSES
        </Link>
        <Link to="/about" className="anchor a-about">
          ABOUT
        </Link>
        <Link to="/contact" className="anchor a-contact">
          CONTACT
        </Link>
      </div>
      <div className="button-container">
        <Login className="login-component" />
      </div>
    </nav>
  );
};
