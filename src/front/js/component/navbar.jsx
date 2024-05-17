import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import LogoSVG from "./Landing/logoSVG.jsx";
import { Login } from "./Landing/login.jsx";

import "./../../styles/navbar.css";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const [loggedin, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(!!store.token);
  }, [store.token]);

  //TODO añadir el nombre de usuario cuando esté logeado

  return loggedin ? (
    <nav className="landing-nav-container">
      <div className="logo-container">
        <Link to="/">
          <LogoSVG />
        </Link>
      </div>
      <div className="routes-container">
        <Link to="/user" className="anchor a-home">
          PROFILE
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
        <button onClick={actions.logOut} className="logout-btn">
          Log Out
        </button>
      </div>
    </nav>
  ) : (
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
