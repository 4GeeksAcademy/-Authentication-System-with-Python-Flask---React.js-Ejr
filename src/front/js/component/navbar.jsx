import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";
import Logo from "./../../img/logo.png";
import { Login } from "./Landing/login.jsx";
import "./../../styles/navbar.css";
import { CiMenuBurger } from "react-icons/ci";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const [loggedin, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(!!store.token);
  }, [store.token]);

  const scrollTo = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  const scrollToFooter = () => {
    document.getElementById("footer").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container-fluid justify-content-between align-items-center">
        <Link to={"/"} className="navbar-brand d-flex align-items-center me-0 me-lg-3">
          <img src={Logo} alt="logo" className="logo-svg" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <CiMenuBurger style={{ width: '2rem', height: '2rem' }} />
        </button>

        <div className="collapse navbar-collapse justify-content-center" id="navbarSupportedContent">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to={"/"} className="nav-link a-home anchor" onClick={() => scrollTo("home")}>HOME</Link>
            </li>
            <li className="nav-item">
              <a href="#about" className="nav-link a-about anchor" onClick={() => scrollTo("about")}>
                ABOUT
              </a>
            </li>
            {loggedin ? (
              <li className="nav-item">
                <Link to={"/user/:id"} className="nav-link a-services anchor">
                  PROFILE
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <a href="#services" className="nav-link a-services anchor" onClick={() => scrollTo("services")}>
                  SERVICES
                </a>
              </li>
            )}
            <li className="nav-item">
              <a onClick={scrollToFooter} className="nav-link a-contact anchor">
                CONTACT
              </a>
            </li>
            <li className="nav-item d-lg-none">
              {loggedin ? (
                <button className="btn btn-outline-light me-2 logout-btn" onClick={() => {
                  actions.logOut();
                  navigate("/");
                }}>
                  Log Out
                </button>
              ) : (
                <Login className="btn login-component" />
              )}
            </li>
          </ul>
        </div>

        <div className="d-none d-lg-flex align-items-center">
          {loggedin ? (
            <button className="btn btn-outline-light me-2 logout-btn" onClick={() => {
              actions.logOut();
              navigate("/");
            }}>
              Log Out
            </button>
          ) : (
            <Login className="btn login-component" />
          )}
        </div>
      </div>
    </nav>
  );
};
