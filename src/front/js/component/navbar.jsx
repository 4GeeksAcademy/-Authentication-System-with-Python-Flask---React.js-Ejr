import React, { useState, useEffect, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Context } from "../store/appContext.js";
import Logo from "./../../img/logo.png";
import { Login } from "./Landing/login.jsx";
import "./../../styles/navbar.css";
import { CiMenuBurger } from "react-icons/ci";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const [loggedin, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(!!store.token);
  }, [store.token]);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToFooter = () => {
    const footer = document.getElementById("footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top">
      <div className="container-fluid justify-content-between align-items-center">
        <NavLink to="/" className="navbar-brand d-flex align-items-center me-0 me-lg-3">
          <img src={Logo} alt="logo" className="logo-svg" />
        </NavLink>

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
              <NavLink to="/" className="nav-link a-home anchor" onClick={() => scrollToSection("home")}>
                HOME
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/#about" className="nav-link a-about anchor" onClick={() => scrollToSection("about")}>
                ABOUT
              </NavLink>
            </li>
            {loggedin ? (
              store.role === "user" ? (
                <NavLink to={`/user/${store.user_id}`} className="nav-link a-services anchor">
                  PROFILE
                </NavLink>
              ) : store.role === "trainer" ? (
                <NavLink to={`/trainer/${store.user_id}`} className="nav-link a-services anchor">
                  PROFILE
                </NavLink>
              ) : null
            ) : (
              <NavLink to="/#services" className="nav-link a-services anchor" onClick={() => scrollToSection("services")}>
                SERVICES
              </NavLink>
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